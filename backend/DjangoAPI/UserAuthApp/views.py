from django.shortcuts import render
#from django.views.decorators.csrf import csrf_exempt
#from rest_framework.parsers import JSONParser

from UserAuthApp.serializers import UserSerializer
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response  #rest_framework defoultowo ma ustawiony response na json
from rest_framework.views import APIView

# Create your views here.

class UserCreateView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user_id' : user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetailView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(pk = pk)
        except User.DoesNotExist:
            return Response({'error':'User not found'}, status= status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk):
        try:
            user = User.objects.get(pk = pk)
        except User.DoesNotExist:
            return Response({'error':'User not found'}, status= status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user,data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            user = User.objects.get(pk = pk)
        except User.DoesNotExist:
            return Response({'error':'User not found'}, status= status.HTTP_404_NOT_FOUND)
        ID = user.id
        user.delete()          # błąd z foregin key z spraedsheet (nie ma migracji aktualnej chyba)
        return Response({'deleted user id':ID},status=status.HTTP_204_NO_CONTENT)
        

     

#do napisania klasa rejestrująca uzytkownika (bez basic authentication)