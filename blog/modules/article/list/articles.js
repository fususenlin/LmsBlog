var ArticlesCtrl = function ($rootScope, $scope, $http,$location) {
    $scope.confirm = function () {
        bootbox.confirm("Are you sure?", function (result) {
            bootbox.alert("Confirm result: " + result);
        });
    };
    $scope.view = function(article) {
        $location.url("/article?id="+article.id);
    };
    $scope.edit = function(article) {
        $location.url("/article/edit?id="+article.id);
    };
    $scope.add = function() {
        $location.url("/article/add");
    };
    $scope.remove = function(article) {
        $http.delete("/rest/article/"+article.id).success(function(data) {
            $location.url("articles");
            bootbox.message("删除成功");
            $scope.refreshArticles();
        });
    };

    $scope.refreshArticles = function() {
        $http.get("/rest/articles/",{
                type:"1"
            }).success(function(data) {
                $scope.articles = data;
            });
    }

    $scope.refreshLinks = function() {
        $http.get("/rest/links/").success(function(data) {
                $scope.links = data;
        });
    }
    $scope.refreshLinks();
    $scope.refreshArticles();
};
ArticlesCtrl.$inject = ['$rootScope', '$scope', '$http','$location'];