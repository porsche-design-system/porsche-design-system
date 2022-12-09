import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const rootDir = '../..';
const projectDir = 'projects/vue-wrapper';
const outputDir = 'dist/vue-wrapper';

const typescriptOpts = {
  tsconfig: `${projectDir}/tsconfig.json`,
};

const external = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-js/partials',
  '@porsche-design-system/components-js/utilities/js',
];

const buildConfig = (packagePath) => {
  const relativePackagePath = packagePath.split('/').pop();

  return {
    input: `${projectDir}/src/${packagePath}.ts`,
    external,
    output: [
      {
        dir: `${outputDir}/${packagePath}`,
        format: 'esm',
        plugins: [
          generatePackageJson({
            baseContents: {
              main: `${relativePackagePath}.js`,
              module: `${relativePackagePath}.js`,
              types: `${relativePackagePath}.d.ts`,
              sideEffects: false,
            },
          }),
        ],
      },
    ],
    plugins: [
      copy({
        targets: [
          {
            src: `${projectDir}/src/utilities/scss.scss`,
            dest: `${outputDir}/utilities`,
          },
          { src: `${rootDir}/LICENSE`, dest: outputDir },
          { src: `${rootDir}/OSS_NOTICE`, dest: outputDir },
          { src: `${rootDir}/packages/components/CHANGELOG.md`, dest: outputDir },
        ],
      }),
      typescript(typescriptOpts),
    ],
  };
};

export default ['partials', 'utilities/js'].map(buildConfig);
