from django.urls import path
from UserAuthApp.views import *
from rest_framework.authtoken.views import obtain_auth_token
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns  = [
    
    # path('user/<int:pk>/',UserDetailView.as_view(), name = 'user-detail'),
    # path('users/',UserList.as_view(), name = 'user-list'),

    path('register/', UserCreateView.as_view(), name = 'user-create'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/',LogOutView.as_view(), name='logout'),
    #path('token/', obtain_auth_token, name='token'),

    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),#
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),#
    # path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),# 
]