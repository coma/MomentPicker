var gulp     = require('gulp'),
    uglify   = require('gulp-uglify'),
    sass     = require('gulp-sass'),
    jshint   = require('gulp-jshint'),
    qunit    = require('gulp-qunit'),
    sequence = require('run-sequence');

var src = {
    js : 'src/MomentPicker.js',
    css: 'src/MomentPicker.css'
};

var dist = 'dist'

gulp.task('jshint', function () {

    return gulp
        .src(src.js)
        .pipe(jshint({
            eqeqeq  : true,
            trailing: true
        }))
        .pipe(jshint.reporter('default'));
});

gulp.task('qunit', function() {
    
    return gulp
        .src('test/main.html')
        .pipe(qunit());
});

gulp.task('test', function(done) {
    
    sequence('jshint', 'qunit', done);
});

gulp.task('js', function() {

    return gulp
        .src(src.js)
        .pipe(uglify())
        .pipe(gulp.dest(dist));
});

gulp.task('css', function () {

    return gulp
        .src(src.css)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(dist));
});

gulp.task('deploy', ['js', 'css']);