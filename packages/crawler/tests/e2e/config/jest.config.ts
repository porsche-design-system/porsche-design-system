const defaultWorkers = process.env.CI === 'true' ? 1 : 2;
const maxWorkers = defaultWorkers * 2;

console.log('Running Jest with maxWorkers:', maxWorkers);

export default {
  preset: 'jest-puppeteer',
  rootDir: '..',
  verbose: true,
  testTimeout: 120000,
  testMatch: ['**/specs/**/*.{e2e,vrt,smoke}.ts'],
  // modulePathIgnorePatterns: ['<rootDir>/dist'],
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true, // disable type-checking and compile each file as an isolated module
        diagnostics: false,
        tsconfig: {
          moduleResolution: 'node',
          target: 'es2019',
          lib: ['es2019', 'dom'],
          esModuleInterop: true,
        },
      },
    ],
  },
  maxWorkers: maxWorkers,
  testSequencer: '@signed/jest-alphabetical-sequencer',
};
