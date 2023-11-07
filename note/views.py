from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Note
from .permission import IsOwner
from .serializer import NoteSerializer
from note_app import settings
import requests  

class NoteViewSet(ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsOwner, IsAuthenticated]
    my_webhook_url = settings.discord_webhook_url
    

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        message = f'A new note has been created: "{serializer.instance.title}"'
        self.send_to_discord(message)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"error": "You do not have permission to update this note."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        message = f'Note updated: "{serializer.instance.title}"'
        self.send_to_discord(message)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"error": "You do not have permission to delete this note."}, status=status.HTTP_403_FORBIDDEN)

        instance.delete()
        
        message = f'Note deleted: "{instance.title}"'
        self.send_to_discord(message)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def send_to_discord(self, message):
        try:
            data = {'content': message}
            response = requests.post(self.my_webhook_url, json=data)
            if response.status_code == 204:
                print('Log message sent to Discord successfully')
            else:
                print('Failed to send log message to Discord')
        except Exception as error_message:
            return Response({'error': str(error_message)}, status=status.HTTP_400_BAD_REQUEST)
