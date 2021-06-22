import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import { getPrefixedTagNames, isDark, mapBreakpointPropToClasses } from '../../../utils';
import type { BreakpointCustomizable, Theme } from '../../../types';
import type { HeadlineTag } from '../../basic/typography/headline/headline-utils';
import type { AccordionChangeEvent, AccordionHeaderSize, AccordionWeight } from './accordion-utils';

@Component({
  tag: 'p-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<AccordionHeaderSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: AccordionWeight = 'semibold';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Defines the heading used in accordion. */
  @Prop() public heading?: string;

  /** Sets a headline tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: HeadlineTag = 'h2';

  /** Defines if accordion is open. */
  @Prop() public open?: boolean;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public accordionChange: EventEmitter<AccordionChangeEvent>;

  public render(): JSX.Element {
    const labelledId = 'labelled';
    const controlsId = 'controls';

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--open']: this.open,
      ['root--weight-regular']: this.weight === 'regular',
      ...mapBreakpointPropToClasses('root--size', this.size),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class={rootClasses}>
        <PrefixedTagNames.pHeadline
          tag={this.tag}
          theme={this.theme}
          class="headline"
          variant="inherit"
          onClick={this.handleAccordionClick}
        >
          <button type="button" aria-expanded={this.open} aria-controls={controlsId} id={labelledId}>
            {this.heading || <slot name="heading" />}
            <PrefixedTagNames.pIcon name="arrowHeadDown" aria-hidden="true" class="icon" theme={this.theme} />
          </button>
        </PrefixedTagNames.pHeadline>
        <div id={controlsId} class="content" role="region" aria-labelledby={labelledId}>
          <slot />
        </div>
      </div>
    );
  }

  private handleAccordionClick = (): void => {
    this.accordionChange.emit({ open: !this.open });
  };
}
