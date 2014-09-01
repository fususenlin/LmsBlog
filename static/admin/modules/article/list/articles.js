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
    $http.get("/rest/articles/",{
        type:"1"
    }).success(function(data) {
        $scope.articles = data;
    });
};
ArticlesCtrl.$inject = ['$scope', '$modal', '$http','$location'];