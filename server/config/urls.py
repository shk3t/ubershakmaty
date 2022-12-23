from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("game/", include('chess_game.urls')),
    path("auth/", include('auth.urls')),
]