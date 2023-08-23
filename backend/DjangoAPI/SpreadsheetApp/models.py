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

class Column(models.Model):
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE, related_name='columns')
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField()

class Cell(models.Model):
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE, related_name='cells')#nie potrzebne ??
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name='cells')
    row = models.PositiveIntegerField()
    content = models.TextField()