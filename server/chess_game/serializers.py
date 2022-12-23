from rest_framework import serializers
from .models import Player, ChessGame


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ("pk", "rating")


class ChessGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessGame
        fields = (
            "pk",
            "white_player",
            "black_player",
            "fen",
            "result",
            "white_timer",
            "black_timer",
        )