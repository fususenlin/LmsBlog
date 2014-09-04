// using jQuery
var csrftoken = getCookie('csrftoken');
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
function refreshCookie(){
    csrftoken = getCookie('csrftoken');
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

angular.module('admin.config', [])
    .config(function ($httpProvider) {

        $httpProvider.responseInterceptors.push(function ($q) {
            return function (promise) {
                return promise.then(function (response) {
                    if (response.data && null != response.data.error_msg) {
                        return $q.reject(response);
                    }
                    return response;
                });
            };
        });
        $httpProvider.defaults.transformResponse.push(function(data,header,status) {
            if(data.error_msg) {
                bootbox.error(data.error_msg);
                return data;
            }
            if(data.detail) {
                bootbox.error(data.detail);
                return data;
            }
            return data;
        });
        $httpProvider.defaults.transformRequest = function (data,headers) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            headers()['X-CSRFToken'] = csrftoken;
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        };
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    });