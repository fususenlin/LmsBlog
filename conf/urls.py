from django.conf.urls import patterns, include, url

from django.contrib import admin

from rest_framework import urls
from rest_framework import routers, serializers, viewsets
from blog import models
from blog import views
from conf import settings

from django.contrib.auth.models import User
from rest_framework import generics
admin.autodiscover()

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', models.UserViewSet)
router.register(r'articles', models.ArticlesViewSet)
router.register(r'article', models.ArticleViewSet)


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'LmsBlog.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^$', views.index),
    (r'^time/$', views.current_datetime),
    url(r'^rest/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATICFILES_DIRS,}),
)
