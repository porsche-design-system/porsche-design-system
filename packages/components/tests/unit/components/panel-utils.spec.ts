import { getTitleTag } from '../../../src/components/content/panel/panel-utils';
import { HeadlineTag } from '../../../src/components/basic/typography/headline/headline-utils';

describe('getTitleTag()', () => {
  it.each<[HeadlineTag, HeadlineTag]>([
    [undefined, 'h2'],
    ['h1', 'h1'],
    ['h2', 'h2'],
    ['h3', 'h3'],
    ['h4', 'h4'],
    ['h5', 'h5'],
    ['h6', 'h6'],
  ])('for %s should return %s', (titleTag, result) => {
    expect(getTitleTag(titleTag)).toBe(result);
  });
});
