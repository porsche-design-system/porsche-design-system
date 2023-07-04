import webpack from 'webpack';

export function runWebpack(config: webpack.Configuration) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
      }

      if (stats && stats.hasErrors()) {
        reject(stats.toJson().errors?.join(`\n`));
      }

      resolve(null);
    });
  });
}
