import * as fromFont from './font';

it.each<keyof typeof fromFont>(['fontFamily', 'fontWeight', 'fontSize', 'font'])(
  'should contain correct values for %s',
  (item) => {
    expect(fromFont[item]).toMatchSnapshot();
  }
);
