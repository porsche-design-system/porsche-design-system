import { Component, Element, Event, type EventEmitter, Host, type JSX, Prop, h } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  HEADING_TAGS,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import { getComponentCss } from './accordion-styles';
import {
  ACCORDION_SIZES,
  type AccordionHeadingTag,
  type AccordionSize,
  type AccordionTag,
  type AccordionUpdateEventDetail,
} from './accordion-utils';

const propTypes: PropTypes<typeof Accordion> = {
  size: AllowedTypes.breakpoint<AccordionSize>(ACCORDION_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<AccordionHeadingTag>(HEADING_TAGS),
  tag: AllowedTypes.oneOf<AccordionTag>([undefined, ...HEADING_TAGS]),
  open: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  sticky: AllowedTypes.boolean,
};

/**
 * @slot {"name": "heading", "description": "Defines the heading used in the accordion. Can be used alternatively to the heading prop. Please **refrain** from using any other than text content as slotted markup." }
 * @slot {"name": "", "description": "Default slot for the main content" }
 *
 * @controlled {"props": ["open"], "event": "update"}
 */
@Component({
  tag: 'p-accordion',
  shadow: true,
})
export class Accordion {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<AccordionSize> = 'small';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Defines the heading used in accordion. */
  @Prop() public heading?: string;

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public headingTag?: AccordionHeadingTag = 'h2';

  /**
   * @deprecated, will be removed with next major release, use `heading-tag` instead.
   * Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: AccordionTag;

  /** Defines if accordion is open. */
  @Prop() public open?: boolean;

  /** Displays the Accordion as compact version with thinner border and smaller paddings. */
  @Prop() public compact?: boolean;

  /**
   * @experimental Sticks the Accordion heading at the top, fixed while scrolling
   */
  @Prop() public sticky?: boolean;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public accordionChange: EventEmitter<AccordionUpdateEventDetail>;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<AccordionUpdateEventDetail>;

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Accordion>(this, 'tag', 'Please use heading-tag prop instead.');
    attachComponentCss(this.host, getComponentCss, this.size, this.compact, this.open, this.theme, this.sticky);

    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const Heading = this.tag || this.headingTag;

    return (
      <Host>
        <Heading class="heading">
          <button
            id={buttonId}
            type="button"
            aria-expanded={this.open ? 'true' : 'false'}
            aria-controls={contentId}
            onClick={this.onButtonClick}
          >
            {this.heading || <slot name="heading" />}
            <span class="icon-container">
              <PrefixedTagNames.pIcon
                class="icon"
                name={this.open ? 'minus' : 'plus'}
                theme={this.theme}
                size="xx-small"
                aria-hidden="true"
              />
            </span>
          </button>
        </Heading>
        <div id={contentId} class="collapsible" role="region" aria-labelledby={buttonId}>
          <div>
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  private onButtonClick = (): void => {
    this.update.emit({ open: !this.open });
    this.accordionChange.emit({ open: !this.open });
  };
}
