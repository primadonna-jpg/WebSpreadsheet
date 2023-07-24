from django.shortcuts import render
#from django.views.decorators.csrf import csrf_exempt
#from rest_framework.parsers import JSONParser
from UserAuthApp.serializers import UserSerializer,LoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login ,logout

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response  #rest_framework defoultowo ma ustawiony response na json
from rest_framework.views import APIView



#Błąd(Użytkownicy wprowadzeni z poziomu widoków nie są wstanie być zalogowani)/rozwiązanie:zamiast - 
#-  user.save() zmienić na User.objects.create()
class UserCreateView(APIView):
    # bez authentication aby można było sie rejestrować
    
    def post(self,request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            password = serializer.validated_data['password']
            hashed_password = make_password(password)
            
            user = User.objects.create(username=serializer.validated_data['username'],
                        email=serializer.validated_data['email'],
                        password=hashed_password)
            
            return Response({'user_id' : user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


#LOGIN
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return Response({'message': 'successfully logged in'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'wrong login details'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#LOGOUT
class LogOutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'successfully logged out'}, status=status.HTTP_200_OK)

















#detail (get, put , delete)
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
            password = serializer.validated_data['password']
            hashed_password = make_password(password)
            
            serializer.save(username=serializer.validated_data['username'],
                        email=serializer.validated_data['email'],
                        password=hashed_password)
            #serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            user = User.objects.get(pk = pk)
        except User.DoesNotExist:
            return Response({'error':'User not found'}, status= status.HTTP_404_NOT_FOUND)
        ID = user.id
        user.delete()          
        return Response({'deleted_user_id':ID},status=status.HTTP_204_NO_CONTENT)
        

class UserList(APIView):
    authentication_classes = [SessionAuthentication,BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self,request):
        try:
            users = User.objects.all()
        except :
            return Response({'error':'something goes wrong'}, status= status.HTTP_400_BAD_REQUEST)
        
        serializer = [UserSerializer(u).data for u in users]
        return Response(serializer, status=status.HTTP_200_OK)

