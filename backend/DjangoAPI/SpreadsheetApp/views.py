from django.shortcuts import render
from SpreadsheetApp.serializers import *
from SpreadsheetApp.models import *

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import  TokenAuthentication
from rest_framework.response import Response  #rest_framework defoultowo ma ustawiony response na json
from rest_framework.views import APIView


class SpreadsheetDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self,request,id):
        try:
            user = request.user
            spreadsheet = Spreadsheet.objects.get(pk=id, author =user)
            spreadsheet.delete()
            return Response({'message': 'Spreadsheet deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Spreadsheet.DoesNotExist:
            return Response({'error': 'Spreadsheet not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SpreadsheetList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            spreadsheets = Spreadsheet.objects.filter(author=user)
            serializer = SpreadsheetSerializer(spreadsheets, many=True)
            return Response({'message': 'success', 'spreadsheets': serializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status=500)
        
class CreateSpreadsheet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,request):
        user = request.user
        data = request.data

        spreadsheet = Spreadsheet.objects.create(name=data['spreadsheet_name'], author=user)

        for sheet_obj in data['sheets']:
            sheet = Sheet.objects.create(spreadsheet=spreadsheet, name=sheet_obj['name'])
   
            for row_order, row_obj in enumerate(sheet_obj['sheetData']):
                row = Row.objects.create(sheet=sheet,  order=row_order)

                for cell in row_obj:
                    if cell is None:
                        cell = ""

                    try:
                        Cell.objects.create(sheet=sheet, row=row, content=cell)
                    except KeyError as e:
                        return Response({'error': 'INTERNAL SERVER ERROR'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                        print(f"Błąd IntegrityError: {e}")
                       

        return Response({'message': 'Spreadsheet created','spreadsheet_id':spreadsheet.id}, status=status.HTTP_201_CREATED)
    
class GetSpreadsheet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        try:
            spreadsheet = Spreadsheet.objects.get(pk = id)
            serializer = SpreadsheetSerializer(spreadsheet)
            return Response({'message':'success','spreadsheet':serializer.data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status=500)
        

class UpdateSpreadsheet(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


    def put(self, request,id):
        user = request.user
        data = request.data
        #spreadsheet_name = data['spreadsheet_name']
        try:
            spreadsheet = Spreadsheet.objects.get(pk=id, author=user)
        except Spreadsheet.DoesNotExist:
            return Response({'error': 'Spreadsheet not found'}, status=status.HTTP_404_NOT_FOUND)

        if data['spreadsheet_name']:
            spreadsheet.name = data['spreadsheet_name']
            spreadsheet.save()

        spreadsheet.sheets.all().delete()

        for sheet_obj in data['sheets']:
            sheet_name = sheet_obj['name']
            sheet = Sheet.objects.create(spreadsheet=spreadsheet, name=sheet_name)

            for row_order, row_obj in enumerate(sheet_obj['sheetData']):
                row = Row.objects.create(sheet=sheet, order=row_order)

                for cell_content in row_obj:
                    if cell_content is None:
                        cell_content = ""

                    Cell.objects.create(sheet=sheet, row=row, content=cell_content)

        return Response({'message': 'Spreadsheet created or updated'}, status=status.HTTP_200_OK)

        
