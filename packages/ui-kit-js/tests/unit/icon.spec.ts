import { newSpecPage } from '@stencil/core/testing';
import { Icon } from '../../src/components/icon/icon/icon';
import { getName, isUrl } from '../../src/components/icon/icon/icon-helper';
import { isValid } from '../../src/components/icon/icon/icon-validation';

describe('Component <p-icon>', () => {

  it('should build', () => {
    expect(new Icon()).toBeTruthy();
  });

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<p-icon source="arrow-right-hair"></p-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-icon')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-icon')).toBeTruthy();
    expect(page.root).toEqualAttribute('aria-label', 'icon arrow right hair');
    expect(page.root).toMatchSnapshot();
  });

  it('should render custom aria-label attribute', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<p-icon aria-label="some ally label"></p-icon>`,
    });
    expect(page.root).toEqualAttribute('aria-label', 'some ally label');
  });
});

describe('getName', () => {
  let i: Icon;

  beforeEach(() => {
    i = new Icon();
  });

  it('should return lowercase dashed svg file name without extension', () => {

    i.source = 'https://cdn.ui.porsche.com/porsche-ui-kit/icon/v1/some_icon.svg';
    expect(getName(i.source)).toBe('some-icon');

    i.source = 'https://cdn.ui.porsche.com/porsche-ui-kit/icon/v1/Some_Icon.svg';
    expect(getName(i.source)).toBe('some-icon');

    i.source = 'https://cdn.ui.porsche.com/porsche-ui-kit/icon/v1/Some-Icon.svg';
    expect(getName(i.source)).toBe('some-icon');

    i.source = 'https://cdn.ui.porsche.com/porsche-ui-kit/icon/v1/Some-Icon.min.svg';
    expect(getName(i.source)).toBe('some-icon');

    i.source = 'https://cdn.ui.porsche.com/porsche-ui-kit/icon/v1/Some Icon.svg';
    expect(getName(i.source)).toBe(null);

    i.source = '';
    expect(getName(i.source)).toBe(null);
  });
});

describe('isUrl', () => {
  it('should return true if url is valid', () => {
    expect(isUrl('https://cdn.ui.porsche.com/porsche-ui-kit/icon/v1/some_icon.svg')).toBe(true);
    expect(isUrl('./assets/some_icon.svg')).toBe(true);
    expect(isUrl('/some_icon.svg')).toBe(true);
  });

  it('should return false if url is invalid', () => {
    expect(isUrl('some_icon.svg')).toBe(false);
  });
});

describe('isValid', () => {
  it('should be invalid onload attr', () => {
    const el = {
      nodeType: 1,
      nodeName: 'svg',
      attributes: [{ value: 'onload' }],
      childNodes: []
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be invalid onclick attr', () => {
    const el = {
      nodeType: 1,
      nodeName: 'svg',
      attributes: [{ value: 'OnClIcK' }],
      childNodes: []
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be invalid child SCRIPT elm', () => {
    const el = { nodeType: 1, nodeName: 'svg', attributes: [], childNodes: [
        { nodeType: 1, nodeName: 'SCRIPT', attributes: [], childNodes: [] }
      ] } as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be invalid script elm', () => {
    const el = { nodeType: 1, nodeName: 'script', attributes: [], childNodes: [] } as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be is valid circle elm', () => {
    const el = { nodeType: 1, nodeName: 'circle', attributes: [], childNodes: [] } as any;
    expect(isValid(el)).toBe(true);
  });

  it('should be is valid SVG elm', () => {
    const el = { nodeType: 1, nodeName: 'SVG', attributes: [], childNodes: [
        { nodeType: 1, nodeName: 'line', attributes: [], childNodes: [] }
      ] } as any;
    expect(isValid(el)).toBe(true);
  });

  it('should be is valid text node', () => {
    const el = { nodeType: 3, nodeName: '#text' } as any;
    expect(isValid(el)).toBe(true);
  });
});
