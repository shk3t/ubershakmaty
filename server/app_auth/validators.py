from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password


def password_validator(password):
    try:
        validate_password(password)
    except ValidationError as error:
        raise serializers.ValidationError(eval(str(error)))