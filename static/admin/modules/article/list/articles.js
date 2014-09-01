var ArticlesCtrl = function ($scope, $modal, $http,$location) {
    $scope.confirm = function () {
        bootbox.confirm("Are you sure?", function (result) {
            bootbox.alert("Confirm result: " + result);
        });
    };
    $scope.view = function(article) {
        $location.url("/article?item="+article.id);
    };
    $scope.edit = function(article) {
        $location.url("/article/edit?item="+article.id);
    };
    $scope.add = function() {
        $location.url("/article/add");
    };
    $scope.remove = function(article) {
        $http.delete("/rest/article/"+article.id).success(function(data) {
            $.scojs_message('删除成功！', $.scojs_message.TYPE_OK);
            $scope.articles = [];
            $scope.load_articles();
        });
    };
    $scope.load_articles = function() {
        $http.get("/rest/articles?format=json",{
            type:"2"
        }).success(function(data) {
            $scope.articles = data;
        });
    };

    $scope.load_articles();

};
ArticlesCtrl.$inject = ['$scope', '$modal', '$http','$location'];