from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
import chess
import datetime
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from chess_game.models import Player, ChessGame, ReadyToPlay
from chess_game.serializers import *
from django.contrib.auth.models import User
from django.db.models import Q


@api_view(['POST'])
def init_game(request):
    ready_player = ReadyToPlay.objects.filter(~Q(player=request.data['user']['id']),
                                              chosen_time_mode=request.data['timer']).order_by('wait_start')[:1]
    print(request.data)
    serializer = ChessGameSerializer(data=request.data)
    if ready_player.count():
        serializer.initial_data['player_2'] = ready_player[0].pk
        serializer.prepare()
        if serializer.is_valid():
            serializer.save()
            ready_player[0].delete()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        ready_player_serializer = ReadyPlayerSerializer(data=request.data)
        ready_player_serializer.prepare()
        if ready_player_serializer.is_valid():
            ready_player_serializer.save()
            return Response('Looking for another player', status=status.HTTP_201_CREATED)
        return Response(ready_player_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def update_clock(game):
    move_n = game.moves_made
    if move_n:
        a = datetime.datetime.strptime(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'),\
                                       '%Y-%m-%d %H:%M:%S.%f')
        b = datetime.datetime.strptime(game.last_move_time.strftime('%Y-%m-%d %H:%M:%S.%f'),\
                                       '%Y-%m-%d %H:%M:%S.%f')
        if move_n % 2:
            time_left = datetime.datetime.strptime(game.black_timer.strftime('%H:%M:%S'), '%H:%M:%S')
            time_left -= a - b
            if time_left > 0:
                time_left += game.increment
            game.black_timer = time_left.strftime('%H:%M:%S')
        else:
            time_left = datetime.datetime.strptime(game.white_timer.strftime('%H:%M:%S'), '%H:%M:%S')
            time_left -= a - b
            if time_left > 0:
                time_left += game.increment
            game.white_timer = time_left.strftime('%H:%M:%S')
        if time_left.day <= 1:
            game.last_move_time = datetime.datetime.now()
            game.save()
            return True
        else:
            return False
    else:
        game.last_move_time = datetime.datetime.now()
        game.save()
        return True


@api_view(['POST'])
def make_move(request):
    game = ChessGame.objects.get(pk=request.data['game_id'])
    board = chess.Board(game.fen)
    uci = request.data['move_uci']
    move = chess.Move.from_uci(uci)
    if move in board.legal_moves:
        moves_made = game.moves_made
        board.push(move)
        game.fen = board.fen()
        game.save()
        if not update_clock(game):
            color = ['white', 'black'][moves_made % 2]
            return Response(f'time is up for {color}')
        if board.is_stalemate() or \
                board.can_claim_threefold_repetition():
            game.result = 0
            game.save()
            return Response('draw')
        if board.is_checkmate():
            if board.outcome().winner:
                game.result = 1
            else:
                game.result = -1
            game.save()
            return Response('checkmate')
        moves_made += 1
        game.moves_made = moves_made
        game.save()
        white_timer = game.white_timer
        black_timer = game.black_timer
        try:
            white_timer = white_timer.strftime('%H:%M:%S')
        except:
            pass
        try:
            black_timer = black_timer.strftime('%H:%M:%S')
        except:
            pass
        resp = {'board_fen': board.fen(),
                'white_timer': white_timer,
                'black_timer': black_timer,
                'moves_made': game.moves_made}
        return Response(resp)
    else:
        return Response('Illegal move')


@api_view(['GET'])
def get_rating(request):
    players = Player.objects.all().order_by('-rating')
    serializer = RatingSerializer(players, context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def get_last_games(request):
    games = ChessGame.objects.select_related('white_player', 'black_player')\
        .filter(Q(white_player=request.data['user']['id']) | Q(black_player=request.data['user']['id']))\
        .exclude(result__isnull=True).all().order_by('-last_move_time')
    bullet_games = games.filter(time_control='bullet')
    blitz_games = games.filter(time_control='blitz')
    rapid_games = games.filter(time_control='rapid')
    won_white = ChessGame.objects.filter(Q(white_player=request.data['user']['id']) & Q(result=1)).count()
    won_black = ChessGame.objects.filter(Q(black_player=request.data['user']['id']) & Q(result=-1)).count()
    won = won_white + won_black
    drawn = ChessGame.objects.filter(Q(result=0)).count()
    lost = games.count() - won - drawn
    return Response({'last_games': games.values('id',
                                 'white_player__id__nickname',
                                 'black_player__id__nickname',
                                 'result',
                                 'moves_made',
                                 'last_move_time')[:5],
                     'games_count': games.count(),
                     'bullet_count': bullet_games.count(),
                     'blitz_count': blitz_games.count(),
                     'rapid_count': rapid_games.count(),
                     'won_games': won,
                     'drawn_games': drawn,
                     'lost_games': lost})