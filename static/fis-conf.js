// 排除源码目录下的node_modules目录，不对其进行构建
fis.config.set('project.exclude', 'bower_components/**');
fis.config.set('modules.postpackager', 'simple');

fis.config.merge({
    pack: {
        'lib/angular.js': 'resource/angular/angular/angular.js',
        'lib/angular.lib.js': 'resource/angular/angular-*/**.js',
        'lib/jquery.js': 'resource/jquery/jquery/jquery.js',
        'lib/jquery.lib.js': 'resource/jquery/jquery-*/**/*.js',
        'lib/bootstrap.js': 'resource/bootstrap/bootstrap/**.js',
        'lib/bootstrap.lib.js': 'resource/bootstrap/bootstrap-*/**.js',
        'lib/components.js': 'resource/components/**.js',
        'lib/in.js': 'resource/in/*.js',
        'lib/lib.css': 'resource/**/*.css',
        'admin/static/app.js': 'admin/app/*.js',
    }
});

var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours()].join(''));

fis.config.set('roadmap.path', [
    {
        reg: /.*\.(js|css)$/,
        query: '?t=${timestamp}',
        //useSprite: true
        useHash: false
    },
    {
        reg: '**.html',
        useCache: false
    }
]);