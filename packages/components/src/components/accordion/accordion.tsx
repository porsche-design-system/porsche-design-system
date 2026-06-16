import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasNamedSlot,
  hasPropValueChanged,
  observeChildren,
  unobserveChildren,
  validateProps,
} from '../../utils';
import { getComponentCss } from './accordion-styles';
import {
  ACCORDION_ALIGN_MARKERS,
  ACCORDION_HEADINGS_DEPRECATED,
  ACCORDION_SIZES,
  ACCORDIONS_BACKGROUNDS,
  type AccordionAlignMarker,
  type AccordionBackground,
  type AccordionHeadingTag,
  type AccordionSize,
  type AccordionUpdateEventDetail,
} from './accordion-utils';

const propTypes: PropTypes<typeof Accordion> = {
  open: AllowedTypes.boolean,
  alignMarker: AllowedTypes.oneOf<AccordionAlignMarker>(ACCORDION_ALIGN_MARKERS),
  background: AllowedTypes.oneOf<AccordionBackground>(ACCORDIONS_BACKGROUNDS),
  compact: AllowedTypes.boolean,
  indent: AllowedTypes.breakpoint('boolean'),
  sticky: AllowedTypes.boolean,
  size: AllowedTypes.breakpoint<AccordionSize>(ACCORDION_SIZES),
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<AccordionHeadingTag>(ACCORDION_HEADINGS_DEPRECATED),
};

/**
 * @slot {"name": "summary", "description": "Content for the accordion's summary section. Clicking toggles the accordion open and closed." }
 * @slot {"name": "summary-before", "description": "Content or interactive elements placed before the accordion's summary section." }
 * @slot {"name": "summary-after", "description": "Content or interactive elements placed after the accordion's summary section." }
 * @slot {"name": "heading", "description": "Content for the accordion's heading section. Clicking toggles the accordion open and closed.", "isDeprecated": true }
 * @slot {"name": "", "description": "Main content displayed when the accordion is expanded." }
 *
 * @controlled {"props": ["open"], "event": "update"}
 */
@Component({
  tag: 'p-accordion',
  shadow: { delegatesFocus: true },
})
export class Accordion {
  @Element() public host!: HTMLElement;

  /** Controls whether the accordion is open or closed. */
  @Prop() public open?: boolean;

  /** Positions the expand/collapse marker icon at the start or end of the summary section. */
  @Prop() public alignMarker?: AccordionAlignMarker = 'end';

  /** Sets the background color of the accordion panel. Use `frosted` only when placed on images, videos, or gradients. */
  @Prop() public background?: AccordionBackground = 'none';

  /** Reduces padding and spacing for a more compact layout, useful in space-constrained interfaces. */
  @Prop() public compact?: boolean;

  /** Indents the slotted content to be vertically aligned with the text of the summary section. */
  @Prop() public indent?: BreakpointCustomizable<boolean> = false;

  /**
   * @deprecated Will be removed in the next major release. Use the `summary` slot instead.
   * Controls the heading size in the summary section (only applies when using the `heading` prop or `heading` slot). */
  @Prop() public size?: BreakpointCustomizable<AccordionSize> = 'small';

  /**
   * @deprecated Will be removed in the next major release. Use the `summary` slot instead.
   * Sets the heading text within the summary section. */
  @Prop() public heading?: string;

  /**
   * @deprecated Will be removed in the next major release. Use the `summary` slot instead.
   * Sets the heading tag for proper semantic structure within the page. */
  @Prop() public headingTag?: AccordionHeadingTag = 'h2';

  /**
   * @experimental Makes the summary section sticky at the top while scrolling. Only works with `background="canvas"` or `background="surface"`. Not compatible with `summary-before` or `summary-after` slots.
   */
  @Prop() public sticky?: boolean;

  /** Emitted when the user toggles the accordion open or closed, with the new open state in the event detail. */
  @Event({ bubbles: false }) public update: EventEmitter<AccordionUpdateEventDetail>;

  private hasSummary: boolean;
  private hasSummaryBefore: boolean;
  private hasSummaryAfter: boolean;

  public connectedCallback(): void {
    // Observe dynamic slot changes. As soon as CSS selector :has-slotted has better browser support, we can remove this
    // and use that selector in getComponentCss instead.
    observeChildren(
      this.host,
      () => {
        forceUpdate(this.host);
      },
      undefined,
      { subtree: false, childList: true, attributes: false }
    );
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasSummary = hasNamedSlot(this.host, 'summary');
    this.hasSummaryBefore = hasNamedSlot(this.host, 'summary-before');
    this.hasSummaryAfter = hasNamedSlot(this.host, 'summary-after');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.alignMarker,
      this.background,
      this.compact,
      this.indent,
      this.open,
      this.sticky,
      this.hasSummaryBefore,
      this.hasSummaryAfter,
      this.size
    );

    const Heading = this.headingTag;

    return (
      <details {...(this.open ? { open: true } : {})}>
        {/** biome-ignore lint/a11y/noStaticElementInteractions: necessary to enable a controlled state */}
        <summary onClick={this.onSummaryClick}>
          {this.hasSummary ? <slot name="summary" /> : <Heading>{this.heading || <slot name="heading" />}</Heading>}
        </summary>
        {this.hasSummaryBefore && <slot name="summary-before" />}
        {this.hasSummaryAfter && <slot name="summary-after" />}
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
