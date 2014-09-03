var LoginCtrl = function ($scope, $http, $routeParams, $rootScope) {
    $scope.user = {
        username: "root",
        password: "lms"
    };
    $rootScope.title = "登录";

    $scope.login = function () {
        $http.post("/auth/login/", $scope.user)
            .success(function(data) {
                console.log(data);
                $rootScope.need_login = "admin";
                localStorage.setItem("need_login", "admin");
            });

    };
};
LoginCtrl.$inject = ['$scope', '$http', '$routeParams', '$rootScope'];