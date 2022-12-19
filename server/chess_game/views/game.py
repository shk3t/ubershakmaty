from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import chess
import datetime

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from chess_game.models import Player, ChessGame
from chess_game.serializers import *


@api_view(['POST'])
def init_game(request):
    serializer = ChessGameSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            game.black_timer = time_left.strftime('%H:%M:%S')
        else:
            time_left = datetime.datetime.strptime(game.white_timer.strftime('%H:%M:%S'), '%H:%M:%S')
            time_left -= a - b
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
        return Response(f"{resp}")
    else:
        return Response('Illegal move')
