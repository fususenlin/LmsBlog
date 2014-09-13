$routeProvider.when("/articles", {
    resource: 'article/list/articles',
    controller: 'ArticlesCtrl',
    require:["http://tajs.qq.com/stats?sId=37077455"]
});
$routeProvider.when("/articles/view", {
    resource: 'article/view/article',
    controller: 'ArticleCtrl',
    require: ["http://tajs.qq.com/stats?sId=37077455"]
});

$route("admin.routes", "modules/");