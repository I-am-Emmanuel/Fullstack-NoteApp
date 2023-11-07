from django.conf import settings
from django.db import models


# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}'

    def username(self):
        return self.user.username

    class Meta:
        ordering = ['-timestamp']