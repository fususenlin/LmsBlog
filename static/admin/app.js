g = g || {};
g._os = "pc";


angular.module('admin', [
       'ngRoute',
       'ngResource',
       'ngSanitize',
       'ngTouch',
       'ngAnimate',
       'ui.bootstrap',
       'frame.$directive',

       'admin.config',
       'admin.filters',
       'admin.run',
       'admin.routes',

       'mockapp'
    ],

    function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/articles'
        });
    }
);