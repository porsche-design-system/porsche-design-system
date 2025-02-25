import type { CSSProperties } from 'react';
import {
  generateAngularControlledScript,
  generateAngularMarkup,
  generateAngularProperties,
} from '../../../src/utils/generator/generateAngularMarkup';
import { buttonTestConfig, flyoutTestConfig } from '../data/generator.testdata';

describe('generateAngularMarkup()', () => {
  it('should generate correct Vanilla JS markup for button', () => {
    const output = generateAngularMarkup(buttonTestConfig, {
      properties: {
        open: false,
      },
    });
    expect(output).toMatchSnapshot();
  });
  it('should generate correct Vanilla JS markup for flyout', () => {
    const output = generateAngularMarkup(flyoutTestConfig, { properties: { open: false } });
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
      "  const onDismiss = () => {
          this.open = false;
        }"
    `
    );
  });
  it('should return correct selector & eventHandler for event value', () => {
    const { states, eventHandler } = generateAngularControlledScript(
      'p-accordion',
      [
        [
          'onUpdate',
          {
            target: 'p-accordion',
            prop: 'open',
            eventValueKey: 'open',
            eventType: 'CustomEvent<AccordionUpdateEventDetail>',
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
            eventType: 'CustomEvent<LinkTileProductLikeEvent>',
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
      "  const onClick = () => {
          this.open = true;
        }"
    `
    );
  });
});

describe('generateAngularProperties()', () => {
  it('should generate correct properties', () => {
    const props = generateAngularProperties(
      {
        aria: { 'aria-haspopup': true, 'aria-label': 'Some more descriptive label' },
        type: 'button',
        compact: true,
        icon: 'add',
      },
      []
    );
    expect(props).toMatchInlineSnapshot(
      `" [aria]="{'aria-haspopup':true,'aria-label':'Some more descriptive label'}" type="button" [compact]="true" icon="add""`
    );
  });

  it('should generate correct properties for style prop', () => {
    const props = generateAngularProperties(
      {
        style: { backgroundColor: 'red', '--custom-prop': '1px' } as CSSProperties,
      },
      []
    );
    expect(props).toMatchInlineSnapshot(`" [style]="{"backgroundColor":"red","--custom-prop":"1px"}""`);
  });

  it('should remove props included in events', () => {
    const props = generateAngularProperties(
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
});
