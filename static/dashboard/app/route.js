$routeProvider.when("/template", {
    resource: 'template/template',
    controller: 'TemplateCtrl'
});

$routeProvider.when("/login", {
    resource: 'login/login',
    controller: 'LoginCtrl'
});
$routeProvider.when("/form/sample", {
    resource: 'form/sample/sample',
    controller: 'FormSampleCtrl'
});
$routeProvider.when("/form/complex", {
    resource: 'form/complex/complex',
    controller: 'FormComplexCtrl',
    require: ['js/bootstrap.datepicker.js', 'js/select2.min.js', '../resource/bootstrap/bootstrap-icheck/icheck.js']
});
$routeProvider.when("/grid", {
    resource: 'grid/grid',
    controller: 'GridCtrl'
});
$routeProvider.when("/table", {
    resource: 'table/table',
    controller: 'TableCtrl'
});
$routeProvider.when("/ztree", {
    resource: 'ztree/ztree',
    controller: 'TreeCtrl',
    require: ['../resource/jquery/jquery-ztree/zTreeStyle.css', '../resource/jquery/jquery-ztree/jquery.ztree.all-3.5.js']
});
$routeProvider.when("/content_title", {
    resource: 'content_title/content_title'
});
$routeProvider.when("/form/search", {
    resource: 'form/search/search'
});
$routeProvider.when("/form/input/one", {
    resource: 'form/input/one'
});
$routeProvider.when("/form/input/two", {
    resource: 'form/input/two'
});

$routeProvider.when("/dialog", {
    resource: 'dialog/dialog',
    controller: 'DialogCtrl',
    require: ['../resource/components/bmap/bmap.js']
});
$route("dash.routes", "../dashboard/modules/");