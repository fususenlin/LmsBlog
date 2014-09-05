var ArticleCtrl = function ($scope, $modal, $http, $location) {
    $scope.id = $location.search().id;

    $scope.confirm = function () {
        bootbox.confirm("Are you sure?", function (result) {
            bootbox.alert("Confirm result: " + result);
        });
    };
    $http.get("/rest/article/"+$scope.id).success(function(data) {
        $scope.article = data;
        $scope.article.body = window.marked($scope.article.body);
    });
    $scope.goback = function() {
        $location.path("/articles");
    }

};
ArticleCtrl.$inject = ['$scope', '$modal', '$http','$location'];