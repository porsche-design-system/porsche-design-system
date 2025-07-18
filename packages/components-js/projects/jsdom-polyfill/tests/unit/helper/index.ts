import type { TagName } from '@porsche-design-system/shared';

export const WHITELISTED_TAG_NAMES = [
  'p-canvas',
  'p-flex-item',
  'p-drilldown',
  'p-drilldown-item',
  'p-drilldown-link',
  'p-grid-item',
  'p-multi-select-option',
  'p-optgroup',
  'p-select-option',
  'p-stepper-horizontal-item',
  'p-tabs-item',
  'p-segmented-control-item',
  'p-text-list-item',
  'p-table-head',
  'p-table-body',
  'p-table-head-row',
  'p-table-row',
  'p-table-head-cell',
  'p-table-cell',
] as const;
type TagNameWhitelisted = (typeof WHITELISTED_TAG_NAMES)[number];

type TagNameRelevant = Exclude<
  TagName,
  | 'p-select-wrapper-dropdown' // from INTERNAL_TAG_NAMES
  | 'p-toast-item' // from INTERNAL_TAG_NAMES
  | TagNameWhitelisted
>;

export const tagNameMarkup: Record<TagNameRelevant, string> = {
  'p-accordion': `<p-accordion>
  <span slot="heading">Some Slotted Heading</span>
  <p>Some Text</p>
</p-accordion>`,
  'p-sheet': `<p-sheet open="true"><h2 slot="header">Some Heading</h2></p-sheet>`,
  'p-banner': `<p-banner heading="Some heading">
    <span slot="description">Some banner description.</span>
  </p-banner>`,
  'p-button': '<p-button>Some label</p-button>',
  'p-button-group': '<p-button-group></p-button-group>',
  'p-button-pure': '<p-button-pure>Some label</p-button-pure>',
  'p-button-tile': `<p-button-tile label="Some label" description="Some description" aspectRatio="4:3">
    <img src="">
   </p-button-tile>`,
  'p-carousel': `<p-carousel heading="Some heading">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </p-carousel>`,
  'p-checkbox': `<p-checkbox label="Some label"></p-checkbox>`,
  'p-checkbox-wrapper': `<p-checkbox-wrapper label="Some label">
    <input type="checkbox" />
</p-checkbox-wrapper>`,
  'p-content-wrapper': '<p-content-wrapper></p-content-wrapper>',
  'p-crest': '<p-crest></p-crest>',
  'p-display': '<p-display>Some text</p-display>',
  'p-divider': '<p-divider></p-divider>',
  'p-fieldset': '<p-fieldset></p-fieldset>',
  'p-fieldset-wrapper': '<p-fieldset-wrapper></p-fieldset-wrapper>',
  'p-flex': `<p-flex>
    <p-flex-item></p-flex-item>
    <p-flex-item></p-flex-item>
  </p-flex>`,
  'p-flyout': `
    <p-flyout></p-flyout>
  `,
  // 'p-drilldown': `<p-drilldown>
  //   <p-drilldown-item identifier="identifier-1" label="Label 1">
  //     <p-drilldown-link href="#some-anchor-1">Some anchor</p-drilldown-link>
  //   </p-drilldown-item>
  //   <p-drilldown-item identifier="identifier-2" label="Label 2">
  //     <p-drilldown-link href="#some-anchor-2">Some anchor</p-drilldown-link>
  //   </p-drilldown-item>
  //   <p-drilldown-item identifier="identifier-3" label="Label 3">
  //     <p-drilldown-link href="#some-anchor-3">Some anchor</p-drilldown-link>
  //   </p-drilldown-item>
  // </p-drilldown>`,
  'p-grid': `<p-grid>
    <p-grid-item size="6"></p-grid-item>
    <p-grid-item size="6"></p-grid-item>
  </p-grid>`,
  'p-heading': '<p-heading>Some text</p-heading>',
  'p-headline': '<p-headline>Some text</p-headline>',
  'p-icon': '<p-icon></p-icon>',
  'p-inline-notification': `<p-inline-notification heading="Some banner title" action-label="Retry">
    Some banner description.
  </p-inline-notification>`,
  'p-input-number': `<p-input-number name="some-name" label="Some label"></p-input-number>`,
  'p-input-text': `<p-input-text name="some-name" label="Some label"></p-input-text>`,
  'p-input-password': `<p-input-password name="some-name" label="Some label"></p-input-password>`,
  'p-input-search': `<p-input-search name="some-name" label="Some label"></p-input-search>`,
  'p-link': `<p-link href="#">Some label</p-link>`,
  'p-link-pure': `<p-link-pure href="#">Some label</p-link-pure>`,
  'p-link-social': `<p-link-social href="#" icon="logo-facebook">Some label</p-link-social>`,
  'p-link-tile': `<p-link-tile href="#" label="Some label" description="Some description" aspectRatio="4:3">
    <img src="">
  </p-link-tile>`,
  'p-link-tile-model-signature': `<p-link-tile-model-signature heading="Some label" description="Some description" aspectRatio="4:3">
    <img src="">
    <p-link slot="primary" href="#">Some link</p-link>
    <p-link slot="secondary" href="#">Some link</p-link>
  </p-link-tile-model-signature>`,
  'p-link-tile-product': `<p-link-tile-product
          heading="Some product"
          price="Some price"
          href="https://porsche.com"
        >
    <img src="" />
  </p-link-tile-product>`,
  'p-marque': '<p-marque></p-marque>',
  'p-modal': `<p-modal open="true"><h2 slot="header">Some Heading</h2></p-modal>`,
  'p-model-signature': '<p-model-signature></p-model-signature>',
  'p-multi-select': `<p-multi-select name="name">
    <p-multi-select-option value="a">Option A</p-multi-select-option>
    <p-multi-select-option value="b">Option B</p-multi-select-option>
    <p-multi-select-option value="c">Option C</p-multi-select-option>
  </p-multi-select>`,
  'p-pagination': `<p-pagination total-items-count="500" items-per-page="25" active-page="1"></p-pagination>`,
  'p-pin-code': `<p-pin-code label="Some label"></p-pin-code>`,
  'p-popover': '<p-popover>Some Popover Content</p-popover>',
  'p-radio-button-wrapper': `<p-radio-button-wrapper label="Some label">
  <input type="radio" />
</p-radio-button-wrapper>`,
  'p-scroller': `<p-scroller>
    <button>Some Button</button>
    <button>Some Button</button>
  </p-scroller>`,
  'p-segmented-control': `<p-segmented-control value="1">
    <p-segmented-control-item value="1">Item 1</p-segmented-control-item>
    <p-segmented-control-item value="2">Item 2</p-segmented-control-item>
  </p-segmented-control>`,
  'p-select': `<p-select name="name">
    <p-select-option value="a">Option A</p-select-option>
    <p-select-option value="b">Option B</p-select-option>
    <p-select-option value="c">Option C</p-select-option>
  </p-select>`,
  'p-select-wrapper': `<p-select-wrapper label="Some label" >
    <select >
      <option value="a">Option A</option>
      <option value="b">Option B</option>
      <option value="c">Option C</option>
    </select>
  </p-select-wrapper>`,
  'p-spinner': '<p-spinner></p-spinner>',
  'p-stepper-horizontal': `<p-stepper-horizontal>
    <p-stepper-horizontal-item state="complete">Step 1</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="complete">Step 2</p-stepper-horizontal-item>
    <p-stepper-horizontal-item state="current">Step 3</p-stepper-horizontal-item>
  </p-stepper-horizontal>`,
  'p-switch': '<p-switch></p-switch>',
  'p-table': `<p-table caption="Some caption">
    <p-table-head>
      <p-table-head-row>
        <p-table-head-cell>Col 1</p-table-headCell>
      </p-table-head-row>
    </p-table-head>
    <p-table-body>
      <p-table-row>
        <p-table-cell>Cell 1</p-table-cell>
      </p-table-row>
    </p-table-body>
  </p-table>`,
  'p-tabs': `<p-tabs activeTabIndex="0">
    <p-tabs-item label="Some label">Content 1</p-tabs-item>
    <p-tabs-item label="Some label">Content 2</p-tabs-item>
    <p-tabs-item label="Some label">Content 3</p-tabs-item>
  </p-tabs>
  <button id="button1" type="button">Button 1</button>
  <button id="button2" type="button">Button 2</button>`,
  'p-tabs-bar': `<p-tabs-bar activeTabIndex="2">
    <button id="button1">Some label</button>
    <button id="button2">Some label</button>
    <button id="button3">Some label</button>
  </p-tabs-bar>`,
  'p-tag': '<p-tag>Some label</p-tag>',
  'p-tag-dismissible': '<p-tag-dismissible>Some label</p-tag-dismissible>',
  'p-text': '<p-text>Some text</p-text>',
  'p-text-field-wrapper': `<p-text-field-wrapper label="Some label">
    <input type="text" />
  </p-text-field-wrapper>`,
  'p-text-list': `<p-text-list>
    <p-text-list-item>Some text</p-text-list-item>
  </p-text-list>`,
  'p-textarea': `<p-textarea name="some-name" label="Some label"></p-textarea>`,
  'p-textarea-wrapper': `<p-textarea-wrapper label="Some label">
    <textarea />
  </p-textarea-wrapper>`,
  'p-toast': '<p-toast></p-toast>',
  'p-wordmark': '<p-wordmark></p-wordmark>',
};

export const getMarkup = (tagName: TagName): string => tagNameMarkup[tagName];
