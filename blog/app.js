angular.module('blog', [
       'ngRoute',
       'ngResource',
       'ngSanitize',
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