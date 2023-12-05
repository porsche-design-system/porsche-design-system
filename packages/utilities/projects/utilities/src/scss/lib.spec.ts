import * as fs from 'fs';
import * as globby from 'globby';

const scssFiles = globby.sync('./src/scss/lib/**/*.scss');

it.each(scssFiles)('should contain correct content for auto generated file %s', (file) => {
  expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot();
});
