from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('init_game', views.init_game, name='init_game'),
    path('make_move', views.make_move, name='make_move'),
]
