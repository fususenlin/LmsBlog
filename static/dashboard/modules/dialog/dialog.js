var DialogCtrl = function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.confirm = function () {
        bootbox.confirm("Are you sure?", function (result) {
            bootbox.alert("Confirm result: " + result);
        });
    };
    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: '../dashboard/modules/dialog/modal.html',
            controller: ModalInstanceCtrl,
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (retStr) {

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

};
DialogCtrl.$inject = ['$scope', '$modal', '$log'];

function init() {
    setTimeout(function () {
        var map = new BMap.Map("allmap"); // 创建Map实例
        var point = new BMap.Point(116.404, 39.915); // 创建点坐标
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(); //启用滚轮放大缩小
    }, 1000)

}

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.$$postDigest(function () {
        init();
    });
    $scope.ok = function () {
        $modalInstance.close("ok");
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
ModalInstanceCtrl.$inject = ['$scope', '$modalInstance', 'items'];