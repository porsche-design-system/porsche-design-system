import * as path from 'path';
import * as fs from 'fs';
import * as sass from 'sass';

const focusMixin = fs.readFileSync(path.resolve('./src/scss/_focus.scss'), 'utf8');

describe('pds-focus()', () => {
  it.each([{}, { color: 'deeppink' }, { color: 'royalblue', offset: '20px' }])(
    'should return correct css for opts: %s',
    (opts) => {
      const result = sass.compileString(`${focusMixin} div {
      @include pds-focus(${opts ? Object.values(opts).join(', ') : ''});
    }`);
      expect(result.css).toMatchSnapshot();
    }
  );
});
