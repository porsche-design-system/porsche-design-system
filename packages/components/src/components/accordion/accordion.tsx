import { Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, HEADING_TAGS, hasNamedSlot, validateProps } from '../../utils';
import { getComponentCss } from './accordion-styles';
import {
  ACCORDION_ALIGN_ICONS,
  ACCORDIONS_BACKGROUNDS,
  type AccordionAlignIcon,
  type AccordionBackground,
  type AccordionHeadingTag,
  type AccordionUpdateEventDetail,
} from './accordion-utils';

const propTypes: PropTypes<typeof Accordion> = {
  open: AllowedTypes.boolean,
  alignIcon: AllowedTypes.oneOf<AccordionAlignIcon>(ACCORDION_ALIGN_ICONS),
  background: AllowedTypes.oneOf<AccordionBackground>(ACCORDIONS_BACKGROUNDS),
  compact: AllowedTypes.boolean,
  sticky: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<AccordionHeadingTag>(HEADING_TAGS),
};

/**
 * @slot {"name": "summary", "description": "Content for the accordion's summary section. Clicking toggles the accordion open and closed." }
 * @slot {"name": "heading", "description": "Content for the accordion's heading section. Clicking toggles the accordion open and closed.", "isDeprecated": "true" }
 * @slot {"name": "", "description": "Main content displayed when the accordion is expanded." }
 *
 * @controlled {"props": ["open"], "event": "update"}
 */
@Component({
  tag: 'p-accordion',
  shadow: true,
})
export class Accordion {
  @Element() public host!: HTMLElement;

  /** Controls whether the accordion is open or closed. */
  @Prop() public open?: boolean;

  /** Aligns the icon within the summary section. */
  @Prop() public alignIcon?: AccordionAlignIcon = 'end';

  /** Defines the background color. Use `frosted` only on images or gradients. */
  @Prop() public background?: AccordionBackground = 'none';

  /** Displays the accordion in compact mode. */
  @Prop() public compact?: boolean;

  /**
   * @deprecated, will be removed with next major release, use slot `summary` instead.
   * Sets the heading text within the summary section. */
  @Prop() public heading?: string;

  /**
   * @deprecated, will be removed with next major release, use slot `summary` instead.
   * Sets the heading tag for proper semantic structure within the page. */
  @Prop() public headingTag?: AccordionHeadingTag = 'h2';

  /**
   * @experimental Makes the summary section sticky at the top while scrolling. Only works with `background="canvas"` or `background="surface"`.
   */
  @Prop() public sticky?: boolean;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<AccordionUpdateEventDetail>;

  private hasSummary: boolean;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.alignIcon,
      this.background,
      this.compact,
      this.open,
      this.sticky
    );

    this.hasSummary = hasNamedSlot(this.host, 'summary');

    const Heading = this.headingTag;

    return (
      <details {...(this.open ? { open: true } : {})}>
        {/** biome-ignore lint/a11y/noStaticElementInteractions: necessary to enable a controlled state */}
        <summary onClick={this.onSummaryClick}>
          {this.hasSummary ? <slot name="summary" /> : <Heading>{this.heading || <slot name="heading" />}</Heading>}
          <span></span>
        </summary>
        <div>
          <slot />
        </div>
      </details>
    );
  }

  private onSummaryClick = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
    this.update.emit({ open: !this.open });
  };
}
