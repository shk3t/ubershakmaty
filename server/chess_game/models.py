from django.db import models
from user_app.models import User
from django.utils import timezone


class Player(models.Model):
    id = models.OneToOneField(
        to=User, db_column="id", primary_key=True, on_delete=models.CASCADE, related_name='player'
    )
    rating = models.IntegerField(default=2000)
    country = models.CharField(default='FIDE', max_length=50)


class ReadyToPlay(models.Model):
    player = models.OneToOneField(
        to=Player, db_column="id", primary_key=True, on_delete=models.CASCADE, related_name='player'
    )
    chosen_time_mode = models.CharField(default='00:03:00|2', max_length=20)
    wait_start = models.DateTimeField(default=timezone.now)


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
    increment = models.IntegerField(default=0)
    white_timer = models.TimeField(auto_now=False, auto_now_add=False)
    black_timer = models.TimeField(auto_now=False, auto_now_add=False)
    moves_made = models.IntegerField(default=0)
    last_move_time = models.DateTimeField(null=True)
    time_control = models.CharField(default='blitz', max_length=10)