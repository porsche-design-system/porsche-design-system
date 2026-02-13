import { Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, validateProps } from '../../utils';
import { getComponentCss } from './accordion-styles';
import {
  ACCORDION_ALIGN_ICONS,
  ACCORDIONS_BACKGROUNDS,
  type AccordionAlignIcon,
  type AccordionBackground,
  type AccordionUpdateEventDetail,
} from './accordion-utils';

const propTypes: PropTypes<typeof Accordion> = {
  open: AllowedTypes.boolean,
  alignIcon: AllowedTypes.oneOf<AccordionAlignIcon>(ACCORDION_ALIGN_ICONS),
  background: AllowedTypes.oneOf<AccordionBackground>(ACCORDIONS_BACKGROUNDS),
  compact: AllowedTypes.boolean,
  sticky: AllowedTypes.boolean,
};

/**
 * @slot {"name": "summary", "description": "Specifies a summary, caption, or legend for the internally used `<details>` element's disclosure box. Clicking the summary toggles the state of the parent `<details>` element open and closed." }
 * @slot {"name": "", "description": "Default slot for the internally used `<details>` content." }
 *
 * @controlled {"props": ["open"], "event": "update"}
 */
@Component({
  tag: 'p-accordion',
  shadow: true,
})
export class Accordion {
  @Element() public host!: HTMLElement;

  /** Sets the open/closed state of the Accordion. */
  @Prop() public open?: boolean;

  /** Aligns the icon within the summary section. */
  @Prop() public alignIcon?: AccordionAlignIcon = 'end';

  /** Defines the background color */
  @Prop() public background?: AccordionBackground = 'frosted';

  /** Displays the Accordion as compact version. */
  @Prop() public compact?: boolean;

  /**
   * @experimental Sticks the Accordion heading at the top, fixed while scrolling
   */
  @Prop() public sticky?: boolean;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<AccordionUpdateEventDetail>;

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

    return (
      <details {...(this.open ? { open: true } : {})}>
        {/** biome-ignore lint/a11y/noStaticElementInteractions: necessary to enable a controlled state */}
        <summary onClick={this.onSummaryClick}>
          <slot name="summary" />
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
