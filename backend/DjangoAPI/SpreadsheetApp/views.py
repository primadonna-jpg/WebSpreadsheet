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

        for sheet_data in data['sheets']:
            sheet = Sheet.objects.create(spreadsheet=spreadsheet, name=sheet_data['name'])
   
            for column_order, column_data in enumerate(sheet_data['columns']):
                column = Column.objects.create(sheet=sheet, name=column_data['name'], order=column_order)

                for row_order, cell_data in enumerate(column_data['cells']):
                    Cell.objects.create(sheet=sheet, column=column, row=row_order, content=cell_data['content'])

        return Response({'message': 'Spreadsheet created'}, status=status.HTTP_201_CREATED)
    
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

    def put(self, request, id):
        user = request.user
        data = request.data

        try:
            spreadsheet = Spreadsheet.objects.get(pk=id, author=user)
        except Spreadsheet.DoesNotExist:
            return Response({'error': 'Spreadsheet not found'}, status=status.HTTP_404_NOT_FOUND)
       
        if 'spreadsheet_name' in data:
            spreadsheet.name = data['spreadsheet_name']
            spreadsheet.save()
        
        for sheet_data in data['sheets']:
            try:
                sheet = Sheet.objects.get(spreadsheet=spreadsheet, name=sheet_data['name'])
            except Sheet.DoesNotExist:
                return Response({'error': f'Sheet "{sheet_data["name"]}" not found'}, status=status.HTTP_404_NOT_FOUND)
            
            for column_data in sheet_data['columns']:
                try:
                    column = Column.objects.get(sheet=sheet, name=column_data['name'], order= column_data['order'])
                except Column.DoesNotExist:
                    return Response({'error': f'Column "{column_data["name"]}" not found'}, status=status.HTTP_404_NOT_FOUND)
                
                for cell_data in  column_data['cells']:
                    try:
                        cell = Cell.objects.get(sheet=sheet, column=column, row=cell_data['row'])
                        cell.content = cell_data['content']
                        cell.save()
                    except Cell.DoesNotExist:
                        return Response({'error': f'Cell at row {cell_data["row"]} not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'message': 'Spreadsheet updated'}, status=status.HTTP_200_OK)

        
