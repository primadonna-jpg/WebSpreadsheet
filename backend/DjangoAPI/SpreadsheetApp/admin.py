from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Spreadsheet)
admin.site.register(Sheet)
admin.site.register(Row)
admin.site.register(Cell)