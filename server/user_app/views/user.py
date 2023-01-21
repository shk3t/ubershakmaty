from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import APIView
from user_app.exceptions import HttpException

from user_app.serializers import UserSerializer


class AuthenticatedUserDetail(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        updated_data = request.data
        user = request.user
        print(updated_data)
        if (
            user.password
            and "password" in updated_data
            and not (
                "old_password" in updated_data
                and user.check_password(updated_data["old_password"])
            )
        ):
            raise HttpException("Wrong old password", 400)
        serializer = UserSerializer(user, data=updated_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class AuthUserPictureDetail(APIView):
    def put(self, request):
        user = request.user
        user.picture.delete()
        user.picture = request.FILES.get("picture")
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data["picture"])

    def delete(self, request):
        user = request.user
        user.picture.delete()
        return Response("Profile picture deleted")