from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_image_file_extension
from django.utils.translation import gettext_lazy as _
from user_app.exceptions import HttpException
from user_app.validators import password_validator
from user_app.managers import EmailUserManager
from django.core.exceptions import ValidationError


class SafeModelMixin:
    @classmethod
    def get_by_pk(cls, pk):
        try:
            return cls.objects.get(pk=pk)
        except cls.DoesNotExist as error:
            raise HttpException(error, 404)


class User(AbstractUser, SafeModelMixin):
    class AccountProvider(models.TextChoices):
        GOOGLE = "google"

    nickname = models.CharField(_("nickname"), max_length=128)
    email = models.EmailField(_("email address"), unique=True)
    password = models.CharField(
        _("password"), max_length=128, null=True, validators=[password_validator]
    )
    picture = models.ImageField(
        upload_to="users",
        null=True,
        blank=True,
        validators=[validate_image_file_extension],
    )
    age = models.IntegerField(null=True, blank=True)
    account_provider = models.CharField(
        max_length=128, null=True, choices=AccountProvider.choices
    )
    account_subject = models.CharField(max_length=128, null=True)
    username = None
    first_name = None
    last_name = None
    date_joined = None
    last_login = None
    is_active = None

    objects = EmailUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nickname"]

    class Meta:
        ordering = ["id"]

    @property
    def is_active(self):
        return True