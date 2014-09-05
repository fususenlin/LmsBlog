angular.module('blog', [
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
       'admin.routes'
    ],

    function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/articles'
        });
    }
);