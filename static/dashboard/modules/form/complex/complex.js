var FormComplexCtrl = function ($scope, $http, $routeParams, $rootScope) {

    $scope.$$postDigest(function () {

        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-blue',
            radioClass: 'iradio_flat-blue',
            increaseArea: '20%' // optional
        });

        // select2 plugin for select elements
        $(".select2").select2({
            placeholder: "Select a State"
        });

        // datepicker plugin
        $('.input-datepicker').datepicker().on('changeDate', function (ev) {
            $(this).datepicker('hide');
        });


    });



};
FormComplexCtrl.$inject = ['$scope', '$http', '$routeParams', '$rootScope'];