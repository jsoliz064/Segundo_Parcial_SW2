from django.urls import path
from .views import Upload, Register


urlpatterns=[
    path('registerFaces',Register.as_view(),name='register'),
    path('loginFace',Upload.as_view(),name='login'),
]