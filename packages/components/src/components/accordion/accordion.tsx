import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  HEADING_TAGS,
  hasPropValueChanged,
  validateProps,
} from '../../utils';
import { getComponentCss } from './accordion-styles';
import {
  ACCORDION_SIZES,
  type AccordionHeadingTag,
  type AccordionSize,
  type AccordionUpdateEventDetail,
} from './accordion-utils';

const propTypes: PropTypes<typeof Accordion> = {
  size: AllowedTypes.breakpoint<AccordionSize>(ACCORDION_SIZES),
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<AccordionHeadingTag>(HEADING_TAGS),
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

  /** Defines the heading used in accordion. */
  @Prop() public heading?: string;

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public headingTag?: AccordionHeadingTag = 'h2';

  /** Defines if accordion is open. */
  @Prop() public open?: boolean;

  /** Displays the Accordion as compact version with thinner border and smaller paddings. */
  @Prop() public compact?: boolean;

  /**
   * @experimental Sticks the Accordion heading at the top, fixed while scrolling
   */
  @Prop() public sticky?: boolean;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<AccordionUpdateEventDetail>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.compact, this.open, this.sticky);

    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const Heading = this.headingTag;

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
  };
}
