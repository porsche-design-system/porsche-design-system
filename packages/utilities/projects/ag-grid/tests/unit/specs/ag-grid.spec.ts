import { readFileSync } from 'fs';
import { resolve } from 'path';

test('should match snapshot', () => {
  const css = readFileSync(resolve(__dirname, '../../../dist/theme.css'), 'utf8');
  expect(css).toMatchSnapshot();
});
