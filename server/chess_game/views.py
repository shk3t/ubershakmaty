from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import chess

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Player, ChessGame
from .serializers import *


@api_view(['POST'])
def init_game(request):
    serializer = ChessGameSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def make_move(request):
    game = ChessGame.objects.get(pk=2)
    board = chess.Board(game.fen)
    uci = request.data['move_uci']
    move = chess.Move.from_uci(uci)
    if move in board.legal_moves:
        board.push(move)
        game.fen = board.fen()
        game.save()
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
        return Response(f"{board}")
    else:
        return Response('Illegal move')
