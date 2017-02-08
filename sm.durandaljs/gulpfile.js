"use strict";

let gulp = require("gulp"),
	//gutil = require("gulp-util"),
    eslint = require("gulp-eslint"),
	//spsave = require("gulp-spsave");
	user = require("./user.js"),
	durandal = require('gulp-durandal'),
	durandalConfig = require('./durandal.config'),
	robocopy = require("robocopy");
	

gulp.task("build", ["lint", "dev"]);

gulp.task("lint", () => {
	return gulp.src("./durandal/**/*.js")
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('dev', function () {
	//var node_modules = '../../../node_modules';

    durandalConfig.output = user.output;

    return durandal(durandalConfig)
        .pipe(gulp.dest('dist'));
});

gulp.task('prod', function(){

    return durandal(durandalConfig)
        .pipe(gulp.dest('dist'));

});

gulp.task("deploy", function () {

	//http://www.binaryjam.com/2016/03/23/vs-code-git-gulp-and-sharepoint/

	return robocopy({
		source: 'dist',
		// http://devhyway/Style Library/hyway/angularjs/app/pm/dist/app.js
		destination: '\\\\devhyway\\davwwwroot\\Style Library\\hyway\\durandal\\app\\siteManagement\\dist',
		files: ['*.*'],
		copy: {
			mirror: false
		},
		file: {
			excludeFiles: ['packages.config','main.js','main.js.map'],
			excludeDirs: ['Forms'],
		},
		retry: {
			count: 2,
			wait: 3
		}
	});
});