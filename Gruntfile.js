module.exports = function(grunt) {

    grunt.initConfig({
        pkg   : grunt.file.readJSON('bower.json'),
        jshint: {
            options: {
                eqeqeq  : true,
                trailing: true
            },
            target : {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        },
        qunit : {
            all: ['test/**/*.html']
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('test', [
        'jshint',
        'qunit'
    ]);
};
