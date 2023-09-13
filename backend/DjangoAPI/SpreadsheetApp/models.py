from django.db import models

# Create your models here.
class Spreadsheet(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Sheet(models.Model):
    spreadsheet = models.ForeignKey(Spreadsheet,on_delete=models.CASCADE, related_name='sheets')
    name = models.CharField(max_length=100)


class Row(models.Model):
    sheet = models.ForeignKey(Sheet,on_delete=models.CASCADE, related_name='rows')
    order = models.PositiveIntegerField()

class Cell(models.Model):
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE, related_name='cells')#nie potrzebne ??
    row = models.ForeignKey(Row,on_delete=models.CASCADE, related_name='cells')
    content = models.TextField(default="")

