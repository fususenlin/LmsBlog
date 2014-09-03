function MainCtrl($scope, $http, $routeParams, $rootScope) {
    //$rootScope.need_login = localStorage.getItem("need_login");
    $rootScope.need_login = $rootScope.need_login || "admin";

    /* $http.post('/login', {}).success(function (data) {

        if (data.status == 1) {
            $rootScope.view = "admin";
        }
    }).error(function (data) {
        $rootScope.view = "admin";
    });*/
}