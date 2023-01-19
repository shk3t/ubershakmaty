from django.urls import path
from user_app import views

urlpatterns = [
    path("register", views.register),
    path("login", views.login),
    path("login/social", views.social_login),
    path("logout", views.logout),
    path("tokens/refresh", views.refresh_tokens),
]