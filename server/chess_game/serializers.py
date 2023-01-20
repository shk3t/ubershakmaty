from rest_framework import serializers
from .models import Player, ChessGame, ReadyToPlay
from user_app.models import User
import random


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
            'increment'
        )

    def prepare(self):
        players = [self.initial_data['user']['id'], self.initial_data['player_2']]
        white_player = random.choice(players)
        players.remove(white_player)
        black_player = players[0]
        players.remove(black_player)
        self.initial_data['white_player'] = white_player
        self.initial_data['black_player'] = black_player
        timer_data = self.initial_data['timer'].split('|')
        self.initial_data['white_timer'] = timer_data[0]
        self.initial_data['black_timer'] = timer_data[0]
        self.initial_data['increment'] = timer_data[1]


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


class ReadyPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadyToPlay
        fields = '__all__'

    def prepare(self):
        self.initial_data['player'] = self.initial_data['user']['id']
        self.initial_data['chosen_time_mode'] = self.initial_data['timer']