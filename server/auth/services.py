from django.contrib.auth.models import User
from datetime import datetime
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from auth.serializers import UserWithTokenSerializer


class AuthService:
    def tokenized_response(user: User) -> Response:
        refresh_token = RefreshToken.for_user(user)
        serializer = UserWithTokenSerializer(user)
        response = Response(serializer.data)
        response.set_cookie(
            key="refresh_token",
            value=str(refresh_token),
            expires=datetime.fromtimestamp(refresh_token["exp"]),
            httponly=True,
        )
        return response