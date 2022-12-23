from django.urls import path
from auth import views

urlpatterns = [
    path("register", views.register),
    path("login", views.login),
    path("logout", views.logout),
    path("tokens/refresh", views.refresh_tokens),
]