import * as fs from 'fs';
import * as path from 'path';
import { globbySync } from 'globby';

describe('nextjs', () => {
  const buildDirectory = path.resolve(__dirname, '../../../../nextjs/.next');

  beforeAll(() => {
    if (!fs.existsSync(buildDirectory)) {
      throw new Error('Build for NextJs is missing. Make sure to build it first via `yarn build-app`.');
    }
  });

  describe('client build', () => {
    const clientJsFilePaths = globbySync(`${buildDirectory}/static/**/*.js`);

    it.each(clientJsFilePaths.map((filePath) => [filePath.split('.next').pop(), filePath]))(
      'should not contain dsr components in %s',
      (_, jsFilePath) => {
        const fileContent = fs.readFileSync(jsFilePath, 'utf8');

        expect(fileContent).not.toContain('shadowrootmode');
        expect(fileContent).not.toContain('shadowrootdelegatesfocus');
        expect(fileContent).not.toContain('process.browser');
        expect(fileContent).not.toContain('className:"ssr"'); // added className from server build
        expect(fileContent).not.toContain("className:'ssr'"); // added className from server build
      }
    );
  });

  describe('server build', () => {
    const serverJsFilePaths = globbySync(`${buildDirectory}/server/**/*.js`);

    it.each(serverJsFilePaths.map((filePath) => [filePath.split('.next').pop(), filePath]))(
      'should not contain process.browser in %s',
      (_, jsFilePath) => {
        const fileContent = fs.readFileSync(jsFilePath, 'utf8');

        expect(fileContent).not.toContain('process.browser');
      }
    );
  });
});

describe('remix', () => {
  const serverBuildDirectory = path.resolve(__dirname, '../../../../remix/build');
  const clientBuildDirectory = path.resolve(serverBuildDirectory, '../public/build');

  beforeAll(() => {
    if (!fs.existsSync(serverBuildDirectory) || !fs.existsSync(clientBuildDirectory)) {
      throw new Error('Build for Remix is missing. Make sure to build it first via `yarn build-app`.');
    }
  });

  describe('client build', () => {
    const clientJsFilePaths = globbySync(`${clientBuildDirectory}/**/*.js`);

    it.each(clientJsFilePaths.map((filePath) => [filePath.split('/projects/remix').pop(), filePath]))(
      'should not contain dsr components in %s',
      (_, jsFilePath) => {
        const fileContent = fs.readFileSync(jsFilePath, 'utf8');

        expect(fileContent).not.toContain('shadowrootmode');
        expect(fileContent).not.toContain('shadowrootdelegatesfocus');
        expect(fileContent).not.toContain('process.browser');
        expect(fileContent).not.toContain('"ssr"'); // added className from server build
        expect(fileContent).not.toContain("'ssr'"); // added className from server build
      }
    );
  });

  // server build does not bundle dependencies and imports them from node_modules instead
  xdescribe('server build', () => {
    const serverJsFilePaths = globbySync(`${serverBuildDirectory}/**/*.js`);

    it.each(serverJsFilePaths.map((filePath) => [filePath.split('/projects/remix').pop(), filePath]))(
      'should not contain process.browser in %s',
      (_, jsFilePath) => {
        const fileContent = fs.readFileSync(jsFilePath, 'utf8');

        expect(fileContent).not.toContain('process.browser');
      }
    );
  });
});
