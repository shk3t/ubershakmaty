from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import AccessToken
from chess_game.models import Player


class UserSerializer(serializers.ModelSerializer):
    # rating = serializers.SerializerMethodField()
    #
    # def get_rating(self, obj):
    #     return Player.objects.get(pk=obj.id).rating
    #
    class Meta:
        model = User
        # fields = ["id", "username", "email", "password", "rating"]
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
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