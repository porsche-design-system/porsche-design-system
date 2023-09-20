import { getInlineSVGBackgroundImage } from './getInlineSVGBackgroundImage';

it.each<Parameters<typeof getInlineSVGBackgroundImage>>([['some svg path'], ['<circle cx="12" cy="12" r="7"/>']])(
  'should return correct value for parameter: %o',
  (path) => {
    expect(getInlineSVGBackgroundImage(path)).toMatchSnapshot();
  }
);
