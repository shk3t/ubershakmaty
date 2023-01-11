from django.contrib import admin
from .models import Player, ChessGame, ReadyToPlay


admin.site.register([Player, ChessGame, ReadyToPlay])
