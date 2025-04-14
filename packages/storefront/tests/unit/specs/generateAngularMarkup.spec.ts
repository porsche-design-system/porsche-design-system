import type { CSSProperties } from 'react';
import {
  generateAngularControlledScript,
  generateAngularMarkup,
  generateAngularProperties,
} from '../../../src/utils/generator/generateAngularMarkup';
import { buttonTestConfig, carouselTestConfig, flyoutTestConfig } from '../data/generator.testdata';

describe('generateAngularMarkup()', () => {
  it('should generate correct Angular markup for button', () => {
    const output = generateAngularMarkup(buttonTestConfig, {
      properties: {
        open: false,
      },
    });
    expect(output).toMatchSnapshot();
  });
  it('should generate correct Angular markup for flyout', () => {
    const output = generateAngularMarkup(flyoutTestConfig, { properties: { open: false } });
    expect(output).toMatchSnapshot();
  });
  it('should generate correct Angular markup for carousel', () => {
    const output = generateAngularMarkup(carouselTestConfig, {});
    expect(output).toMatchSnapshot();
  });
});

describe('generateAngularControlledScript()', () => {
  it('should return correct selector & eventHandler for direct value', () => {
    const { states, eventHandler } = generateAngularControlledScript(
      'p-flyout',
      [
        [
          'onDismiss',
          {
            target: 'p-flyout',
            prop: 'open',
            value: false,
          },
        ],
      ],
      {}
    );
    expect(states).toMatchInlineSnapshot(`"  open = undefined;"`);
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  onDismiss() {
          this.open = false;
        }"
    `
    );
  });
  it('should return correct selector & eventHandler for event value boolean', () => {
    const { states, eventHandler } = generateAngularControlledScript(
      'p-accordion',
      [
        [
          'onUpdate',
          {
            target: 'p-accordion',
            prop: 'open',
            eventValueKey: 'open',
            eventType: 'AccordionUpdateEventDetail',
          },
        ],
      ],
      {
        properties: {
          open: true,
        },
      }
    );
    expect(states).toMatchInlineSnapshot(`"  open = true;"`);
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  onUpdate(e: CustomEvent<AccordionUpdateEventDetail>) {
          this.open = e.detail.open;
        }"
    `
    );
  });
  it('should return correct selector & eventHandler for event value string', () => {
    const { states, eventHandler } = generateAngularControlledScript(
      'p-flyout-multilevel',
      [
        [
          'onUpdate',
          {
            target: 'p-flyout-multilevel',
            prop: 'activeIdentifier',
            eventValueKey: 'activeIdentifier',
            eventType: 'FlyoutMultilevelUpdateEventDetail',
          },
        ],
      ],
      {
        properties: {
          activeIdentifier: 'id-1',
        },
      }
    );
    expect(states).toMatchInlineSnapshot(`"  activeIdentifier = "id-1";"`);
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  onUpdate(e: CustomEvent<FlyoutMultilevelUpdateEventDetail>) {
          this.activeIdentifier = e.detail.activeIdentifier;
        }"
    `
    );
  });
  it('should return correct selector & eventHandler for event value with negated value', () => {
    const { states, eventHandler } = generateAngularControlledScript(
      'p-link-tile-product',
      [
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
      ],
      {}
    );
    expect(states).toMatchInlineSnapshot(`"  liked = undefined;"`);
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  onLike(e: CustomEvent<LinkTileProductLikeEvent>) {
          this.liked = !e.detail.liked;
        }"
    `
    );
  });

  it('should return correct selector & eventHandler when target is not current tagName', () => {
    const { states, eventHandler } = generateAngularControlledScript(
      'p-button',
      [
        [
          'onClick',
          {
            target: 'p-flyout',
            prop: 'open',
            value: true,
          },
        ],
      ],
      {}
    );
    expect(states).toMatchInlineSnapshot('""');
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  onClick() {
          this.open = true;
        }"
    `
    );
  });
});

describe('generateAngularProperties()', () => {
  it('should generate correct properties', () => {
    const props = generateAngularProperties(
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
      `" [aria]="{'aria-haspopup': 'true', 'aria-label': 'Some more descriptive label'}" type="button" [compact]="true" icon="add""`
    );
  });

  it('should generate correct properties for class prop', () => {
    const props = generateAngularProperties(
      'p-button',
      {
        className: 'test',
      },
      []
    );
    expect(props).toMatchInlineSnapshot(`" class="test""`);
  });

  it('should generate correct properties for style prop', () => {
    const props = generateAngularProperties(
      'p-button',
      {
        style: { backgroundColor: 'red', '--custom-prop': '1px' } as CSSProperties,
      },
      []
    );
    expect(props).toMatchInlineSnapshot(`" [style]="{'backgroundColor': 'red', '--custom-prop': '1px'}""`);
  });

  it('should remove props included in events', () => {
    const props = generateAngularProperties(
      'p-flyout',
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
    expect(props).toMatchInlineSnapshot(`" [open]="open" name="Some prop""`);
  });
  it('should transform react properties correctly for vanilla-js when using html tag', () => {
    const propsTruthy = generateAngularProperties(
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
    const propsFalsy = generateAngularProperties(
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
    const propsTruthy = generateAngularProperties(
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
    const propsFalsy = generateAngularProperties(
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
    expect(propsFalsy).toMatchInlineSnapshot(
      `" class="" disabled="false" loop="false" muted="false" auto-play="false" default-checked="false" read-only="false" max-length="0" min-length="0" src-set="""`
    );
  });
});
