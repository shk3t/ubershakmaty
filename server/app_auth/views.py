from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from app_auth.consts import (
    SOCIAL_ACCOUNT_CLIENT_IDS,
    SOCIAL_ACCOUNT_PROVIDERS,
)
from app_auth.models import User
from app_auth.exceptions import HttpException
from app_auth.serializers import UserSerializer
from app_auth.services import AuthService


@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return AuthService.tokenized_response(user)


@api_view(["POST"])
def login(request):
    try:
        user = User.objects.get(email=request.data["email"])
    except User.DoesNotExist:
        raise AuthenticationFailed()
    if not user.check_password(request.data["password"]):
        raise AuthenticationFailed()
    return AuthService.tokenized_response(user)


@api_view(["POST"])
def logout(request):
    response = Response("Logouted")
    response.delete_cookie("refresh_token")
    return response


@api_view(["POST"])
def refresh_tokens(request):
    raw_token = request.COOKIES.get("refresh_token")

    try:
        if not raw_token:
            raise InvalidToken
        refresh_token = RefreshToken(raw_token)
    except TokenError as error:
        raise HttpException(error, 401)

    try:
        user = User.objects.get(pk=refresh_token["user_id"])
    except User.DoesNotExist as error:
        raise HttpException(error, 404)

    return AuthService.tokenized_response(user)


@api_view(["POST"])
def social_login(request):
    data = request.data

    try:
        user = User.objects.get(email=data["email"])
    except User.DoesNotExist:
        serializer = UserSerializer(
            data={
                "nickname": data["name"],
                "email": data["email"],
                "password": None,  # WARNING may not work
                "account_provider": SOCIAL_ACCOUNT_PROVIDERS[data["iss"]],
                "account_subject": data["sub"],
            }
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return AuthService.tokenized_response(user)

    if (
        SOCIAL_ACCOUNT_CLIENT_IDS[user.account_provider] == data["aud"]
        and user.account_subject == data["sub"]
    ):
        return AuthService.tokenized_response(user)

    raise AuthenticationFailed()