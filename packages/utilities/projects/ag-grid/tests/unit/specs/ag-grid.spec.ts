import fs from 'fs';
import path from 'path';

test('should match snapshot', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../../../dist/theme.css'), 'utf8');
  expect(css).toMatchSnapshot();
});
