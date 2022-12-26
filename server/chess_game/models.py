from django.db import models
from app_auth.models import User


class Player(models.Model):
    id = models.OneToOneField(
        to=User, db_column="id", primary_key=True, on_delete=models.CASCADE, related_name='player'
    )
    rating = models.IntegerField(default=2000)
    country = models.CharField(default='FIDE', max_length=50)


class ChessGame(models.Model):
    white_player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="white_player"
    )
    black_player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="black_player"
    )
    fen = models.CharField(
        default="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        max_length=1000,
    )
    result = models.IntegerField(null=True)
    white_timer = models.TimeField(auto_now=False, auto_now_add=False)
    black_timer = models.TimeField(auto_now=False, auto_now_add=False)
    moves_made = models.IntegerField(default=0)
    last_move_time = models.DateTimeField(null=True)