import { convertToReact } from '../../src/utils';

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
