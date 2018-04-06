module.exports = {
  stylesheet: {
    development: {
      file: './src/porsche-stylesheets.scss',
      outFile: './dist/porsche-stylesheets.origin.css',
      sourceMap: true,
      sourceMapRoot: `file:///${__dirname}/dist/`
    },
    production: {
      file: './src/porsche-stylesheets.scss',
      outFile: './dist/porsche-stylesheets.origin.min.css',
      sourceMap: false,
      outputStyle: 'compressed'
    }
  }
}
