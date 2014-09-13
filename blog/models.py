from django.db import models
from django.contrib import admin
from django.contrib import auth
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework import filters
from rest_framework import status
from django.core.exceptions import ValidationError

class Tag(models.Model):
    name = models.CharField(max_length=150)

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', )

class TagViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=150)
    tag = models.CharField(max_length=20)
    body = models.TextField()
    timestamp = models.DateTimeField()
    class Meta:
        ordering = ('-timestamp',)

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'timestamp')

admin.site.register(Article, ArticleAdmin)

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'body', 'timestamp', 'id', 'tag')

class ArticleNoBodySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'timestamp', 'id', 'tag')

class ArticleViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def list(self, request, *args, **kwargs):
        def get_queryset(self):
            tag = self.request.QUERY_PARAMS.get('tag', None)
            if tag is None:
                articles = Article.objects.all()
            else:
                articles = Article.objects.filter(tag__contains=tag)
            return articles

        queryset = get_queryset(self)
        serializer = ArticleNoBodySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.DATA, files=request.FILES)
        if serializer.is_valid():
            self.pre_save(serializer.object)
            self.object = serializer.save(force_insert=True)
            tags_str = serializer.data['tag']
            tags = tags_str.split(",")
            for tag in tags:
                in_tags = Tag.objects.filter(name=tag)
                if len(in_tags) is 0:
                    Tag.objects.create(name=tag)
            self.post_save(self.object, created=True)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #def retrieve(self, request, pk=None):
    #    pass

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        self.object = self.get_object_or_none()

        serializer = self.get_serializer(self.object, data=request.DATA,
                                         files=request.FILES, partial=partial)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            self.pre_save(serializer.object)
        except ValidationError as err:
            # full_clean on model instance may be called in pre_save,
            # so we have to handle eventual errors.
            return Response(err.message_dict, status=status.HTTP_400_BAD_REQUEST)
        print("dqwdqw")
        if self.object is None:
            self.object = serializer.save(force_insert=True)
            tags_str = serializer.data['tag']
            tags = tags_str.split(",")
            for tag in tags:
                in_tags = Tag.objects.filter(name=tag)
                if len(in_tags) is 0:
                    Tag.objects.create(name=tag)
            self.post_save(self.object, created=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        self.object = serializer.save(force_update=True)
        tags_str = serializer.data['tag']
        tags = tags_str.split(",")
        for tag in tags:
            in_tags = Tag.objects.filter(name=tag)
            if len(in_tags) is 0:
                Tag.objects.create(name=tag)
        self.post_save(self.object, created=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #def partial_update(self, request, pk=None):
    #    pass

    #def destroy(self, request, pk=None):
    #    pass

    #def get_queryset(self):
        #return Article.objects.all()

class Link(models.Model):
    href = models.CharField(max_length=150)
    name = models.CharField(max_length=10)
class LinkAdmin(admin.ModelAdmin):
    list_display = ('href', 'name')
admin.site.register(Link, LinkAdmin)
class LinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Link
        fields = ('href', 'name')

class LinkViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
