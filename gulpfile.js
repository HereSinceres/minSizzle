var gulp = require('gulp')
var gutil = require('gulp-util')
var watchPath = require('gulp-watch-path')
var sourcemaps = require('gulp-sourcemaps')
var combiner = require('stream-combiner2')
var uglify = require('gulp-uglify')

var handleError = function (err) {
        var colors = gutil.colors;
        console.log('\n')
        gutil.log(colors.red('Error!'))
        gutil.log('fileName: ' + colors.red(err.fileName))
        gutil.log('lineNumber: ' + colors.red(err.lineNumber))
        gutil.log('message: ' + err.message)
        gutil.log('plugin: ' + colors.yellow(err.plugin))
    }
    // 压缩js 
gulp.task('uglifyjs', function () {
    var combined = combiner.obj([
        gulp.src('src/**/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('dist/js/')
    ])
    combined.on('error', handleError)
})


gulp.task('watchjs', function () {
    gulp.watch('src/**/*.js', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ])

        combined.on('error', handleError)
    })
})
gulp.task('default', ['watchjs'])