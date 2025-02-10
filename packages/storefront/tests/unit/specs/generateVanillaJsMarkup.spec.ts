import type { CSSProperties } from 'react';
import {
  generateVanillaJSControlledScript,
  generateVanillaJsMarkup,
  generateVanillaJsProperties,
} from '../../../src/utils/generator/generateVanillaJsMarkup';
import { buttonTestConfig, flyoutTestConfig } from '../data/generator.testdata';

describe('generateVanillaJsMarkup()', () => {
  it('should generate correct Vanilla JS markup for button', () => {
    const output = generateVanillaJsMarkup(buttonTestConfig);
    expect(output).toMatchSnapshot();
  });
  it('should generate correct Vanilla JS markup for flyout', () => {
    const output = generateVanillaJsMarkup(flyoutTestConfig);
    expect(output).toMatchSnapshot();
  });
});

describe('generateVanillaJSControlledScript()', () => {
  it('should return correct selector & eventHandler for direct value', () => {
    const { selector, eventHandler } = generateVanillaJSControlledScript('p-flyout', [
      [
        'onDismiss',
        {
          target: 'p-flyout',
          prop: 'open',
          value: false,
        },
      ],
    ]);
    expect(selector).toMatchInlineSnapshot('"  const flyout = document.querySelector("p-flyout");"');
    expect(eventHandler).toMatchInlineSnapshot(
      '"  flyout.addEventListener(\'dismiss\', () => (flyout.open = false));"'
    );
  });
  it('should return correct selector & eventHandler for event value', () => {
    const { selector, eventHandler } = generateVanillaJSControlledScript('p-accordion', [
      [
        'onUpdate',
        {
          target: 'p-accordion',
          prop: 'open',
          eventValueKey: 'open',
          eventType: 'CustomEvent<AccordionUpdateEventDetail>',
        },
      ],
    ]);
    expect(selector).toMatchInlineSnapshot('"  const accordion = document.querySelector("p-accordion");"');
    expect(eventHandler).toMatchInlineSnapshot(
      '"  accordion.addEventListener(\'update\', (e) => e.target.open = e.detail.open);"'
    );
  });
  it('should return correct selector & eventHandler for event value with negated value', () => {
    const { selector, eventHandler } = generateVanillaJSControlledScript('p-link-tile-product', [
      [
        'onLike',
        {
          target: 'p-link-tile-product',
          prop: 'liked',
          eventValueKey: 'liked',
          eventType: 'CustomEvent<LinkTileProductLikeEvent>',
          negateValue: true,
        },
      ],
    ]);
    expect(selector).toMatchInlineSnapshot(
      '"  const linkTileProduct = document.querySelector("p-link-tile-product");"'
    );
    expect(eventHandler).toMatchInlineSnapshot(
      '"  linkTileProduct.addEventListener(\'like\', (e) => e.target.liked = !e.detail.liked);"'
    );
  });

  it('should return correct selector & eventHandler when target is not current tagName', () => {
    const { selector, eventHandler } = generateVanillaJSControlledScript('p-button', [
      [
        'onClick',
        {
          target: 'p-flyout',
          prop: 'open',
          value: true,
        },
      ],
    ]);
    expect(selector).toMatchInlineSnapshot('"  const button = document.querySelector("p-button");"');
    expect(eventHandler).toMatchInlineSnapshot('"  button.addEventListener(\'click\', () => (flyout.open = true));"');
  });
});

describe('generateVanillaJsProperties()', () => {
  it('should generate correct properties', () => {
    const props = generateVanillaJsProperties(
      {
        aria: { 'aria-haspopup': true, 'aria-label': 'Some more descriptive label' },
        type: 'button',
        compact: true,
        icon: 'add',
      },
      []
    );
    expect(props).toMatchInlineSnapshot(
      '" aria="{\'aria-haspopup\':true,\'aria-label\':\'Some more descriptive label\'}" type="button" compact="true" icon="add""'
    );
  });

  it('should generate correct properties for style prop', () => {
    const props = generateVanillaJsProperties(
      {
        style: { backgroundColor: 'red', '--custom-prop': '1px' } as CSSProperties,
      },
      []
    );
    expect(props).toMatchInlineSnapshot('" style="background-color: red; --custom-prop: 1px""');
  });

  it('should remove props included in events', () => {
    const props = generateVanillaJsProperties(
      {
        open: true,
        name: 'Some prop',
      },
      [
        [
          'onClick',
          {
            target: 'p-flyout',
            prop: 'open',
          },
        ],
      ]
    );
    expect(props).toMatchInlineSnapshot('" name="Some prop""');
  });
});
