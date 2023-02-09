import { getHeadlineTagType } from './headline-utils';
import * as hasSpecificSlottedTagUtil from './../../utils/dom/hasSpecificSlottedTag';

describe('getHeadlineTagName()', () => {
  it('should return div if hasSpecificSlottedTag() is true', () => {
    const host = document.createElement('p-headline');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(true);

    expect(getHeadlineTagType(host, 'medium', 'h4')).toBe('div');
  });

  it('should return tag value if hasSpecificSlottedTag() is false and tag is passed', () => {
    const host = document.createElement('p-headline');
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(false);

    expect(getHeadlineTagType(host, 'medium', 'h4')).toBe('h4');
  });

  it('should return h5 if hasSpecificSlottedTag() is false, tag is not passed but valid headline variant is passed', () => {
    const host = document.createElement('p-headline');
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(false);

    expect(getHeadlineTagType(host, 'headline-5', undefined)).toBe('h5');
  });

  it('should return fallback h1 if hasSpecificSlottedTag() is false, tag is not passed and no valid headline variant is passed', () => {
    const host = document.createElement('p-headline');
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(false);

    expect(getHeadlineTagType(host, { base: 'medium' }, undefined)).toBe('h1');
  });
});
