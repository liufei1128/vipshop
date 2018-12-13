var gulp = require('gulp');
var uglify = require("gulp-uglify");//JS
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
const rev = require('gulp-rev');
var minicss = require('gulp-clean-css');//引入css
var minihtml = require("gulp-html-minify");//HTML
const imagemin = require('gulp-imagemin');//image
var run = require('run-sequence');
var revCollector = require('gulp-rev-collector');//修改路径版本号
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var del = require('del');

gulp.task('default', function(callback) {
	run(['minijs', 'sass', 'miniimage','iconfont','json'],
		'minihtml',
		'connect',
        'watch',
		callback)
});

gulp.task("minihtml",function(){
	gulp.src(['rev/**/*.json', 'app/**/*.html'])
	.pipe(revCollector())
	.pipe(minihtml())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())//实时刷新
});

gulp.task("minicss",function(){
	gulp.src('app/static/css/**/*.css')
    .pipe(minicss())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(connect.reload())
});
gulp.task("sass",function(){
	return gulp.src('app/static/css/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/static/css'))
    .pipe(connect.reload())
});

gulp.task("miniimage",function(){
	gulp.src('app/static/images/*')
    .pipe(gulp.dest('dist/static/images'))
    .pipe(connect.reload())
})

gulp.task("minijs",function(){
	gulp.src('app/static/js/*.js')
		.pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(uglify())
//  .pipe(rev())
    .pipe(gulp.dest("dist/static/js"))
//  .pipe(rev.manifest())
//  .pipe(gulp.dest("rev/js"))
    .pipe(connect.reload())
});

gulp.task("iconfont",function(){
	gulp.src('app/static/font/*')
	.pipe(gulp.dest('dist/static/font'))
	.pipe(connect.reload())
});
gulp.task("json",function(){
	gulp.src('app/static/json/*')
	.pipe(gulp.dest('dist/static/json'))
	.pipe(connect.reload())
});
gulp.task('watch', function() {
    gulp.watch('app/**/*.html', ['minihtml'])
    gulp.watch('app/**/*.js', ['minijs'])
    gulp.watch('app/**/*.scss', ['sass'])
    gulp.watch('app/**/*', ['miniimage'])
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});

gulp.task('clean', () => {
    del(['dist', 'rev'])
})
//gulp.task("concat",function(){
//	gulp.src(['js/public.js','js/login.js'])
//  .pipe(concat("all.js"))
//  .pipe(gulp.dest('./dist'))
//});
//gulp.task("rev",function(){
//	gulp.src('js/login.js')
//	.pipe(rev())
//	.pipe(gulp.dest("dist"))
//	.pipe(rev.manifest())
//	.pipe(gulp.dest("rev/js"))
//})

