var ArticlesCtrl = function ($rootScope, $scope, $modal, $http,$location) {
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
    $scope.$watch($rootScope.need_login,function(){
        if($rootScope.need_login == "admin") {
            $scope.refreshArticles();
        }
    })
};
ArticlesCtrl.$inject = ['$rootScope', '$scope', '$modal', '$http','$location'];