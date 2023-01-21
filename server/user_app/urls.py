from django.urls import path
from user_app.views import auth, user

urlpatterns = [
    path("register", auth.register),
    path("login", auth.login),
    path("login/social", auth.social_login),
    path("logout", auth.logout),
    path("tokens/refresh", auth.refresh_tokens),

    path("current", user.AuthenticatedUserDetail.as_view()),
    path("current/picture", user.AuthUserPictureDetail.as_view()),
]