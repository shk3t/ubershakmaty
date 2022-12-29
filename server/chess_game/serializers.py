from rest_framework import serializers
from .models import Player, ChessGame
from app_auth.models import User


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('pk', 'rating', 'country')


class ChessGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessGame
        fields = (
            'pk',
            'white_player',
            'black_player',
            'fen',
            'result',
            'white_timer',
            'black_timer',
        )

    def set_timers(self):
        self.initial_data['white_timer'] = self.initial_data['timer']
        self.initial_data['black_timer'] = self.initial_data['timer']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', )


class RatingSerializer(serializers.ModelSerializer):
    def get_username(self, obj):
        return obj.id.nickname

    def get_date_joined(self, obj):
        return obj.id.date_joined

    username = serializers.SerializerMethodField('get_username')
    date_joined = serializers.SerializerMethodField('get_date_joined')

    class Meta:
        model = Player
        fields = ('username', 'date_joined', 'rating', 'country')
