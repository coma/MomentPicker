module.exports = function(grunt) {

    grunt.initConfig({
        pkg    : grunt.file.readJSON('bower.json'),
        jshint : {
            options: {
                eqeqeq  : true,
                trailing: true
            },
            target : {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        },
        qunit  : {
            all: ['test/**/*.html']
        },
        clean  : {
            default: ['.sass-cache', '.temp', 'dist']
        },
        copy: {
            dev: {
                files: [
                    {
                        expand : true,
                        dest   : 'dev',
                        src    : [
                            'src/*.js',
                            'bower_components/**'
                        ]
                    }
                ]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir    : 'src',
                    cssDir     : 'dist',
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            },
            dev : {
                options: {
                    sassDir    : 'src',
                    cssDir     : 'dev/src',
                    environment: 'development',
                    outputStyle: 'expanded'
                }
            }
        },
        uglify : {
            dist: {
                files: {
                    'dist/MomentPicker.min.js': ['src/MomentPicker.js']
                }
            }
        },
        connect: {
            dev: {
                options: {
                    hostname: '0.0.0.0',
                    port    : 1337,
                    base    : 'dev'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['src/*.scss'],
                tasks: ['compass:dev']
            }
        },
        open: {
            dev: {
                path: 'http://<%= connect.dev.options.hostname %>:<%= connect.dev.options.port %>'
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('test', [
        'jshint',
        'qunit'
    ]);

    grunt.registerTask('dev', [
        'copy:dev',
        'compass:dev',
        'connect:dev',
        'open:dev',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'clean',
        'uglify:dist',
        'compass:dist'
    ]);
};
