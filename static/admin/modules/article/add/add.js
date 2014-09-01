var ArticleAddCtrl = function ($scope, $modal, $http,$location) {
    $scope.mark_content = "dwqdqwd";
    $scope.article = {
        title:"dqwdwq",
        body:"dwqd22222",
        type:"1",
        timestamp:new Date()
    };

    $scope.$watch('article.body',function(data){
        $scope.view_content= window.marked($scope.article.body);
    });

    $scope.save = function() {
        /*$http.put("/rest/article", $scope.article).success(function(data) {
         $location.url("articles");
         });*/

        $.ajax({
            url: "/rest/article",
            type :"PUT",
            dataType : "json",
            crossDomain :false
        }).success(function() {
            $location.url("articles");
        });
    };

};
ArticleAddCtrl.$inject = ['$scope', '$modal', '$http','$location'];