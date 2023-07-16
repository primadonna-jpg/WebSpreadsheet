from rest_framework import serializers

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    # first_name = serializers.CharField(source = 'first_name', required = False)
    # last_name = serializers.CharField(source = 'last_name', required = False)
    # date_joined = serializers.DateTimeField(source = 'date_joined', read_only = True)
    class Meta:
        model = User
        fields = ('id','username','email','password')
