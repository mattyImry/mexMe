from django.conf import settings
from django.db import models
import random

User = settings.AUTH_USER_MODEL


class Tweet(models.Model):
    # many users can have many tweets
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': random.randint(0, 200)
        }
