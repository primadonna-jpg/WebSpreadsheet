from django.urls import path
from SpreadsheetApp.views import *
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns  = [
    path('list/', SpreadsheetList.as_view(), name = 'spreadsheets-list'),
    path('delete/<int:id>', SpreadsheetDetail.as_view(), name = 'spreadsheet-detail'),
    path('create/', CreateSpreadsheet.as_view(), name = 'spreadsheet-create'),
    path('get/<int:id>', GetSpreadsheet.as_view(), name = 'spreadsheet-get'),
    path('update/<int:id>', UpdateSpreadsheet.as_view(), name = 'spreadsheet-update'),
]