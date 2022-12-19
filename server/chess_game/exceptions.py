from rest_framework.exceptions import APIException


class HttpException(APIException):
    def __init__(self, detail, status):
        self.status_code = status
        APIException.__init__(self, detail)
