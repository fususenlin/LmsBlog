var LoginCtrl = function ($scope, $http, $routeParams, $rootScope) {
    $scope.user = {
        account: "admin",
        password: "admin"
    };
    $rootScope.title = "登录";

    $scope.login = function () {
        $rootScope.need_login = "admin";
        localStorage.setItem("need_login", "admin");
    };
};
LoginCtrl.$inject = ['$scope', '$http', '$routeParams', '$rootScope'];