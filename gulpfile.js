var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    babel = require("gulp-babel");
//home
var home = {
    name:'main',
    css:[
        './web/assets/css/iconfont.css','./web/assets/css/base.css','./web/assets/css/home.css','./web/assets/css/pre.css',
        './web/assets/css/clawin.css','./web/assets/css/joinUs.css','./web/assets/css/contactUs.css','./web/assets/css/obp.css',
        './web/assets/css/opp.css',
    ],
    js:[
        './web/src/lib/jquery.min.js','./web/src/lib/jquery.scrollify.js','./web/src/public/common.js',
        './web/src/js/homePanelScroll.js','./web/src/js/clawinLottery.js','./web/src/js/clawinFriends.js'
    ]
};
//使用gulp minicss 压缩css
gulp.task('minicss',function () {
    return gulp.src(home.css)    //需要操作的文件,可接受数组
        .pipe(minifycss())   //压缩css
        .pipe(concat('main.css'))    //合并到main.css
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(gulp.dest('./web/assets/styles'));   //输出文件夹
});
//使用gulp minijs 压缩/合并js
gulp.task('minijs',function () {
    return gulp.src(home.js)//需要操作的文件,可接受数组
        .pipe(babel())//编译es6
        .pipe(uglify()) //压缩js
        .pipe(concat('main.js'))    //合并到main.js
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(gulp.dest('./web/assets/scripts'))//输出到文件夹
});