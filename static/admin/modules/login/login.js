/**
 * Created by Motion on 2014/9/4 0004.
 */
var LoginPreCtrl = function ($rootScope, $scope, $http, $location) {
    $rootScope.need_login = "login";
    localStorage.setItem("need_login", "login");
};
LoginPreCtrl.$inject = ['$rootScope','$scope',  '$http','$location'];