from django.db import models
from django.contrib import admin
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_any_permissions.permissions import AnyPermissions
from rest_any_permissions import permissions
from rest_framework.permissions import BasePermission

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=150)
    type = models.IntegerField()
    body = models.TextField()
    timestamp = models.DateTimeField()
    class Meta:
        ordering = ('-timestamp',)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'timestamp')

admin.site.register(Article,ArticleAdmin)


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ArticlesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'timestamp', 'id', 'type')

class ArticlesViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Article.objects.all()
    serializer_class = ArticlesSerializer

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'body', 'timestamp', 'id', 'type')

class TruePermission(BasePermission):

    def has_permission(self, request, view):
        return True

class ArticleViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    permission_classes = [AnyPermissions]
    any_permission_classes = [TruePermission]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer