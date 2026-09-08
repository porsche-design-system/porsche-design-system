import type { CSSProperties } from 'react';
import {
  generateReactControlledScript,
  generateReactMarkup,
  generateReactProperties,
} from '../../../src/utils/generator/generateReactMarkup';
import type { ElementConfig } from '../../../src/utils/generator/generator';
import { buttonTestConfig, carouselTestConfig, flyoutTestConfig } from '../data/generator.testdata';

describe('generateReactMarkup()', () => {
  it('should generate correct React markup for button', () => {
    const output = generateReactMarkup(buttonTestConfig, {});
    expect(output).toMatchSnapshot();
  });
  it('should generate correct React markup for flyout', () => {
    const output = generateReactMarkup(flyoutTestConfig, {});
    expect(output).toMatchSnapshot();
  });
  it('should generate correct React markup for carousel', () => {
    const output = generateReactMarkup(carouselTestConfig, {});
    expect(output).toMatchSnapshot();
  });

  it('deduplicates event type imports across top-level and nested components', () => {
    const accordion: ElementConfig<'p-accordion'> = {
      tag: 'p-accordion',
      events: {
        onUpdate: { target: 'p-accordion', prop: 'open', eventValueKey: 'open' },
      },
    };
    const { imports } = generateReactMarkup([accordion, { tag: 'div', children: [accordion] }], {});

    expect(imports.match(/type AccordionUpdateEvent/g)).toHaveLength(1);
  });
});

describe('generateReactControlledScript()', () => {
  it('requires an explicit payload type for non-PDS detail-based handlers', () => {
    expect(() =>
      generateReactControlledScript('div', [['onUpdate', { target: 'div', prop: 'open', eventValueKey: 'open' }]], {})
    ).toThrow('Missing eventType for div.onUpdate with eventValueKey "open"');
  });

  it('preserves explicit payload types for non-PDS detail-based handlers', () => {
    const { eventHandler, types } = generateReactControlledScript(
      'div',
      [
        [
          'onUpdate',
          {
            target: 'div',
            prop: 'open',
            eventValueKey: 'open',
            eventType: 'AccordionUpdateEventDetail',
          },
        ],
      ],
      {}
    );

    expect(types).toEqual(['AccordionUpdateEventDetail']);
    expect(eventHandler).toContain('(e: CustomEvent<AccordionUpdateEventDetail>)');
  });

  it('should return correct selector & eventHandler for direct value', () => {
    const { states, eventHandler } = generateReactControlledScript(
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
    expect(states).toMatchInlineSnapshot('"  const [open, setOpen] = useState(undefined);"');
    expect(eventHandler).toMatchInlineSnapshot(
      `"  const onDismiss = () => {
    setOpen(false);
  }"`
    );
  });
  it('should return correct selector & eventHandler for event value boolean', () => {
    const { states, eventHandler, types } = generateReactControlledScript(
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
    expect(states).toMatchInlineSnapshot('"  const [open, setOpen] = useState(true);"');
    expect(eventHandler).toMatchInlineSnapshot(
      `"  const onUpdate = (e: AccordionUpdateEvent) => {
    setOpen(e.detail.open);
  }"`
    );
    expect(types).toEqual(['AccordionUpdateEvent']);
  });
  it('should return correct selector & eventHandler for event value string', () => {
    const { states, eventHandler } = generateReactControlledScript(
      'p-drilldown',
      [
        [
          'onUpdate',
          {
            target: 'p-drilldown',
            prop: 'activeIdentifier',
            eventValueKey: 'activeIdentifier',
            eventType: 'DrilldownUpdateEventDetail',
          },
        ],
      ],
      {
        properties: {
          activeIdentifier: 'id-1',
        },
      }
    );
    expect(states).toMatchInlineSnapshot('"  const [activeIdentifier, setActiveIdentifier] = useState("id-1");"');
    expect(eventHandler).toMatchInlineSnapshot(
      `"  const onUpdate = (e: DrilldownUpdateEvent) => {
    setActiveIdentifier(e.detail.activeIdentifier);
  }"`
    );
  });
  it('should return correct selector & eventHandler for event value with negated value', () => {
    const { states, eventHandler } = generateReactControlledScript(
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
    expect(states).toMatchInlineSnapshot('"  const [liked, setLiked] = useState(undefined);"');
    expect(eventHandler).toMatchInlineSnapshot(
      `"  const onLike = (e: LinkTileProductLikeEvent) => {
    setLiked(!e.detail.liked);
  }"`
    );
  });

  it('derives concrete event names from the component instead of a shared detail type', () => {
    const { eventHandler, types } = generateReactControlledScript(
      'p-modal',
      [
        [
          'onDismiss',
          {
            target: 'p-modal',
            prop: 'dismissReason',
            eventValueKey: 'reason',
            eventType: 'DialogDismissEventDetail',
          },
        ],
      ],
      {}
    );

    expect(types).toEqual(['ModalDismissEvent']);
    expect(eventHandler).toContain('(e: ModalDismissEvent)');
    expect(eventHandler).toContain('setDismissReason(e.detail.reason)');
  });

  it('should return correct selector & eventHandler when target is not current tagName', () => {
    const { states, eventHandler } = generateReactControlledScript(
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
      `"  const onClick = () => {
    setOpen(true);
  }"`
    );
  });

  it('should return a toggling eventHandler for toggleValue', () => {
    const { states, eventHandler } = generateReactControlledScript(
      'p-button',
      [
        [
          'onClick',
          {
            target: 'p-popover',
            prop: 'open',
            toggleValue: true,
          },
        ],
      ],
      {}
    );
    expect(states).toMatchInlineSnapshot('""');
    expect(eventHandler).toMatchInlineSnapshot(
      `"  const onClick = () => {
    setOpen((prev) => !prev);
  }"`
    );
  });
});

describe('generateReactProperties()', () => {
  it('should generate correct properties', () => {
    const props = generateReactProperties(
      {
        aria: { 'aria-haspopup': true, 'aria-label': 'Some more descriptive label' },
        type: 'button',
        compact: true,
        icon: 'add',
      },
      []
    );
    expect(props).toMatchInlineSnapshot(
      `" aria={{'aria-haspopup': 'true', 'aria-label': 'Some more descriptive label'}} type="button" compact={true} icon="add""`
    );
  });

  it('should generate correct properties for style prop', () => {
    const props = generateReactProperties(
      {
        style: { backgroundColor: 'red', '--custom-prop': '1px' } as CSSProperties,
      },
      []
    );
    expect(props).toMatchInlineSnapshot(`" style={{'backgroundColor': 'red', '--custom-prop': '1px'}}"`);
  });

  it('should remove props included in events', () => {
    const props = generateReactProperties(
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
    expect(props).toMatchInlineSnapshot(`" open={open} name="Some prop""`);
  });
});
