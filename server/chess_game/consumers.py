from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Player, ChessGame, ReadyToPlay
from .serializers import *
from django.contrib.auth.models import User
from django.db.models import Q
from .views import init_game
from asgiref.sync import sync_to_async


@sync_to_async
def get_ready_players(scope):
    return ReadyToPlay.objects.filter(~Q(player=scope['user'].pk),
                                        chosen_time_mode='00:01:00|1 ').order_by('wait_start')[:1]


class WSConsumer(AsyncWebsocketConsumer):
    async def connect(self, second_player):
        print('CONNECT', self.scope['user'].pk)
        self.group_name = "game_%s_%s" % (self.scope['user'], second_player)
        print(self.group_name)
        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    # This function receive messages from WebSocket.
    async def receive(self, text_data):
        print('RECEIVE')
        text_data_json = json.loads(text_data)
        new_fen = text_data_json["fen"]

        await self.channel_layer.group_send(
            self.group_name,
            {
                "fen": new_fen
            },
        )
    # Receive message from room group.
    async def chatbox_message(self, event):
        message = event["message"]
        username = event["username"]
        #send message and username of sender to websocket
        await self.send(
            text_data=json.dumps(
                {
                    "message": message,
                    "username": username,
                }
            )
        )
