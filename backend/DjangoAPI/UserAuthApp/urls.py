from django.urls import path
from UserAuthApp.views import *


urlpatterns  = [
    
    path('user/<int:pk>/',UserDetailView.as_view(), name = 'user-detail'),
    path('users/',UserList.as_view(), name = 'user-list'),

    path('register/', UserCreateView.as_view(), name = 'user-create'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/',LogOutView.as_view(), name='logout')
]