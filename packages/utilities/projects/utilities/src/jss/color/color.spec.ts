import * as fromColor from './color';

it.each<keyof typeof fromColor>(Object.keys(fromColor) as (keyof typeof fromColor)[])(
  'should contain correct values for %s',
  (item) => {
    expect(fromColor[item]).toMatchSnapshot();
  }
);
