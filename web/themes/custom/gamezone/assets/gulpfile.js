const { src, dest, watch } = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));
var sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyJs = require('gulp-uglify');
const concat = require('gulp-concat');

compileSass.compiler = require('node-sass');

//..........Sass compiler task.............
const bundleSaas = () => {
    return src('./src/sass/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourceMaps.write())
        .pipe(dest('./dist/css'));
}

//..........Js compiler task.............
const bundleJs = () => {
    return src('./src/js/*.js')
        .pipe(sourceMaps.init())
        .pipe(minifyJs())
        .pipe(concat('bundle.js'))
        .pipe(sourceMaps.write())
        .pipe(dest('./dist/js'));
}

//..........All compiler task.............  
const devWatch = () => {
    watch('./src/sass/**/*.scss', bundleSaas);
    watch('./src/js/*.js', bundleJs);
}

//..........Exports task.............
exports.bundleSaas = bundleSaas;
exports.bundleJs = bundleJs;
exports.devWatch = devWatch;