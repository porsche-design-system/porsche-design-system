import { newSpecPage } from '@stencil/core/testing';
import { TextList } from '../../../src/components/content/text-list/text-list/text-list';
import { TextListItem } from '../../../src/components/content/text-list/text-list-item/text-list-item';

describe('Component <p-text-list>', () => {

  it('should build', () => {
    expect(new TextList()).toBeTruthy();
    expect(new TextListItem()).toBeTruthy();
  });

  it('should render correctly in default mode without shadow dom', async () => {
    const page = await newSpecPage({
      components: [TextList, TextListItem],
      html: `<p-text-list><p-text-list-item>Some list item</p-text-list-item></p-text-list>`,
    });
    expect(page.root.shadowRoot).toBeFalsy();
    expect(page.root.querySelector('ul.p-text-list')).toBeTruthy();
    expect(page.root).toMatchSnapshot();
  });

  it('should render as ordered list', async () => {
    const page = await newSpecPage({
      components: [TextList, TextListItem],
      html: `<p-text-list list-type="ordered"><p-text-list-item>Some list item</p-text-list-item></p-text-list>`,
    });
    expect(page.root.querySelector('ol.p-text-list')).toBeTruthy();
  });
});
