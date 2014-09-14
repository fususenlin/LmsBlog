var ArticlesCtrl = function ($rootScope, $scope, $http,$location) {

    $scope.tag = "全部";
    $scope.view = function(article) {
        $location.url("/articles/view?id="+article.id);
    };

    $scope.remove = function(article) {
        $http.delete("/rest/articles"+article.id).success(function(data) {
            $location.url("articles");
            bootbox.message("删除成功");
            $scope.refreshArticles();
        });
    };
    $scope.index = function() {
        $scope.tag = "全部";
        $scope.refreshArticles();
    };
    $scope.search_tag = function(tag) {
        $scope.tag = tag;
        $scope.refreshArticles();
    };

    $scope.refreshArticles = function() {
        var url = "/rest/articles/";
        var tag = $scope.tag;
        if(tag!="全部") {
            url += "?tag=" + tag;
        }
        $http.get(url).success(function(data) {
            $scope.articles = data;
        });
    };
    $scope.refreshTags = function() {
        $http.get("/rest/tags/").success(function(data) {
            $scope.tags = data;
        });
    };
    $scope.refreshLinks = function() {
        $http.get("/rest/links/").success(function(data) {
                $scope.links = data;
        });
    };
    $scope.refreshLinks();
    $scope.refreshArticles();
    $scope.refreshTags();
};
ArticlesCtrl.$inject = ['$rootScope', '$scope', '$http','$location'];