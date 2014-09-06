var ArticleAddCtrl = function ($scope, $modal, $http,$location) {

    $scope.mark_content = "dwqdqwd";
    $scope.article = {
        title:"dqwdwq",
        body:"dwqd22222",
        type:"1",
        timestamp:new Date().toJSON()
    };

    $scope.$watch('article.body',function(data){
        $scope.view_content= window.marked($scope.article.body);
    });

    $scope.save = function() {
        $http.post("/rest/article/", $scope.article).success(function(data) {
            $location.url("articles");
            bootbox.message("新增成功");
         });
    };

};
ArticleAddCtrl.$inject = ['$scope', '$modal', '$http','$location'];