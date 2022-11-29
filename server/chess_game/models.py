from django.db import models
from django.contrib.auth.models import User


class Player(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()


class ChessGame(models.Model):
    white_player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='white_player')
    black_player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='black_player')
    fen = models.CharField(default='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', max_length=1000)
    result = models.IntegerField(null=True)
    white_timer = models.TimeField(auto_now=False, auto_now_add=False)
    black_timer = models.TimeField(auto_now=False, auto_now_add=False)
