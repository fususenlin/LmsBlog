# coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse
import datetime
# Create your views here.
from django.template import loader, Context
from django.http import HttpResponse

def admin(request):
    #posts = BlogPost.objects.all()
    t = loader.get_template("admin.html")
    c = Context()
    return HttpResponse(t.render(c))

def love(request):
    #posts = BlogPost.objects.all()
    t = loader.get_template("love.html")
    c = Context()
    return HttpResponse(t.render(c))

def blog(request):
    #posts = BlogPost.objects.all()
    t = loader.get_template("blog.html")
    c = Context()
    return HttpResponse(t.render(c))

def current_datetime(request):
    # 计算当前日期和时间，并以 datetime.datetime 对象的形式保存为局部变量 now
    now = datetime.datetime.now()

    #构建Html响应，使用now替换占位符%s
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)
    #返回一个包含所生成响应的HttpResponse对象
