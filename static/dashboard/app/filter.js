angular.module('dash.filters', [])
    .filter('tpcStatus', function () {
        return function (input) {
            if (!input) {
                return input;
            }
            var input = parseInt(input);

            switch (input) {
            case 1:
                return "等待处理";
            case 2:
                return "处理中";
            case 3:
                return "已完成";
            default:
                return "";
            }
        };
    })
    .filter('tpcTime', function () {
        return function (input) {
            if (!input) {
                return input;
            }
            var messageDate = new Date(parseInt(input));
            var fullyear = messageDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = messageDate.getMonth(); //获取当前月份(0-11,0代表1月)
            var date = messageDate.getDate(); //获取当前日(1-31)
            var hours = messageDate.getHours(); //获取当前小时数(0-23)
            var minutes = messageDate.getMinutes(); //获取当前分钟数(0-59)

            var today = new Date();
            if (isyesterday(today, messageDate)) {
                if (hours >= 0 && hours < 6) {
                    return "昨天 凌晨";
                } else if (hours >= 6 && hours < 12) {
                    return "昨天 早上";
                } else if (hours >= 12 && hours < 13) {
                    return "昨天 中午";
                } else if (hours >= 13 && hours < 18) {
                    return "昨天 下午";
                } else if (hours >= 18 && hours < 24) {
                    return "昨天 晚上";
                }
            } else if (istoday(today, messageDate)) {
                if (hours >= 0 && hours < 6) {
                    return "凌晨 " + hours + ":" + minutes;
                } else if (hours >= 6 && hours < 12) {
                    return "早上 " + hours + ":" + minutes;
                } else if (hours >= 12 && hours < 13) {
                    return "中午 " + hours + ":" + minutes;
                } else if (hours >= 13 && hours < 18) {
                    return "下午 " + hours + ":" + minutes;
                } else if (hours >= 18 && hours < 24) {
                    return "晚上 " + hours + ":" + minutes;
                }
            } else {
                return (month + 1) + "月" + date + "日 ";
            }
        };
    })
    .filter('tohtml', ['$sce',
        function ($sce)
        {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }])
    .filter('date', function () {
        return function (input) {
            if (!input) {
                return input;
            }
            var messageDate = new Date(parseInt(input) * 1000);
            var fullyear = messageDate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = messageDate.getMonth(); //获取当前月份(0-11,0代表1月)
            var date = messageDate.getDate(); //获取当前日(1-31)
            var hours = messageDate.getHours(); //获取当前小时数(0-23)
            var minutes = messageDate.getMinutes(); //获取当前分钟数(0-59)

            var today = new Date();
            return (month + 1) + "月" + date + "日 ";
        };
    })
    .filter('mdItemCount', function () {
        return function (input) {
            if (!input) {
                return input;
            }
            var input = parseInt(input);

            return input > 9 ? "N" : input;
        };
    })