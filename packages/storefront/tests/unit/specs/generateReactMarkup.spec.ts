import type { CSSProperties } from 'react';
import {
  generateReactControlledScript,
  generateReactMarkup,
  generateReactProperties,
} from '../../../src/utils/generator/generateReactMarkup';
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
});

describe('generateReactControlledScript()', () => {
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
    const { states, eventHandler } = generateReactControlledScript(
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
      `"  const onUpdate = (e: CustomEvent<AccordionUpdateEventDetail>) => {
    setOpen(e.detail.open);
  }"`
    );
  });
  it('should return correct selector & eventHandler for event value string', () => {
    const { states, eventHandler } = generateReactControlledScript(
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
    expect(states).toMatchInlineSnapshot('"  const [activeIdentifier, setActiveIdentifier] = useState("id-1");"');
    expect(eventHandler).toMatchInlineSnapshot(
      `"  const onUpdate = (e: CustomEvent<FlyoutMultilevelUpdateEventDetail>) => {
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
      `"  const onLike = (e: CustomEvent<LinkTileProductLikeEvent>) => {
    setLiked(!e.detail.liked);
  }"`
    );
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
