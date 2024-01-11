import { Component, Element, Event, type EventEmitter, h, Host, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  HEADING_TAGS,
  THEMES,
  validateProps,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type { AccordionSize, AccordionTag, AccordionUpdateEventDetail } from './accordion-utils';
import { ACCORDION_SIZES } from './accordion-utils';
import { getComponentCss } from './accordion-styles';

const propTypes: PropTypes<typeof Accordion> = {
  size: AllowedTypes.breakpoint<AccordionSize>(ACCORDION_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  heading: AllowedTypes.string,
  tag: AllowedTypes.oneOf<AccordionTag>(HEADING_TAGS),
  open: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
};

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

  /** Sets a headline tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: AccordionTag = 'h2';

  /** Defines if accordion is open. */
  @Prop() public open?: boolean;

  /** Displays the Accordion as compact version with thinner border and smaller paddings. */
  @Prop() public compact?: boolean;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public accordionChange: EventEmitter<AccordionUpdateEventDetail>;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<AccordionUpdateEventDetail>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.compact, this.open, this.theme);

    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const Heading = this.tag;

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
