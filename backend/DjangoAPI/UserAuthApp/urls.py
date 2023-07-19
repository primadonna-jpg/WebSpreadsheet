from django.urls import path
from UserAuthApp.views import UserCreateView, UserDetailView, UserList


urlpatterns  = [
    path('user/', UserCreateView.as_view(), name = 'user-create'),
    path('user/<int:pk>/',UserDetailView.as_view(), name = 'user-detail'),
    path('users/',UserList.as_view(), name = 'user-list')
]