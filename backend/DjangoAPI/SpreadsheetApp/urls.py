from django.urls import path
from SpreadsheetApp.views import *
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns  = [
    path('list/', SpreadsheetList.as_view(), name = 'spreadsheets-list'),
]