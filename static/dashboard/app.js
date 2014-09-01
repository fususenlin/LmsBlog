g = g || {};
g._os = "pc";


var dash = angular.module('dash', [
       'ngRoute',
       'ngResource',
       'ngTouch',
       'ngAnimate',
       'ui.bootstrap',
       'frame.$directive',

       'dash.config',
       'dash.filters',
       'dash.run',
       'dash.routes'
    ],

    function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: ' / login '
        });
    }
);