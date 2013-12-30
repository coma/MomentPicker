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
            default: ['.sass-cache', '.temp', 'dev', 'dist']
        },
        compass: {
            dist: {
                options: {
                    sassDir    : 'src',
                    cssDir     : 'dist',
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            }
        },
        uglify : {
            dist: {
                files: {
                    'dist/MomentPicker.min.js': ['src/MomentPicker.js']
                }
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('test', [
        'jshint', 'qunit'
    ]);

    grunt.registerTask('dist', [
        'clean', 'uglify:dist', 'compass:dist'
    ]);
};
