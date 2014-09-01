angular.module('dash.run', [])
    .run(function ($rootScope, $location) {

        $rootScope.title = "平台管理";

        $rootScope.goTo = function (url) {
            $location.url(url);
        };

        $rootScope.replaceTo = function (url) {
            window.location.replace(url);
        };

        $rootScope.redirectTo = function (url) {
            window.location.href = url;
        };

        $rootScope.goback = function (step) {
            if (!step) {
                step = 1;
            }
            setTimeout(function () {
                var s = step * -1;
                history.go(s);
            }, 100);
        };

        $rootScope.addCache = function (key, value) {
            var str = value;
            if (str === undefined || str === null) {
                return false;
            } else if (typeof value === 'object') {
                str = angular.toJson(value);
            }
            window.sessionStorage[key] = str;
            return true;
        };
        /**
         * @param key 存储的值
         * @param isDelete 是否取出值后删除缓存
         */
        var JSON_START = /^\s*(\[|\{[^\{])/,
            JSON_END = /[\}\]]\s*$/;
        $rootScope.getCache = function (key, isRemove) {
            var value = window.sessionStorage[key];
            if (JSON_START.test(value) && JSON_END.test(value)) {
                value = angular.fromJson(value);
            }
            if (isRemove) {
                window.sessionStorage.removeItem(key);
            }
            return value;
        };

        $rootScope.removeCache = function (key) {
            window.sessionStorage.removeItem(key);
        };



        localStorage.BSPath = "http://bcs.duapp.com/";
        if ($location.search().token) {
            localStorage.token = $location.search().token;
        }
        if ($location.search().belong) {
            localStorage.belong = $location.search().belong;
        }
    });