import { getHTMLElementAndThrowIfUndefined } from './getHTMLElementAndThrowIfUndefined';

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
