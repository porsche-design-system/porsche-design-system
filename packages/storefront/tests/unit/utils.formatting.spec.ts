import {
  cleanBooleanValues,
  cleanClassAndSlotAttributes,
  cleanMarkup,
  convertToAngular,
  convertToReact,
  escapeHtml,
  patchThemeIntoMarkup,
  transformAttributesWithDigitValue,
  transformAttributesWithNotDigitValue,
  transformAttributesWithObjectValues,
  transformEvents,
} from '../../src/utils';

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

describe('convertToReact()', () => {
  it('should convert markup to React syntax', () => {
    const markup = `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" digit-attribute="6" boolean-attribute="true">
  <span>some text</span>
</p-some-tag>`;

    expect(convertToReact(markup)).toBe(
      `<PSomeTag someAttribute="some value" attribute="some value" className="some-class" anotherAttribute={{ bar: 'foo' }} onClick={() => { alert('click'); return false; }} digitAttribute={6} booleanAttribute={true}>
  <span>some text</span>
</PSomeTag>`
    );
  });

  it('should add closing slash on input tags', () => {
    const markup = '<input type="checkbox">';
    expect(convertToReact(markup)).toBe('<input type="checkbox" />');
  });

  it('should transform to self closing tags', () => {
    expect(convertToReact('<button type="button"></button>')).toBe('<button type="button" />');
    expect(convertToReact('<PButton type="button"></PButton>')).toBe('<PButton type="button" />');
  });

  describe('inline styles', () => {
    it('should quote values', () => {
      const markup = '<div style="display: block"></div>';
      expect(convertToReact(markup)).toBe("<div style={{ display: 'block' }} />");
    });
    it('should transform properties to camelCase', () => {
      const markup = '<div style="text-align: center"></div>';
      expect(convertToReact(markup)).toBe("<div style={{ textAlign: 'center' }} />");
    });
    it('should handle multiple styles', () => {
      const markup = '<div style="text-align: center; font-size: 16px"></div>';
      expect(convertToReact(markup)).toBe("<div style={{ textAlign: 'center', fontSize: '16px' }} />");
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
