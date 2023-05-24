import { getDisplayTagType } from './display-utils';
import * as hasSpecificSlottedTagUtil from './../../utils/dom/hasSpecificSlottedTag';

describe('getDisplayTagName()', () => {
  it('should return div if hasSpecificSlottedTag() is true', () => {
    const host = document.createElement('p-display');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(true);

    expect(getDisplayTagType(host, 'medium', 'h4')).toBe('div');
  });

  it('should return tag value if hasSpecificSlottedTag() is false and tag is passed', () => {
    const host = document.createElement('p-display');
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(false);

    expect(getDisplayTagType(host, 'medium', 'h4')).toBe('h4');
  });

  it('should return h2 if hasSpecificSlottedTag() is false, tag is not passed but valid display size is passed', () => {
    const host = document.createElement('p-display');
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(false);

    expect(getDisplayTagType(host, 'medium', undefined)).toBe('h2');
  });

  it('should return fallback h1 if hasSpecificSlottedTag() is false, tag is not passed and no valid display size is passed', () => {
    const host = document.createElement('p-display');
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(false);

    expect(getDisplayTagType(host, { base: 'medium' }, undefined)).toBe('h1');
  });
});
