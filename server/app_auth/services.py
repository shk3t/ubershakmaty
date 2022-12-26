from app_auth.models import User
from datetime import datetime
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from app_auth.serializers import UserWithTokenSerializer
from transliterate import translit


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


# class TranslitService:
#     @staticmethod
#     def append_id(data: dict) -> None:
#         trans_name = translit(data["name"], "ru", reversed=True)
#         data["id"] = trans_name.lower().replace(" ", "-").replace("'", "")