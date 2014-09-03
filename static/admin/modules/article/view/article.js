var ArticleCtrl = function ($scope, $modal, $http, $location) {
    $scope.confirm = function () {
        bootbox.confirm("Are you sure?", function (result) {
            bootbox.alert("Confirm result: " + result);
        });
    };
    $http.get("/rest/article/"+$location.search().item).success(function(data) {
        $scope.article = data;
        $scope.article.body = window.marked($scope.article.body);
    });

    $scope.remove = function() {
       $http.delete("/rest/article/"+$location.search().item).success(function(data) {
            $location.url("articles");
       });
        /*$.ajax({
            url: "/rest/article/"+$location.search().item,
            type :"DELETE",
            dataType : "json",
            crossDomain :false
        }).success(function() {
            $location.url("articles");
        });*/
    };
};
ArticleCtrl.$inject = ['$scope', '$modal', '$http','$location'];