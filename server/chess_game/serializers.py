from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Player, ChessGame


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password", "is_admin", "is_manager"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
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
        access_token["is_admin"] = user.is_admin
        access_token["is_manager"] = user.is_manager
        return str(access_token)


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ("pk", "rating")


class ChessGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessGame
        fields = (
            "pk",
            "white_player",
            "black_player",
            "fen",
            "result",
            "white_timer",
            "black_timer",
        )
