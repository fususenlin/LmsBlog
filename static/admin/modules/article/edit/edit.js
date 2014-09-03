var ArticleEditCtrl = function ($scope, $modal, $http,$location) {

    $scope.view_content = "";
    $scope.article = {};
    $scope.$watch('article.body',function(data){
         $scope.view_content = window.marked( $scope.article.body);
    });

    $scope.save = function() {
        $http.put("/rest/article/"+$location.search().item, $scope.article).success(function(data) {
            console.log("save success");
        });
    };
    $http.get("/rest/article/"+$location.search().item).success(function(data) {
        $scope.article = data;
    });
};
ArticleEditCtrl.$inject = ['$scope', '$modal', '$http','$location'];