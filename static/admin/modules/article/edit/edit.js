var ArticleEditCtrl = function ($scope, $modal, $http,$location) {

    $scope.id = $location.search().id;

    $scope.view_content = "";
    $scope.article = {};
    $scope.$watch('article.body',function(data){
         $scope.view_content = window.marked( $scope.article.body);
    });

    $scope.save = function() {
        $http.put("/rest/article/"+$scope.id, $scope.article).success(function(data) {
            console.log(data);
            bootbox.message("保存成功");
        });
    };
    $http.get("/rest/article/"+$scope.id+"/").success(function(data) {
        $scope.article = data;
    });
};
ArticleEditCtrl.$inject = ['$scope', '$modal', '$http','$location'];