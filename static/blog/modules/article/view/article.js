var ArticleCtrl = function ($scope, $http, $location) {
    $scope.id = $location.search().id;

    $scope.confirm = function () {
        bootbox.confirm("Are you sure?", function (result) {
            bootbox.alert("Confirm result: " + result);
        });
    };
    $http.get("/rest/articles/"+$scope.id).success(function(data) {
        $scope.article = data;
        $scope.article.body = window.marked($scope.article.body);
        $scope.$$postDigest(function(){
            toggleDuoshuoComments("#comment-article", "at-"+$scope.id, "http://limaoshengcpp.cn/#/articles?id="+$scope.id, $scope.article.title);
        });
    });
    $scope.goback = function() {
        $location.path("/articles");
    }

};
ArticleCtrl.$inject = ['$scope', '$http','$location'];