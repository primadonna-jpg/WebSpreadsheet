from django.shortcuts import render
from SpreadsheetApp.serializers import *
from SpreadsheetApp.models import *

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.response import Response  #rest_framework defoultowo ma ustawiony response na json
from rest_framework.views import APIView
# Create your views here.

class SpreadsheetList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            spreadsheets = Spreadsheet.objects.filter(author=user)
            serializer = SpreadsheetSerializer(spreadsheets, many=True)
            return Response({'message': 'success', 'spreadsheets': serializer.data})
        except Exception as e:
            return Response({'error':str(e)}, status=500)