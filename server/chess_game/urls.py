from django.urls import path
from chess_game.views import game, auth

urlpatterns = [
    path("register", auth.register),
    path("login", auth.login),
    path("logout", auth.logout),
    path("tokens/refresh", auth.refresh_tokens),

    path('init_game', game.init_game, name='init_game'),
    path('make_move', game.make_move, name='make_move'),
]
