import type { HTMLElementWithRequiredProp } from './form-utils';
import {
  hasDescription,
  hasHeading,
  hasLabel,
  hasMessage,
  isParentFieldsetWrapperRequired,
  isRequired,
  isRequiredAndParentNotRequired,
} from './form-utils';
import type { FormState } from '../../types';

describe('isRequired', () => {
  it('should return true if required property is true on element', () => {
    const el = document.createElement('input');
    el.required = true;
    expect(isRequired(el)).toBe(true);
  });

  it('should return true if required attribute is empty string on element', () => {
    const el = document.createElement('input');
    el.setAttribute('required', '');
    expect(isRequired(el)).toBe(true);
  });

  it('should return true if required attribute is any string on element', () => {
    const el = document.createElement('input');
    el.setAttribute('required', 'false');
    expect(isRequired(el)).toBe(true);
  });

  it('should return false if required attribute or property is missing on element', () => {
    const el = document.createElement('input');
    expect(isRequired(el)).toBe(false);
  });

  it('should return false if required property is false on element', () => {
    const el = document.createElement('input');
    el.required = false;
    expect(isRequired(el)).toBe(false);
  });
});

describe('hasLabel()', () => {
  const label = 'Some description';
  it.each<[{ label: string; slotted: boolean }, boolean]>([
    [{ label, slotted: false }, true],
    [{ label: '', slotted: true }, true],
    [{ label: '', slotted: false }, false],
    [{ label, slotted: true }, true],
  ])('should be called with parameter %o and return %s', (parameter, result) => {
    const { label, slotted } = parameter;
    const el = document.createElement('div');
    if (slotted) {
      const slot = document.createElement('span');
      slot.slot = 'label';
      el.appendChild(slot);
    }

    expect(hasLabel(el, label)).toBe(result);
  });
});

describe('hasMessage()', () => {
  const message = 'Some message';
  it.each<[{ message: string; slotted: boolean; formState: FormState }, boolean]>([
    [{ message, slotted: false, formState: 'error' }, true],
    [{ message: '', slotted: true, formState: 'error' }, true],
    [{ message: '', slotted: false, formState: 'error' }, false],
    [{ message, slotted: false, formState: 'none' }, false],
    [{ message: '', slotted: true, formState: 'none' }, false],
    [{ message: '', slotted: false, formState: 'none' }, false],
    [{ message, slotted: false, formState: 'success' }, true],
    [{ message: '', slotted: true, formState: 'success' }, true],
    [{ message: '', slotted: false, formState: 'success' }, false],
  ])('should be called with parameter %o and return %s', (parameter, result) => {
    const { message, slotted, formState } = parameter;
    const el = document.createElement('div');
    if (slotted) {
      const slot = document.createElement('span');
      slot.slot = 'message';
      el.appendChild(slot);
    }

    expect(hasMessage(el, message, formState)).toBe(result);
  });
});

describe('hasDescription()', () => {
  const description = 'Some description';
  it.each<[{ description: string; slotted: boolean }, boolean]>([
    [{ description, slotted: false }, true],
    [{ description: '', slotted: true }, true],
    [{ description: '', slotted: false }, false],
    [{ description, slotted: true }, true],
  ])('should be called with parameter %o and return %s', (parameter, result) => {
    const { description, slotted } = parameter;
    const el = document.createElement('div');
    if (slotted) {
      const slot = document.createElement('span');
      slot.slot = 'description';
      el.appendChild(slot);
    }

    expect(hasDescription(el, description)).toBe(result);
  });
});

describe('hasHeading()', () => {
  const heading = 'Some heading';
  it.each<[{ heading: string; slotted: boolean }, boolean]>([
    [{ heading, slotted: false }, true],
    [{ heading: '', slotted: true }, true],
    [{ heading: '', slotted: false }, false],
    [{ heading, slotted: true }, true],
  ])('should be called with parameter %o and return %s', (parameter, result) => {
    const { heading, slotted } = parameter;
    const el = document.createElement('div');
    if (slotted) {
      const slot = document.createElement('span');
      slot.slot = 'heading';
      el.appendChild(slot);
    }

    expect(hasHeading(el, heading)).toBe(result);
  });
});

describe('isParentFieldsetWrapperRequired()', () => {
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
});

describe('isRequiredAndParentNotRequired()', () => {
  const fieldsetWrapper = 'p-fieldset-wrapper';
  it.each<[{ parentTagName: string; parentRequired: boolean; inputRequired: boolean }, boolean]>([
    [{ parentTagName: fieldsetWrapper, parentRequired: true, inputRequired: true }, false],
    [{ parentTagName: fieldsetWrapper, parentRequired: false, inputRequired: true }, true],
    [{ parentTagName: 'div', parentRequired: false, inputRequired: true }, true],
    [{ parentTagName: 'div', parentRequired: false, inputRequired: false }, false],
  ])('should for "%p" return "%s"', ({ parentTagName, parentRequired, inputRequired }, result) => {
    const parent = document.createElement(parentTagName);
    const child = document.createElement('p-textfield-wrapper');
    const input = document.createElement('input');
    parent.appendChild(child);
    child.appendChild(input);

    parent['required'] = parentRequired;
    input.required = inputRequired;

    expect(isRequiredAndParentNotRequired(child, input)).toBe(result);
  });
});
