var gulp = require('gulp');
var exec = require('child_process').exec;
var server = require('browser-sync').create();

function reload(done) {
	server.reload();
	done();
}
function serve(done) {
	server.init({
		notify: false,
		startPath: 'index.html',
		server: {
			baseDir: './'
		}
	});
	done();
}
function watch() {
	gulp.watch([
		'**/*.ts',
		'**/*.tsx',
		'index.html'
	], gulp.series('compile', reload))
}

gulp.task('compile', function (done) {
	exec('node-tsc.cmd', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		done(err);
	});
});

gulp.task('serve', gulp.series('compile', serve, watch));

gulp.task('setup', function () {
	return gulp.src([
		'node_modules/requirejs/require.js',
		'node_modules/react/umd/react.development.js',
		'node_modules/react-dom/umd/react-dom.development.js'
	]).pipe(gulp.dest('lib'));
});

gulp.task('default', gulp.series('serve'));