import { cleanMarkup, convertToAngular, convertToReact } from '../../src/utils';

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

describe('convertToAngular', () => {
  it('should convert markup to Angular syntax', async () => {
    const markup = `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" digit-attribute="6" boolean-attribute="true">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`;

    expect(convertToAngular(markup)).toBe(
      `<p-some-tag [someAttribute]="'some value'" [attribute]="'some value'" class="some-class" [anotherAttribute]="{ bar: 'foo' }" (click)="alert('click'); return false;" [digitAttribute]="6" [booleanAttribute]="true">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });
});

describe('convertToReact', () => {
  it('should convert markup to React syntax', async () => {
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
});
