import type { HTMLElementWithRequiredProp } from './dom';
import {
  addEventListener,
  getAttribute,
  getHTMLElementAndThrowIfUndefined,
  getRole,
  getSlotTextContent,
  hasAttribute,
  hasDescription,
  hasHeading,
  hasLabel,
  hasMessage,
  hasNamedSlot,
  isDisabledOrLoading,
  isParentFieldsetWrapperRequired,
  isParentOfKind,
  isRequired,
  isRequiredAndParentNotRequired,
  removeAttribute,
  removeEventListener,
  setAttribute,
  throwIfElementHasAttribute,
  throwIfParentIsNotOfKind,
  throwIfParentIsNotOneOfKind,
  throwIfRootNodeIsNotOfKind,
} from './dom';
import type { FormState } from '../types';

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

describe('hasNamedSlot()', () => {
  it('should return false if element has no slotted child', () => {
    const el = document.createElement('div');
    expect(hasNamedSlot(el, 'title')).toBe(false);
  });

  it('should return false if element has slotted child with wrong name', () => {
    const el = document.createElement('div');
    const slottedChild = document.createElement('span');
    slottedChild.setAttribute('slot', 'label');
    el.appendChild(slottedChild);
    expect(hasNamedSlot(el, 'title')).toBe(false);
  });

  it('should return true if element has slotted child with correct name', () => {
    const el = document.createElement('div');
    const slottedChild = document.createElement('span');
    slottedChild.setAttribute('slot', 'title');
    el.appendChild(slottedChild);
    expect(hasNamedSlot(el, 'title')).toBe(true);
  });
});

describe('getSlotTextContent()', () => {
  it('should return correct text content if element has slotted child with correct label', () => {
    const el = document.createElement('div');
    const slottedChild = document.createElement('span');
    slottedChild.setAttribute('slot', 'label');
    slottedChild.innerHTML = 'Some label with a <a href="https://designsystem.porsche.com">link</a>.';
    el.appendChild(slottedChild);
    expect(getSlotTextContent(el, 'label')).toBe('Some label with a link.');
  });

  it('should return false if element has no slotted child', () => {
    const el = document.createElement('div');
    expect(getSlotTextContent(el, 'label')).toBeUndefined();
  });
});

describe('getHTMLElementAndThrowIfUndefined()', () => {
  const selector = 'someSelector';

  it('should throw error if selector is not found', () => {
    expect(() => getHTMLElementAndThrowIfUndefined(document.body, `.${selector}`)).toThrowErrorMatchingInlineSnapshot(
      `"Child HTMLElement .someSelector is missing."`
    );
  });

  it('should not throw error if HMTLElement is defined', () => {
    const el = document.createElement('div');
    el.classList.add(selector);
    document.body.append(el);

    expect(() => getHTMLElementAndThrowIfUndefined(document.body, `.${selector}`)).not.toThrow();
  });
});

describe('throwIfRootNodeIsNotOfKind()', () => {
  it('should throw error if root node tag does not match', () => {
    const child = document.createElement('p-select-wrapper-dropdown');

    expect(() => throwIfRootNodeIsNotOfKind(child, 'pSelectWrapper')).toThrow();
  });

  it('should not throw error if root node tag matches', () => {
    const parent = document.createElement('p-select-wrapper');
    const child = document.createElement('p-select-wrapper-dropdown');
    parent.attachShadow({ mode: 'open' });
    parent.shadowRoot.appendChild(child);

    expect(() => throwIfRootNodeIsNotOfKind(child, 'pSelectWrapper')).not.toThrow();
  });

  it('should not throw error if prefixed root node tag matches', () => {
    const parent = document.createElement('my-prefix-p-select-wrapper');
    const child = document.createElement('my-prefix-p-select-wrapper-dropdown');
    parent.attachShadow({ mode: 'open' });
    parent.shadowRoot.appendChild(child);

    expect(() => throwIfRootNodeIsNotOfKind(child, 'pSelectWrapper')).not.toThrow();
  });
});

describe('isParentOfKind()', () => {
  it('should return true if parent tag matches', () => {
    const parent = document.createElement('p-grid');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    expect(isParentOfKind(child, 'pGrid')).toBe(true);
  });

  it('should return false if parent tag does not match', () => {
    const parent = document.createElement('div');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    expect(isParentOfKind(child, 'pGrid')).toBe(false);
  });
});

describe('throwIfParentIsNotOfKind()', () => {
  it('should throw error if parent tag does not match', () => {
    const parent = document.createElement('div');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    expect(() => throwIfParentIsNotOfKind(child, 'pGrid')).toThrow();
  });

  it('should not throw error if parent tag matches', () => {
    const parent = document.createElement('p-grid');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    expect(() => throwIfParentIsNotOfKind(child, 'pGrid')).not.toThrow();
  });

  it('should not throw error if prefixed parent tag matches', () => {
    const parent = document.createElement('my-prefix-p-grid');
    const child = document.createElement('my-prefix-p-grid-item');
    parent.appendChild(child);

    expect(() => throwIfParentIsNotOfKind(child, 'pGrid')).not.toThrow();
  });
});

describe('throwIfParentIsNotOneOfKind()', () => {
  it('should throw error if parent tag does not match', () => {
    const parent = document.createElement('div');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    expect(() => throwIfParentIsNotOneOfKind(child, ['pGrid'])).toThrow();
  });

  it('should not throw error if parent tag matches 1st element', () => {
    const parent = document.createElement('p-grid');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    expect(() => throwIfParentIsNotOneOfKind(child, ['pGrid', 'pFlex'])).not.toThrow();
  });

  it('should not throw error if parent tag matches 2nd element', () => {
    const parent = document.createElement('p-grid');
    const child = document.createElement('p-grid-item');
    parent.appendChild(child);

    expect(() => throwIfParentIsNotOneOfKind(child, ['pFlex', 'pGrid'])).not.toThrow();
  });
});

describe('throwIfElementHasAttribute()', () => {
  it('should throw error if attribute exists', () => {
    const element = document.createElement('div');
    element.setAttribute('title', 'some title');

    expect(() => throwIfElementHasAttribute(element, 'title')).toThrow();
  });

  it('should not throw error if attribute does not exist', () => {
    const element = document.createElement('div');

    expect(() => throwIfElementHasAttribute(element, 'title')).not.toThrow();
  });
});

describe('Event Listener', () => {
  const listener = () => {};

  describe('addEventListener()', () => {
    it('should call addEventListener', () => {
      const element = document.createElement('div');
      const spy1 = jest.spyOn(element, 'addEventListener');

      addEventListener(element, 'change', listener, false);

      expect(spy1).toBeCalledWith('change', listener, false);
    });
  });

  describe('removeEventListener', () => {
    it('should call removeEventListener', () => {
      const element = document.createElement('div');
      const spy1 = jest.spyOn(element, 'removeEventListener');

      addEventListener(element, 'change', listener, false);
      removeEventListener(element, 'change', listener, false);

      expect(spy1).toBeCalledWith('change', listener, false);
    });
  });
});

describe('getAttribute()', () => {
  it('should return attribute value', () => {
    const element = document.createElement('div');
    const title = 'Some title';
    element.setAttribute('title', title);

    expect(getAttribute(element, 'title')).toBe(title);
  });
});

describe('setAttribute()', () => {
  it('should set attribute value', () => {
    const element = document.createElement('div');
    const title = 'Some title';
    setAttribute(element, 'title', title);

    expect(element.getAttribute('title')).toBe(title);
  });
});

describe('removeAttribute()', () => {
  it('should remove attribute', () => {
    const element = document.createElement('div');
    element.setAttribute('title', 'Some title');

    removeAttribute(element, 'title');
    expect(element.getAttribute('title')).toBe(null);
  });
});

describe('hasAttribute()', () => {
  it('should return true if attribute exists', () => {
    const element = document.createElement('div');
    element.setAttribute('title', 'Some title');
    expect(hasAttribute(element, 'title')).toBe(true);
  });

  it('should return false if attribute does not exist', () => {
    const element = document.createElement('div');
    expect(hasAttribute(element, 'title')).toBe(false);
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

describe('isDisabledOrLoading()', () => {
  it.each<[boolean, boolean, boolean]>([
    [true, true, true],
    [true, false, true],
    [false, true, true],
    [false, false, false],
  ])('should for disabled: "%s" and loading: "%s" return "%s"', (disabled, loading, result) => {
    expect(isDisabledOrLoading(disabled, loading)).toBe(result);
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

describe('getRole()', () => {
  it('should return "alert" if state is error', () => {
    expect(getRole('error')).toBe('alert');
  });

  it('should return "status" if state is success', () => {
    expect(getRole('success')).toBe('status');
  });

  it('should return null if state is none', () => {
    expect(getRole('none')).toBeNull();
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
