var ArticleEditCtrl = function ($scope, $modal, $http,$location) {
    $scope.id = $location.search().item;
    $scope.view_content = "";
    $scope.$watch('article.body',function(data){
        if($scope.article) {
            $scope.view_content = window.marked( $scope.article.body);
        }
    });
    $scope.save = function() {
        $http.put("/rest/article/"+$scope.id , $scope.article).success(function(data) {
            console.log("save success");
            $.scojs_message('保存成功！', $.scojs_message.TYPE_OK);
        });
    };
    $http.get("/rest/article/"+$scope.id ).success(function(data) {
        $scope.article = data;
    });
};
ArticleEditCtrl.$inject = ['$scope', '$modal', '$http','$location'];