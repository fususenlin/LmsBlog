angular.module('dash.config', [])
    .config(function ($httpProvider) {


        $httpProvider.responseInterceptors.push(function ($q) {
            return function (promise) {
                return promise.then(function (response) {
                    if (null != response.data.errorMessage) {
                        return $q.reject(response);
                    }
                    return response;
                });
            };
        });
        $httpProvider.defaults.transformRequest = function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        };
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    });