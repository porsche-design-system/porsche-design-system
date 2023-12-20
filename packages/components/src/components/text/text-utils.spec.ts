import { getTextTagType } from './text-utils';
import * as hasSpecificTagUtil from '../../utils/dom/hasSpecificDirectChildTag';

describe('getTextTagType()', () => {
  it('should return div if hasSpecificDirectChildTag() is true', () => {
    const host = document.createElement('p-text');
    host.innerHTML = '<p>Some h3</p>';
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(true);

    expect(getTextTagType(host, 'p')).toBe('div');
  });

  it('should return tag value if hasSpecificDirectChildTag() is false and tag is passed', () => {
    const host = document.createElement('p-text');
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getTextTagType(host, 'p')).toBe('p');
  });
});
