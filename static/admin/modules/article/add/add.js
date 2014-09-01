var ArticleAddCtrl = function ($scope, $modal, $http,$location) {
    $scope.mark_content = "dwqdqwd";
    $scope.article = {
        title:"dqwdwq",
        body:"dwqd22222",
        type:"2"
    };

    $scope.$watch('article.body',function(data){
        $scope.view_content= window.marked($scope.article.body);
    });

    $scope.save = function() {
        $scope.article.timestamp = new Date().toJSON();
        $http.post("/rest/article/?format=json", $scope.article).success(function(data) {
            $location.url("articles");
            $.scojs_message('添加成功！', $.scojs_message.TYPE_OK);
        });
    };

};
ArticleAddCtrl.$inject = ['$scope', '$modal', '$http','$location'];