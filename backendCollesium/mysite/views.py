from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CustomTokenView(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username,password=password)
        if user :
            refresh = RefreshToken.for_user(user)
            return Response({
                'resfresh':str(refresh),
                access:str(refresh.access_token),
            })
        return Response({'error':'Invalid Credentials'},status=401)