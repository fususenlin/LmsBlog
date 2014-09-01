$routeProvider.when("/articles", {
    resource: 'article/list/articles',
    controller: 'ArticlesCtrl'
});
$routeProvider.when("/article", {
    resource: 'article/view/article',
    controller: 'ArticleCtrl'
});
$routeProvider.when("/article/add", {
    resource: 'article/add/add',
    controller: 'ArticleAddCtrl'
});
$routeProvider.when("/article/edit", {
    resource: 'article/edit/edit',
    controller: 'ArticleEditCtrl'
});



$route("admin.routes", "modules/");