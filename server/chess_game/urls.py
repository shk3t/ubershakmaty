from django.urls import path
from chess_game import views

urlpatterns = [
    path('init_game', views.init_game, name='init_game'),
    path('make_move', views.make_move, name='make_move'),
    path('get_rating', views.get_rating, name='make_rating')
]