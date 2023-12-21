import { getHeadlineTagType } from './headline-utils';
import * as hasSpecificDirectChildTagUtil from '../../utils/dom/hasSpecificDirectChildTag';

describe('getHeadlineTagName()', () => {
  it('should return div if hasSpecificDirectChildTag() is true', () => {
    const host = document.createElement('p-headline');
    host.innerHTML = '<h3>Some h3</h3>';
    jest.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(true);

    expect(getHeadlineTagType(host, 'medium', 'h4')).toBe('div');
  });

  it('should return tag value if hasSpecificDirectChildTag() is false and tag is passed', () => {
    const host = document.createElement('p-headline');
    jest.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getHeadlineTagType(host, 'medium', 'h4')).toBe('h4');
  });

  it('should return h5 if hasSpecificDirectChildTag() is false, tag is not passed but valid headline variant is passed', () => {
    const host = document.createElement('p-headline');
    jest.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getHeadlineTagType(host, 'headline-5', undefined)).toBe('h5');
  });

  it('should return fallback h1 if hasSpecificDirectChildTag() is false, tag is not passed and no valid headline variant is passed', () => {
    const host = document.createElement('p-headline');
    jest.spyOn(hasSpecificDirectChildTagUtil, 'hasSpecificDirectChildTag').mockReturnValue(false);

    expect(getHeadlineTagType(host, { base: 'medium' }, undefined)).toBe('h1');
  });
});
