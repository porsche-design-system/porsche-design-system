import type { CSSProperties } from 'react';
import {
  generateVanillaJSControlledScript,
  generateVanillaJsMarkup,
  generateVanillaJsProperties,
} from '../../../src/utils/generator/generateVanillaJsMarkup';
import { buttonTestConfig, carouselTestConfig, flyoutTestConfig } from '../data/generator.testdata';

describe('generateVanillaJsMarkup()', () => {
  it('should generate correct Vanilla JS markup for button', () => {
    const output = generateVanillaJsMarkup(buttonTestConfig);
    expect(output).toMatchSnapshot();
  });
  it('should generate correct Vanilla JS markup for flyout', () => {
    const output = generateVanillaJsMarkup(flyoutTestConfig);
    expect(output).toMatchSnapshot();
  });
  it('should generate correct Vanilla JS markup for carousel', () => {
    const output = generateVanillaJsMarkup(carouselTestConfig);
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
          eventType: 'AccordionUpdateEventDetail',
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
          eventType: 'LinkTileProductLikeEvent',
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
      'p-button',
      {
        aria: { 'aria-haspopup': true, 'aria-label': 'Some more descriptive label' },
        type: 'button',
        compact: true,
        icon: 'add',
      },
      []
    );
    expect(props).toMatchInlineSnapshot(
      `" aria="{'aria-haspopup': 'true', 'aria-label': 'Some more descriptive label'}" type="button" compact="true" icon="add""`
    );
  });

  it('should generate correct properties for style prop', () => {
    const props = generateVanillaJsProperties(
      'p-button',
      {
        style: { backgroundColor: 'red', '--custom-prop': '1px' } as CSSProperties,
      },
      []
    );
    expect(props).toMatchInlineSnapshot('" style="background-color: red; --custom-prop: 1px""');
  });

  it('should remove props included in events', () => {
    const props = generateVanillaJsProperties(
      'p-button',
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

  it('should transform react properties correctly for vanilla-js when using html tag', () => {
    const propsTruthy = generateVanillaJsProperties(
      'input',
      {
        className: 'test',
        disabled: true,
        loop: true,
        muted: true,
        autoPlay: true,
        defaultChecked: true,
        readOnly: true,
        maxLength: 10,
        minLength: 10,
        srcSet: 'test',
      },
      []
    );
    expect(propsTruthy).toMatchInlineSnapshot(
      `" class="test" disabled loop muted autoplay checked readonly maxlength="10" minlength="10" srcset="test""`
    );
    const propsFalsy = generateVanillaJsProperties(
      'input',
      {
        className: '',
        disabled: false,
        loop: false,
        muted: false,
        autoPlay: false,
        defaultChecked: false,
        readOnly: false,
        maxLength: 0,
        minLength: 0,
        srcSet: '',
      },
      []
    );
    expect(propsFalsy).toMatchInlineSnapshot(`" class="" maxlength="0" minlength="0" srcset="""`);
  });

  it('should transform react properties correctly for vanilla-js when using pds tag', () => {
    const propsTruthy = generateVanillaJsProperties(
      'p-button',
      {
        className: 'test',
        disabled: true,
        loop: true,
        muted: true,
        autoPlay: true,
        defaultChecked: true,
        readOnly: true,
        maxLength: 10,
        minLength: 10,
        srcSet: 'test',
      },
      []
    );
    expect(propsTruthy).toMatchInlineSnapshot(
      `" class="test" disabled="true" loop="true" muted="true" auto-play="true" default-checked="true" read-only="true" max-length="10" min-length="10" src-set="test""`
    );
    const propsFalsy = generateVanillaJsProperties(
      'p-button',
      {
        className: '',
        disabled: false,
        loop: false,
        muted: false,
        autoPlay: false,
        defaultChecked: false,
        readOnly: false,
        maxLength: 0,
        minLength: 0,
        srcSet: '',
      },
      []
    );
    expect(propsFalsy).toMatchInlineSnapshot(`" class="" disabled="false" loop="false" muted="false" auto-play="false" default-checked="false" read-only="false" max-length="0" min-length="0" src-set="""`);
  });
});
