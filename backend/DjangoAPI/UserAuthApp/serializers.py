from rest_framework import serializers
from django.core.validators import RegexValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    # first_name = serializers.CharField(source = 'first_name', required = False)
    # last_name = serializers.CharField(source = 'last_name', required = False)
    # date_joined = serializers.DateTimeField(source = 'date_joined', read_only = True)
    password = serializers.CharField(
        write_only=True,
        validators=[
            RegexValidator(
                regex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$',
                message='Password must contain at least 8 symbols and have one great letter and one digit'
            )
        ]
    ) # hasło z walidacją, 8 znaków jedna cyfra jedna wilka litera i mała
    class Meta:
        model = User
        fields = ('id','username','email','password')
