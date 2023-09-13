from rest_framework import serializers
from .models import *

class CellSerializer(serializers.ModelSerializer):
    class Meta:
      model = Cell
      fields = '__all__'


class RowSerializer(serializers.ModelSerializer):
    cells = CellSerializer(many=True, read_only=True)

    class Meta:
        model = Row
        fields = '__all__'  

class SheetSerializer(serializers.ModelSerializer):
    rows = RowSerializer(many=True, read_only=True)

    class Meta:
        model = Sheet
        fields = '__all__'

class SpreadsheetSerializer(serializers.ModelSerializer):
    sheets = SheetSerializer(many=True, read_only=True)

    class Meta:
        model = Spreadsheet
        fields = '__all__'  