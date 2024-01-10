import { getTextTagType } from './text-utils';
import * as hasSpecificDirectChildTagUtil from '../../utils/dom/hasSpecificDirectChildTag';

describe('getTextTagType()', () => {
  it('should return div if hasSpecificDirectChildTag() is true', () => {
    const host = document.createElement('p-text');
    host.innerHTML = '<p>Some h3</p>';
    jest.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(true);

    expect(getTextTagType(host, 'p')).toBe('div');
  });

  it('should return tag value if hasSpecificDirectChildTag() is false and tag is passed', () => {
    const host = document.createElement('p-text');
    jest.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getTextTagType(host, 'p')).toBe('p');
  });
});
