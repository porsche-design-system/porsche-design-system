import copy from 'rollup-plugin-copy';

const input = 'src/css';
const outputDir = 'dist';

export default [
  {
    input,
    output: {
      dir: `${outputDir}`,
      format: 'css',
      entryFileNames: '[name].css',
      preserveModules: true,
    },
    plugins: [
      copy({
        targets: [{ src: ['src/css/**/*.css'], dest: outputDir }],
        flatten: true,
      }),
    ],
  },
];
