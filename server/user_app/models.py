from django.db import models
from django.contrib.auth.models import AbstractUser
from user_app.validators import password_validator
from user_app.managers import EmailUserManager
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    class AccountProvider(models.TextChoices):
        GOOGLE = "google"

    nickname = models.CharField(_("nickname"), max_length=128)
    email = models.EmailField(_("email address"), unique=True)
    password = models.CharField(
        _("password"), max_length=128, null=True, validators=[password_validator]
    )
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
    groups = None
    user_permissions = None

    objects = EmailUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nickname"]

    class Meta:
        ordering = ["id"]

    @property
    def is_active(self):
        return True