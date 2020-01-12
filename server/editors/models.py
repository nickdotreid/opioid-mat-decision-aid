from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Editor(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

