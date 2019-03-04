/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/
var gulp = require('gulp'),
  path = require('path'),
  browserSync = require('browser-sync').create(),
  argv = require('minimist')(process.argv.slice(2)),
  exec = require('child_process').exec,
  sassLint = require('gulp-sass-lint'),
  cache = require('gulp-cached'),
  rename = require('gulp-rename'),
  svgSymbols = require('gulp-svg-symbols'),
  svgmin = require('gulp-svgmin');

function resolvePath(pathInput) {
  return path.resolve(pathInput).replace(/\\/g, "/");
}

/******************************************************
 * CUSTOM TASKS
******************************************************/
// SVG Spriting
// SVG minification for export
gulp.task('svgmin', function() {
  return gulp
    .src(['*.svg', '!*.min.svg'], { cwd: resolvePath(paths().source.icons) })
    .pipe(svgmin({
      plugins: [
        {
          removeTitle: false
        },
        {
          removeViewBox: false
        },
        {
          addCustomDimension: {
            type: 'perItem',
            description: 'Adds 100% width + height attributes to SVG',
            params: {},
            fn: function(item) {
              if (
                item.isElem('svg') &&
                item.hasAttr('viewBox')
              ) {
                item.attrs.width = { name: 'width', value: '100%', prefix: '', local: 'width' };
                item.attrs.height = { name: 'height', value: '100%', prefix: '', local: 'height' };
              }
            }
          }
        }
      ]
    }))
    .pipe(rename({
      suffix: ".min",
    }))
    .pipe(gulp.dest(resolvePath(paths().source.icons)))
});

gulp.task('sprites', function() {
  return gulp
    .src('*.min.svg', { cwd: resolvePath(paths().source.icons) })
    .pipe(svgSymbols({
      templates: ['default-svg'],
      slug: function(name) {
        return name.replace(/_/g, '-').replace(/.min$/,'')
      }
    }))
    .pipe(rename('svg-sprite.svg'))
    .pipe(gulp.dest(resolvePath(paths().source.images)+'/porsche-ui-kit-docs/'))
});

/******************************************************
 * COPY TASKS - stream assets from source to destination
******************************************************/
// JS copy
gulp.task('pl-copy:js', function () {
  return gulp.src('**/*.js', { cwd: resolvePath(paths().source.js) })
    .pipe(gulp.dest(resolvePath(paths().public.js)));
});

// Images copy
gulp.task('pl-copy:img', function () {
  return gulp.src('**/*.*', { cwd: resolvePath(paths().source.images) })
    .pipe(gulp.dest(resolvePath(paths().public.images)));
});

// Favicon copy
gulp.task('pl-copy:favicon', function () {
  return gulp.src('favicon.ico', { cwd: resolvePath(paths().source.root) })
    .pipe(gulp.dest(resolvePath(paths().public.root)));
});

// Fonts copy
gulp.task('pl-copy:font', function () {
  return gulp.src('*', { cwd: resolvePath(paths().source.fonts) })
    .pipe(gulp.dest(resolvePath(paths().public.fonts)));
});

// CSS Copy
gulp.task('pl-copy:css', function () {
  return gulp.src(resolvePath(paths().source.css) + '/*.css')
    .pipe(gulp.dest(resolvePath(paths().public.css)))
    .pipe(browserSync.stream());
});

// Styleguide Copy everything but css
gulp.task('pl-copy:styleguide', function () {
  return gulp.src(resolvePath(paths().source.styleguide) + '/**/!(*.css)')
    .pipe(gulp.dest(resolvePath(paths().public.root)))
    .pipe(browserSync.stream());
});

// Styleguide Copy and flatten css
gulp.task('pl-copy:styleguide-css', function () {
  return gulp.src(resolvePath(paths().source.styleguide) + '/**/*.css')
    .pipe(gulp.dest(function (file) {
      //flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return resolvePath(path.join(paths().public.styleguide, '/css'));
    }))
    .pipe(browserSync.stream());
});

gulp.task('pl-lint:porsche-stylesheet', function() {
  return gulp.src(resolvePath(paths().source.porscheStylesheets) + '/src/**/*.s+(a|c)ss')
    .pipe(cache('linting'))
    .pipe(sassLint({
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format());
})

// Porsche Stylesheet build
gulp.task('pl-build:porsche-stylesheets', function (cb) {
  exec('npm run build:all:dev', {maxBuffer: 1024 * 1000}, function (err, stdout, stderr) {
    cb(err);
  });
});

// Porsche Stylesheets Copy
gulp.task('pl-copy:porsche-stylesheets', gulp.series('pl-build:porsche-stylesheets', function () {
  return gulp.src(resolvePath(paths().source.porscheStylesheets) + '/dist/**/*')
    .pipe(gulp.dest(resolvePath(paths().public.css)))
    .pipe(browserSync.stream());
}));

/******************************************************
 * PATTERN LAB CONFIGURATION - API with core library
******************************************************/
//read all paths from our namespaced config file
var config = require('./patternlab-config.json'),
  patternlab = require('patternlab-node')(config);

function paths() {
  return config.paths;
}

function getConfiguredCleanOption() {
  return config.cleanPublic;
}

function build(done) {
  patternlab.build(done, getConfiguredCleanOption());
}

gulp.task('pl-assets', gulp.series(
  gulp.parallel(
    'pl-copy:js',
    'pl-copy:img',
    'pl-copy:favicon',
    'pl-copy:font',
    'pl-copy:css',
    'pl-copy:styleguide',
    'pl-copy:styleguide-css',
    'pl-copy:porsche-stylesheets'
  ),
  function (done) {
    done();
  })
);

gulp.task('patternlab:version', function (done) {
  patternlab.version();
  done();
});

gulp.task('patternlab:help', function (done) {
  patternlab.help();
  done();
});

gulp.task('patternlab:patternsonly', function (done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
});

gulp.task('patternlab:liststarterkits', function (done) {
  patternlab.liststarterkits();
  done();
});

gulp.task('patternlab:loadstarterkit', function (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
});

gulp.task('patternlab:build', gulp.series('svgmin', 'sprites', 'pl-assets', build, 'pl-lint:porsche-stylesheet', function (done) {
  done();
}));

gulp.task('patternlab:installplugin', function (done) {
  patternlab.installplugin(argv.plugin);
  done();
});

/******************************************************
 * SERVER AND WATCH TASKS
******************************************************/
// watch task utility functions
function getSupportedTemplateExtensions() {
  var engines = require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return resolvePath(paths().source.patterns) + '/**/*' + dotExtension;
  });
}

function reload() {
  browserSync.reload();
}

function reloadCSS() {
  browserSync.reload('*.css');
}

function watch() {
  gulp.watch(resolvePath(paths().source.css) + '/**/*.css', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:css', reloadCSS));
  gulp.watch(resolvePath(paths().source.porscheStylesheets) + '/src/**/*.scss', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:porsche-stylesheets', 'pl-lint:porsche-stylesheet', reloadCSS));
  gulp.watch(resolvePath(paths().source.js) + '/**/*.js', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:js', reload));
  gulp.watch(resolvePath(paths().source.styleguide) + '/**/*.*', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:styleguide', 'pl-copy:styleguide-css', reloadCSS));

  var patternWatches = [
    resolvePath(paths().source.patterns) + '/**/*.json',
    resolvePath(paths().source.patterns) + '/**/*.md',
    resolvePath(paths().source.data) + '/*.json',
    resolvePath(paths().source.fonts) + '/*',
    resolvePath(paths().source.images) + '/*',
    resolvePath(paths().source.meta) + '/*',
    resolvePath(paths().source.annotations) + '/*',
    resolvePath(paths().source.js) + '/*'
  ].concat(getTemplateWatches());

  console.log(patternWatches);

  gulp.watch(patternWatches, { awaitWriteFinish: true }).on('change', gulp.series(build, reload));
}

gulp.task('patternlab:connect', gulp.series(function (done) {
  browserSync.init({
    server: {
      baseDir: resolvePath(paths().public.root)
    },
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: ['/index.html', '/', '/?*']
    },
    notify: false
  }, function () {
    console.log('PATTERN LAB NODE WATCHING FOR CHANGES');
    done();
  });
}));

/******************************************************
 * COMPOUND TASKS
******************************************************/
gulp.task('default', gulp.series('patternlab:build'));
gulp.task('patternlab:watch', gulp.series('patternlab:build', watch));
gulp.task('patternlab:serve', gulp.series('patternlab:build', 'patternlab:connect', watch));
