import { isParentFieldsetWrapperRequired } from './isParentFieldsetWrapperRequired';
import type { HTMLElementWithRequiredProp } from './isRequired';

// TODO: these tests should verify that isParentOfKind() and isRequired() are called with correct parameters and return their combined result
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
    const child = document.createElement('div');
    parent.appendChild(child);
    parent.required = true;

    expect(isParentFieldsetWrapperRequired(child)).toBe(true);
  });

  it('should return false if parent is not required', () => {
    const parent = document.createElement('prefixed-p-fieldset-wrapper') as HTMLElementWithRequiredProp;
    const child = document.createElement('div');
    parent.appendChild(child);
    parent.required = false;

    expect(isParentFieldsetWrapperRequired(child)).toBe(false);
  });
});
