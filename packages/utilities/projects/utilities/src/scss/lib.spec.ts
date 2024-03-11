import * as fs from 'fs';
import { globbySync } from 'globby';

const scssFiles = globbySync('./src/scss/lib/**/*.scss');

it.each(scssFiles)('should contain correct content for auto generated file %s', (file) => {
  expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot();
});
