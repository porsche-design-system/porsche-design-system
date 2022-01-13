import { cleanMarkup, escapeHtml, patchThemeIntoMarkup } from '../../src/utils';

describe('cleanMarkup()', () => {
  it('should replace multiple br tags with new line', () => {
    const markup = '<div></div><br><div></div><br><div></div>';
    expect(cleanMarkup(markup)).toBe(`<div></div>
<div></div>
<div></div>`);
  });

  it('should replace multiple new lines', () => {
    const markup = '<div></div><br><br><div></div><br><br><br><div></div>';
    expect(cleanMarkup(markup)).toBe(`<div></div>

<div></div>

<div></div>`);
  });
});

describe('patchThemeIntoMarkup()', () => {
  it('should not add light theme to any tag', () => {
    const markup1 = '<p-some-tag some-attribute="some value"></p-some-tag>';
    expect(patchThemeIntoMarkup(markup1, 'light')).toBe(markup1);

    const markup2 = '<p-button some-attribute="some value"></p-button>';
    expect(patchThemeIntoMarkup(markup2, 'light')).toBe(markup2);
  });

  it('should not add light theme to unknown tag', () => {
    const markup = '<p-some-tag some-attribute="some value"></p-some-tag>';
    expect(patchThemeIntoMarkup(markup, 'light')).toBe(markup);
  });

  it('should add dark theme to themeable tag', () => {
    const markup = '<p-button some-attribute="some value"></p-button>';
    expect(patchThemeIntoMarkup(markup, 'dark')).toBe('<p-button theme="dark" some-attribute="some value"></p-button>');
  });

  it('should not add dark theme to unknown tag', () => {
    const markup = '<p-some-tag some-attribute="some value"></p-some-tag>';
    expect(patchThemeIntoMarkup(markup, 'dark')).toBe(markup);
  });

  describe('in React', () => {
    it('should not add light theme', () => {
      const markup = '<PButton some-attribute="some value"></PButton>';
      expect(patchThemeIntoMarkup(markup, 'light')).toBe(markup);
    });

    it('should not add light theme to unknown tag', () => {
      const markup = '<PSomeTag some-attribute="some value"></PSomeTag>';
      expect(patchThemeIntoMarkup(markup, 'light')).toBe(markup);
    });

    it('should not add dark theme to unknown tag', () => {
      const markup = '<PSomeTag some-attribute="some value"></PSomeTag>';
      expect(patchThemeIntoMarkup(markup, 'dark')).toBe(markup);
    });

    it('should add dark theme', () => {
      const markup = '<PButton some-attribute="some value"></PButton>';
      expect(patchThemeIntoMarkup(markup, 'dark')).toBe('<PButton theme="dark" some-attribute="some value"></PButton>');
    });
  });
});

describe('escapeHtml()', () => {
  it('should replace special characters', () => {
    const markup = '<a href="https://porsche.com?param1=x&param2=y" target="_blank">Link</a>';
    expect(escapeHtml(markup)).toBe(
      '&lt;a href=&quot;https://porsche.com?param1=x&amp;param2=y&quot; target=&quot;_blank&quot;&gt;Link&lt;/a&gt;'
    );
  });
});
