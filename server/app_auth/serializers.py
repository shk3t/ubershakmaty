from app_auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import AccessToken
from chess_game.models import Player


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "nickname", "email", "password", "account_provider", "account_subject"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        Player(**{"id": user, "rating": 0}).save()
        return user

    def update(self, user, validated_data):
        password = validated_data.pop("password", None)
        if password:
            user.set_password(password)
        for attr, value in validated_data.items():
            setattr(user, attr, value)
        user.save()
        return user


class UserWithTokenSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    access_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["user", "access_token"]

    def get_user(self, user):
        return UserSerializer(user).data

    def get_access_token(self, user):
        access_token = AccessToken.for_user(user)
        return str(access_token)