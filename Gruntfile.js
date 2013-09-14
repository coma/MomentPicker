module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        clean: {
            dev: ['dev']
        },
        copy: {
            extra: {
                files: [
                    {
                        filter: 'isFile',
                        expand: true,
                        flatten: true,
                        dest: 'dev',
                        src: [
                            'bower_components/momentjs/moment.js',
                            'bower_components/jquery/jquery.js',
                            'extra/**'
                        ]
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        dest: 'dev',
                        src: [
                            'src/*.js'
                        ]
                    }
                ]
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src',
                    cssDir: 'dev',
                    environment: 'development',
                    outputStyle: 'expanded'
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
            },
            js: {
                files: ['src/*.js'],
                tasks: ['copy:dev']
            }
        },
        open: {
            dev: {
                path: 'http://<%= connect.dev.options.hostname %>:<%= connect.dev.options.port %>'
            }
        }
    });

    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'clean:dev',
        'copy:extra',
        'copy:dev',
        'compass:dev',
        'connect:dev',
        'open:dev',
        'watch'
    ]);

};
