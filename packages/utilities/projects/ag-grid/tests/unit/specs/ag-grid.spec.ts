import fs from 'fs';
import path from 'path';

test('should match snapshot in theme light', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../../../dist/theme-pds.css'), 'utf8');
  expect(css).toMatchSnapshot();
});

test('should match snapshot in theme dark', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../../../dist/theme-pds.css'), 'utf8');
  expect(css).toMatchSnapshot();
});
