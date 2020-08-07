import { newSpecPage } from '@stencil/core/testing';
import { Icon } from '../../../src/components/icon/icon/icon';
import { isUrl } from '../../../src/components/icon/icon/icon-helper';
import { isValid } from '../../../src/components/icon/icon/icon-validation';

describe('Component <p-icon>', () => {

  it('should render correctly in default mode with shadow dom', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: `<p-icon icon="arrow-head-right"></p-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.p-icon')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.p-icon')).toBeTruthy();
  });
});

describe('isUrl', () => {
  it('should return true if url is valid', () => {
    expect(isUrl('https://cdn.ui.porsche.com/some-path/some-icon.svg')).toBe(true);
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
      attributes: [{value: 'onload'}],
      childNodes: []
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be invalid onclick attr', () => {
    const el = {
      nodeType: 1,
      nodeName: 'svg',
      attributes: [{value: 'OnClIcK'}],
      childNodes: []
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be invalid child SCRIPT elm', () => {
    const el = {
      nodeType: 1, nodeName: 'svg', attributes: [], childNodes: [
        {nodeType: 1, nodeName: 'SCRIPT', attributes: [], childNodes: []}
      ]
    } as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be invalid script elm', () => {
    const el = {nodeType: 1, nodeName: 'script', attributes: [], childNodes: []} as any;
    expect(isValid(el)).toBe(false);
  });

  it('should be is valid circle elm', () => {
    const el = {nodeType: 1, nodeName: 'circle', attributes: [], childNodes: []} as any;
    expect(isValid(el)).toBe(true);
  });

  it('should be is valid SVG elm', () => {
    const el = {
      nodeType: 1, nodeName: 'SVG', attributes: [], childNodes: [
        {nodeType: 1, nodeName: 'line', attributes: [], childNodes: []}
      ]
    } as any;
    expect(isValid(el)).toBe(true);
  });

  it('should be is valid text node', () => {
    const el = {nodeType: 3, nodeName: '#text'} as any;
    expect(isValid(el)).toBe(true);
  });
});
