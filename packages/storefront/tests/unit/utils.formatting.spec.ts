import { cleanMarkup, convertToAngular, convertToReact, escapeHtml, patchThemeIntoMarkup } from '../../src/utils';

describe('cleanMarkup', () => {
  it('should replace multiple br tags with new line', () => {
    const markup = `<div></div><br><div></div><br><div></div>`;
    expect(cleanMarkup(markup)).toBe(`<div></div>
<div></div>
<div></div>`);
  });

  it('should replace multiple new lines', () => {
    const markup = `<div></div><br><br><div></div><br><br><br><div></div>`;
    expect(cleanMarkup(markup)).toBe(`<div></div>

<div></div>

<div></div>`);
  });
});

describe('patchThemeIntoMarkup', () => {
  it('should not add light theme', () => {
    const markup = `<p-some-tag some-attribute="some value"></p-some-tag>`;
    expect(patchThemeIntoMarkup(markup, 'light')).toBe(markup);
  });

  it('should add dark theme', () => {
    const markup = `<p-some-tag some-attribute="some value"></p-some-tag>`;
    expect(patchThemeIntoMarkup(markup, 'dark')).toBe(
      `<p-some-tag theme="dark" some-attribute="some value"></p-some-tag>`
    );
  });
});

describe('convertToAngular', () => {
  it('should convert markup to Angular syntax', () => {
    const markup = `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" digit-attribute="6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`;

    expect(convertToAngular(markup)).toBe(
      `<p-some-tag [someAttribute]="'some value'" [attribute]="'some value'" class="some-class" [anotherAttribute]="{ bar: 'foo' }" (click)="alert('click'); return false;" [digitAttribute]="6" [booleanAttribute]="true" aria-label="something label" aria-something="Something foo" [name]="'1'">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });
});

describe('convertToReact', () => {
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
    const markup = `<input type="checkbox">`;
    expect(convertToReact(markup)).toBe(`<input type="checkbox" />`);
  });

  describe('inline styles', () => {
    it('should quote values', () => {
      const markup = `<div style="display: block"></div>`;
      expect(convertToReact(markup)).toBe(`<div style={{ display: 'block' }}></div>`);
    });
    it('should transform properties to camelCase', () => {
      const markup = `<div style="text-align: center"></div>`;
      expect(convertToReact(markup)).toBe(`<div style={{ textAlign: 'center' }}></div>`);
    });
    it('should handle multiple styles', () => {
      const markup = `<div style="text-align: center; font-size: 16px"></div>`;
      expect(convertToReact(markup)).toBe(`<div style={{ textAlign: 'center', fontSize: '16px' }}></div>`);
    });
  });
});

describe('escapeHtml', () => {
  it('should replace special characters', () => {
    const markup = `<a href="https://porsche.com?param1=x&param2=y" target='_blank'>Link</a>`;
    expect(escapeHtml(markup)).toBe(
      '&lt;a href=&quot;https://porsche.com?param1=x&amp;param2=y&quot; target=&#039;_blank&#039;&gt;Link&lt;/a&gt;'
    );
  });
});
