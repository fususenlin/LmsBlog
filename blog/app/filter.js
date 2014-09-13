angular.module('admin.filters', [])
    .filter('date', function () {
        return function (input) {
            if (!input) {
                return input;
            }

            return input.split("T")[0];
        };
    });