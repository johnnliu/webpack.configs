"use strict";

let gulp = require("gulp"),
	gutil = require("gulp-util"),
	//watch = require("gulp-watch"),
    eslint = require("gulp-eslint"),
    webpack = require('webpack'),
    config = require("./webpack.config.js"),
	user = require("./user.js"),
	//spsave = require("gulp-spsave");
	robocopy = require("robocopy");

gulp.task("build", ["lint", "webpack:build"]);

gulp.task("lint", () => {
	return gulp.src("./src/**/*.js")
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task("webpack:build", function (callback) {
	// run webpack
	webpack(config, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("deploy", function () {

	//http://www.binaryjam.com/2016/03/23/vs-code-git-gulp-and-sharepoint/

	return robocopy({
		source: 'dist',
		// http://devhyway/Style Library/hyway/angularjs/app/pm/dist/app.js
		destination: '\\\\devhyway\\davwwwroot\\Style Library\\hyway\\angularjs\\app\\pm\\dist\\' + user.user,
		files: ['*.*'],
		copy: {
			mirror: false
		},
		file: {
			excludeFiles: ['packages.config'],
			excludeDirs: ['Forms'],
		},
		retry: {
			count: 1,
			wait: 1
		},
		logging: {
			verbose: false,
			showUnicode: false,
			includeFullPaths: false,
			sizesAsBytes: false,
			excludeFileSizes: true,
			excludeFileClasses: true,
			//excludeFilenames: true,
			excludeDirectoryNames: true,
			hideProgress: true,
			showEta: false,
			noJobHeader: true,
			noJobSummary: true
		}
	});
});

gulp.task("deploy-dev", function () {

	//http://www.binaryjam.com/2016/03/23/vs-code-git-gulp-and-sharepoint/

	return robocopy({
		source: 'dist',
		// http://devhyway/Style Library/hyway/angularjs/app/pm/dist/app.js
		destination: '\\\\devhyway\\davwwwroot\\Style Library\\hyway\\angularjs\\app\\pm\\dist',
		files: ['*.*'],
		copy: {
			mirror: false
		},
		file: {
			excludeFiles: ['packages.config'],
			excludeDirs: ['Forms', 'jliu', 'jyamauchi'],
		},
		retry: {
			count: 1,
			wait: 1
		},
		logging: {
			verbose: false,
			showUnicode: false,
			includeFullPaths: false,
			sizesAsBytes: false,
			excludeFileSizes: true,
			excludeFileClasses: true,
			//excludeFilenames: true,
			excludeDirectoryNames: true,
			hideProgress: true,
			showEta: false,
			noJobHeader: true,
			noJobSummary: true
		}
	});
});
