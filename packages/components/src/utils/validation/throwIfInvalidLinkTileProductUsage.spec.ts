import { throwIfInvalidLinkTileProductUsage } from './throwIfInvalidLinkTileProductUsage';

const errorMessage =
  '"[Porsche Design System] usage of div is not valid. Please provide a href property or a single and direct <a> child element."';

const errorMessageA11y =
  '"[Porsche Design System] usage of div is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility."';

describe('with href value', () => {
  const href = '#';
  it('should not throw error', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });
});

describe('without href value', () => {
  const href = undefined;

  it('should throw error without any child', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should throw error with nested anchor', () => {
    const host = document.createElement('div');
    const child = document.createElement('p');
    child.append(document.createElement('a'));
    host.append(child);

    // TODO: workaround until jsdom actually returns null for this case
    // https://github.com/jsdom/jsdom/issues/2998
    jest.spyOn(host, 'querySelector').mockReturnValue(null);

    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should throw error with direct and only anchor with missing label', () => {
    const host = document.createElement('div');
    host.append(document.createElement('a'));
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessageA11y);
  });

  it('should not throw error with direct and only anchor and label', () => {
    const host = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.textContent = 'Some label';
    host.append(anchor);
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });
});
