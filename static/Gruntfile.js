module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            apps: {
                src: ['app/app.js',
                      'app/user/module.js',
                      'app/settingAndManager/module.js',
                      'app/module.js'],
                dest: 'dist/app.js'
            },
            templates: {
                src: ['template/**/*.js'],
                dest: 'dist/template.js'
            },
            directives: {
                src: ['common/directives/**/*.js'],
                dest: 'dist/directive.js'
            },
            vendor: {
                src: ['vendor/**/*.js',
                      'bower_components/angular-deckgrid/angular-deckgrid.js',
                      'bower_components/iscroll/build/iscroll.js'],
                dest: 'dist/vendor.js'
            },
            tools: {
                src: ['common/tools/**/*.js'],
                dest: 'dist/tools.js'
            },
            css_quick_date: {
                src: ['vendor/angular/angular-quick-date-fz/**/*.css'],
                dest: 'dist/angular-quick-date-fz.css'
            },
            css_alertify: {
                src: ['bower_components/alertify.js/themes/alertify.core.css',
                      'bower_components/alertify.js/themes/alertify.default.css'],
                dest: 'dist/alertify.css'
            },
            css_directive: {
                src: ['common/directives/**/*.css'],
                dest: 'dist/directives.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! app <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            apps: {
                files: {
                    'dist/app.min.js': ['<%= concat.apps.dest %>']
                }
            },
            templates: {
                files: {
                    'dist/template.min.js': ['<%= concat.templates.dest %>']
                }
            },
            directives: {
                files: {
                    'dist/directive.min.js': ['<%= concat.directives.dest %>']
                }
            },
            vendor: {
                files: {
                    'dist/vendor.min.js': ['<%= concat.vendor.dest %>']
                }
            },
            tools: {
                files: {
                    'dist/tools.min.js': ['<%= concat.tools.dest %>']
                }
            }
        },
        cssmin: {
            alertify_core: {
                src: ['<%= concat.css_alertify.dest %>'],
                dest: 'dist/alertify.min.css'
            },
            angular_quick_date_fz: {
                src: ['<%= concat.css_quick_date.dest %>'],
                dest: 'dist/angular-quick-date-fz.min.css'
            },
            directive: {
                src: ['<%= concat.css_directive.dest %>'],
                dest: 'dist/directive.min.css'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: false,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);

};