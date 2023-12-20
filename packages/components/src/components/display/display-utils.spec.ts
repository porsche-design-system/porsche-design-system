import { getDisplayTagType } from './display-utils';
import * as hasSpecificTagUtil from '../../utils/dom/hasSpecificDirectChildTag';

describe('getDisplayTagName()', () => {
  it('should return div if hasSpecificDirectChildTag() is true', () => {
    const host = document.createElement('p-display');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(true);

    expect(getDisplayTagType(host, 'medium', 'h4')).toBe('div');
  });

  it('should return tag value if hasSpecificDirectChildTag() is false and tag is passed', () => {
    const host = document.createElement('p-display');
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getDisplayTagType(host, 'medium', 'h4')).toBe('h4');
  });

  it('should return h2 if hasSpecificDirectChildTag() is false, tag is not passed but valid display size is passed', () => {
    const host = document.createElement('p-display');
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getDisplayTagType(host, 'medium', undefined)).toBe('h2');
  });

  it('should return fallback h1 if hasSpecificDirectChildTag() is false, tag is not passed and no valid display size is passed', () => {
    const host = document.createElement('p-display');
    jest.spyOn(hasSpecificTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getDisplayTagType(host, { base: 'medium' }, undefined)).toBe('h1');
  });
});
