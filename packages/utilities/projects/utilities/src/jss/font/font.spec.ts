import * as fromFont from './font';

it.each<keyof typeof fromFont>(Object.keys(fromFont) as (keyof typeof fromFont)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromFont[item]).toMatchSnapshot();
  }
);
