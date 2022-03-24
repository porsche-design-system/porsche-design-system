import typescript from '@rollup/plugin-typescript';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const projectDir = 'projects/components-wrapper';
const outputDir = 'dist/components-wrapper';

const typescriptOpts = {
  tsconfig: `${projectDir}/tsconfig.json`,
};

const external = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-js/partials',
  '@porsche-design-system/components-js/utilities/jss',
];

// 1 input, 2 output formats
// typings are generated via separate tsc command since @rollup/plugin-typescript can't handle it properly
const buildConfig = (packagePath) => {
  const relativePackagePath = packagePath.split('/').pop();

  return {
    input: `${projectDir}/src/${packagePath}.ts`,
    external,
    output: [
      {
        dir: `${outputDir}/${packagePath}`,
        format: 'cjs',
        plugins: [
          generatePackageJson({
            baseContents: {
              main: `${relativePackagePath}.js`,
              module: `esm/${relativePackagePath}.js`,
              types: `${relativePackagePath}.d.ts`,
              sideEffects: false,
            },
          }),
        ],
      },
      {
        dir: `${outputDir}/${packagePath}/esm`,
        format: 'esm',
      },
    ],
    plugins: [typescript(typescriptOpts)],
  };
};

export default ['partials', 'utilities/jss'].map(buildConfig);
