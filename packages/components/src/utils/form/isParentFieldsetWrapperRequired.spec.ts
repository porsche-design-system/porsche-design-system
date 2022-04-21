import { isParentFieldsetWrapperRequired } from './isParentFieldsetWrapperRequired';
import type { HTMLElementWithRequiredProp } from './isRequired';

describe('without prefix', () => {
  it('should return true if parent is required', () => {
    const parent = document.createElement('p-fieldset-wrapper');
    const child = document.createElement('div');
    parent.appendChild(child);
    parent['required'] = true;

    expect(isParentFieldsetWrapperRequired(child)).toBe(true);
  });

  it('should return false if parent is not required', () => {
    const parent = document.createElement('p-fieldset-wrapper');
    const child = document.createElement('div');
    parent.appendChild(child);

    expect(isParentFieldsetWrapperRequired(child)).toBe(false);
  });

  it('should return false if parent is not p-fieldset-wrapper', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);

    expect(isParentFieldsetWrapperRequired(child)).toBe(false);
  });
});

describe('with prefix', () => {
  it('should return true if parent is required', () => {
    const parent = document.createElement('prefixed-p-fieldset-wrapper') as HTMLElementWithRequiredProp;
    const child = document.createElement('prefixed-p-checkbox-wrapper');
    parent.appendChild(child);
    parent.required = true;

    expect(isParentFieldsetWrapperRequired(child)).toBe(true);
  });

  it('should return false if parent has a different prefix', () => {
    const parent = document.createElement('another-prefix-p-fieldset-wrapper') as HTMLElementWithRequiredProp;
    const child = document.createElement('prefixed-p-checkbox-wrapper');
    parent.appendChild(child);
    parent.required = true;

    expect(isParentFieldsetWrapperRequired(child)).toBe(false);
  });
});
