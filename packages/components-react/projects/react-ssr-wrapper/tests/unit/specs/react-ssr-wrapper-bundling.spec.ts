import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

const buildDirectory = path.resolve(__dirname, '../../../../nextjs/.next');

if (!fs.existsSync(buildDirectory)) {
  throw new Error('Build for NextJs is missing. Make sure to build it first via `yarn build-app`.');
}

describe('client build', () => {
  const clientJsFilePaths = globby.sync(`${buildDirectory}/static/**/*.js`);

  it.each(clientJsFilePaths.map((filePath) => [filePath.split('.next/static').pop(), filePath]))(
    'should not contain dsr components in %s',
    (_, jsFilePath) => {
      const fileContent = fs.readFileSync(jsFilePath, 'utf8');

      expect(fileContent).not.toContain('shadowroot');
      expect(fileContent).not.toContain('shadowrootdelegatesfocus');
      expect(fileContent).not.toContain('process.browser');
      expect(fileContent).not.toContain('"ssr"'); // added className from server build
      expect(fileContent).not.toContain("'ssr'"); // added className from server build
    }
  );
});

describe('server build', () => {
  const serverJsFilePaths = globby.sync(`${buildDirectory}/server/**/*.js`);

  it.each(serverJsFilePaths.map((filePath) => [filePath.split('.next/server').pop(), filePath]))(
    'should not contain process.browser in %s',
    (_, jsFilePath) => {
      const fileContent = fs.readFileSync(jsFilePath, 'utf8');

      expect(fileContent).not.toContain('process.browser');
    }
  );
});
