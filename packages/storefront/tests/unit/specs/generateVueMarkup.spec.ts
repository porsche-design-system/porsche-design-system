import type { CSSProperties } from 'react';
import {
  generateVueControlledScript,
  generateVueMarkup,
  generateVueProperties,
} from '../../../src/utils/generator/generateVueMarkup';
import { buttonTestConfig, flyoutTestConfig } from '../data/generator.testdata';

describe('generateVueMarkup()', () => {
  it('should generate correct Vanilla JS markup for button', () => {
    const output = generateVueMarkup(buttonTestConfig, {});
    expect(output).toMatchSnapshot();
  });
  it('should generate correct Vanilla JS markup for flyout', () => {
    const output = generateVueMarkup(flyoutTestConfig, {});
    expect(output).toMatchSnapshot();
  });
});

describe('generateVueControlledScript()', () => {
  it('should return correct selector & eventHandler for direct value', () => {
    const { states, eventHandler } = generateVueControlledScript(
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
    expect(states).toMatchInlineSnapshot(`"  const open = ref(undefined);"`);
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  const onDismiss = () => {
          open.value = false;
        }"
    `
    );
  });
  it('should return correct selector & eventHandler for event value', () => {
    const { states, eventHandler } = generateVueControlledScript(
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
    expect(states).toMatchInlineSnapshot(`"  const open = ref(true);"`);
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  const onUpdate = (e: CustomEvent<AccordionUpdateEventDetail>) => {
          open.value = e.detail.open;
        }"
    `
    );
  });
  it('should return correct selector & eventHandler for event value with negated value', () => {
    const { states, eventHandler } = generateVueControlledScript(
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
    expect(states).toMatchInlineSnapshot(`"  const liked = ref(undefined);"`);
    expect(eventHandler).toMatchInlineSnapshot(
      `
      "  const onLike = (e: CustomEvent<LinkTileProductLikeEvent>) => {
          liked.value = !e.detail.liked;
        }"
    `
    );
  });

  it('should return correct selector & eventHandler when target is not current tagName', () => {
    const { states, eventHandler } = generateVueControlledScript(
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
          open.value = true;
        }"
    `
    );
  });
});

describe('generateVueProperties()', () => {
  it('should generate correct properties', () => {
    const props = generateVueProperties(
      {
        aria: { 'aria-haspopup': true, 'aria-label': 'Some more descriptive label' },
        type: 'button',
        compact: true,
        icon: 'add',
      },
      []
    );
    expect(props).toMatchInlineSnapshot(
      `" aria="{'aria-haspopup':true,'aria-label':'Some more descriptive label'}" type="button" :compact="true" icon="add""`
    );
  });

  it('should generate correct properties for style prop', () => {
    const props = generateVueProperties(
      {
        style: { backgroundColor: 'red', '--custom-prop': '1px' } as CSSProperties,
      },
      []
    );
    expect(props).toMatchInlineSnapshot(`" :style="{"backgroundColor":"red","--custom-prop":"1px"}""`);
  });

  it('should remove props included in events', () => {
    const props = generateVueProperties(
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
    expect(props).toMatchInlineSnapshot(`" :open="open" name="Some prop""`);
  });
});
