import { vi } from 'vitest';
import * as hasSpecificDirectChildTagUtil from '../../utils/dom/hasSpecificDirectChildTag';
import { getTextTagType } from './text-utils';

describe('getTextTagType()', () => {
  it('should return div if hasSpecificDirectChildTag() is true', () => {
    const host = document.createElement('p-text');
    host.innerHTML = '<p>Some h3</p>';
    vi.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(true);

    expect(getTextTagType(host, 'p')).toBe('div');
  });

  it('should return tag value if hasSpecificDirectChildTag() is false and tag is passed', () => {
    const host = document.createElement('p-text');
    vi.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getTextTagType(host, 'p')).toBe('p');
  });
});
