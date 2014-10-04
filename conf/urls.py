from django.conf.urls import patterns, include, url

from django.contrib import admin

from rest_framework import urls
from rest_framework import routers, serializers, viewsets
from blog import models
from blog import views
from conf import settings
from ajax_auth import urls
from django.contrib.auth.models import User
from rest_framework import generics
admin.autodiscover()

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter(trailing_slash=True)
router.register(r'users', models.UserViewSet)
router.register(r'articles', models.ArticleViewSet)
router.register(r'links', models.LinkViewSet)
router.register(r'tags', models.TagViewSet)


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'LmsBlog.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^backend/$', views.admin),
    (r'^$', views.blog),
    (r'^love/$', views.love),
    (r'^time/$', views.current_datetime),
    url(r'^rest/', include(router.urls)),
    url(r'^auth/', include('ajax_auth.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}), )
