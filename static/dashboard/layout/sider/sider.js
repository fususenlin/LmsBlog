'use strict';
var SiderCtrl = function ($scope, $routeParams, $rootScope, $location, $http) {

    $scope.base = "index.html#";
    $scope.active = 0; // start from 0

    $scope.init = function (item, $index) {
        $scope.active = $index;
        if (item.url) {
            $("#dashboard-menu .dropdown-toggle").removeClass("active");
            $("#dashboard-menu .submenu").slideUp("fast");
            $location.url(item.url);

        }

    };

    $scope.redirect = function (item) {
        $location.url(item.url);

    };

    $scope.items = [];
    $scope.items.push({
        name: "首页",
        icon: "fa fa-home",
        url: "/"
    });
    $scope.initWiget = function () {
        $scope.$$postDigest(function () {
            // skin changer
            $(".skins-nav .skin").click(function (e) {
                e.preventDefault();
                if ($(this).hasClass("selected")) {
                    return;
                }
                $(".skins-nav .skin").removeClass("selected");
                $(this).addClass("selected");

                if (!$("#skin-file").length) {
                    $("head").append('<link rel="stylesheet" type="text/css" id="skin-file" href="">');
                }
                var $skin = $("#skin-file");
                if ($(this).attr("data-file")) {
                    $skin.attr("href", $(this).data("file"));
                } else {
                    $skin.attr("href", "");
                }
            });

            $("#dashboard-menu .dropdown-toggle").on("click", function (e) {
                e.preventDefault();
                var $item = $(this);
                $item.toggleClass("active");
                if ($item.hasClass("active")) {
                    $item.parent().find(".submenu").slideDown("fast");
                } else {
                    $item.parent().find(".submenu").slideUp("fast");
                }

            });

            // mobile side-menu slide toggler
            var $menu = $("#sidebar-nav");
            $("body").click(function () {
                if ($(this).hasClass("menu")) {
                    $(this).removeClass("menu");
                }
            });
            $menu.click(function (e) {
                e.stopPropagation();
            });
            $("#menu-toggler").click(function (e) {
                e.stopPropagation();
                $("body").toggleClass("menu");
            });
            $(window).resize(function () {
                $(this).width() > 769 && $("body.menu").removeClass("menu")
            })


            // build all tooltips from data-attributes
            $("[data-toggle='tooltip']").each(function (index, el) {
                $(el).tooltip({
                    placement: $(this).data("placement") || 'top'
                });
            });


            // custom uiDropdown element, example can be seen in user-list.html on the 'Filter users' button
            var uiDropdown = new function () {
                var self;
                self = this;
                this.hideDialog = function ($el) {
                    return $el.find(".dialog").hide().removeClass("is-visible");
                };
                this.showDialog = function ($el) {
                    return $el.find(".dialog").show().addClass("is-visible");
                };
                return this.initialize = function () {
                    $("html").click(function () {
                        $(".ui-dropdown .head").removeClass("active");
                        return self.hideDialog($(".ui-dropdown"));
                    });
                    $(".ui-dropdown .body").click(function (e) {
                        return e.stopPropagation();
                    });
                    return $(".ui-dropdown").each(function (index, el) {
                        return $(el).click(function (e) {
                            e.stopPropagation();
                            $(el).find(".head").toggleClass("active");
                            if ($(el).find(".head").hasClass("active")) {
                                return self.showDialog($(el));
                            } else {
                                return self.hideDialog($(el));
                            }
                        });
                    });
                };
            };

            // instantiate new uiDropdown from above to build the plugins
            new uiDropdown();


            // toggle all checkboxes from a table when header checkbox is clicked
            $(".table th input:checkbox").click(function () {
                $checks = $(this).closest(".table").find("tbody input:checkbox");
                if ($(this).is(":checked")) {
                    $checks.prop("checked", true);
                } else {
                    $checks.prop("checked", false);
                }
            });

            // quirk to fix dark skin sidebar menu because of B3 border-box
            if ($("#sidebar-nav").height() > $(".content").height()) {
                $("html").addClass("small");
            }
        });

    };
    $rootScope.title = "工作台";
    $scope.hotList = [];
    var token = $routeParams.token;

    function UrlSearch() {
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                this[name] = value;
            }
        }
    }
    var Request = new UrlSearch(); //实例化
    var belong = Request.belong;
    //*************************************************
    //localStorage.clear();
    _localInitSiderCtrl($scope, $http);
    //********************************************/ 
};

SiderCtrl.$inject = ['$scope', '$routeParams', '$rootScope', '$location', '$http'];




function _localInitSiderCtrl($scope, $http) {

    $http.get('../dashboard/app/nav.json').success(function (json) {
        $scope.items = json;
        $scope.initWiget();
    });

}