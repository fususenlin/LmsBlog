var mockapp = angular.module("mockapp", []);

Mock.mockjax(mockapp);

Mock.mock("/needLogin", {
    status: 1
});