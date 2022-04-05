import {
  getHTMLElementAndThrowIfUndefined,
  isDisabledOrLoading,
  isParentOfKind,
  throwIfElementHasAttribute,
  throwIfParentIsNotOfKind,
  throwIfParentIsNotOneOfKind,
  throwIfRootNodeIsNotOfKind,
} from './dom-validation';

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
