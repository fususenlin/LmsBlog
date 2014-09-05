$routeProvider.when("/articles", {
    resource: 'article/list/articles',
    controller: 'ArticlesCtrl'
});
$routeProvider.when("/article", {
    resource: 'article/view/article',
    controller: 'ArticleCtrl'
});

$route("admin.routes", "modules/");