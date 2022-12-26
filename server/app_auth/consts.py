from app_auth.models import User
from config.settings import metadata

SOCIAL_ACCOUNT_PROVIDERS = {
    "https://accounts.google.com": User.AccountProvider.GOOGLE,
}

SOCIAL_ACCOUNT_CLIENT_IDS = {
    User.AccountProvider.GOOGLE: metadata["google-account-client-id"]
}