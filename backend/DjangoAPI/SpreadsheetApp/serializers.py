from rest_framework import serializers
from .models import Spreadsheet,Sheet,Column,Cell

class CellSerializer(serializers.ModelSerializer):
    class Meta:
      model = Cell
      fields = '__all__'

class ColumnSerializer(serializers.ModelSerializer):
   cells = CellSerializer(many =True, read_only = True)
   class Meta:
      model = Column
      fields = '__all__'

class SheetSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, read_only=True)

    class Meta:
        model = Sheet
        fields = '__all__'

class SpreadsheetSerializer(serializers.ModelSerializer):
    sheets = SheetSerializer(many=True, read_only=True)

    class Meta:
        model = Spreadsheet
        fields = ('name', 'author','created','updated','sheets')  