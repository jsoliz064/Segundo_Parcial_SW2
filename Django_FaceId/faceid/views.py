from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse 
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static
from .notebook import *

class Register(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request,*args, **kwargs):
        return super().dispatch(request,*args,**kwargs)
    
    def get(self,request):
        return HttpResponse("Method GET")

    def post(self,request):
        try: 
            files = []
            name = request.POST['name']
            userId = request.POST['user_id']
            c = 1
            for file in request.FILES:
                files.append(request.FILES[f'file{c}'].read())
                c+=1
            if name is None or userId is None:
                return HttpResponse(0, status = 404)
            inserted = registerFaces(name, userId, files)
            return HttpResponse( inserted , status = 200) 
        except:
            return HttpResponse( 0 , status = 500) 
    def put(self,request):
        return HttpResponse("Method put")

    def delete(self,request):
        return HttpResponse("Method delete")

class Upload(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request,*args, **kwargs):
        return super().dispatch(request,*args,**kwargs)
    
    def get(self,request):
        return HttpResponse("Method GET")

    def post(self,request):
        try:
            userId = request.POST['user_id']
            data = request.FILES['img'].read()
            if userId is None or data is None:
                return HttpResponse(False , status = 404)
            matched = login(userId, data)
            return HttpResponse( matched , status = 200)
        except:
            return HttpResponse( False , status = 500)

    def put(self,request):
        return HttpResponse("Method put")

    def delete(self,request):
        return HttpResponse("Method delete")