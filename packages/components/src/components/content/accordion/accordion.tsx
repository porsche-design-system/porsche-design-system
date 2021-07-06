import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import { getPrefixedTagNames, insertSlottedStyles, isDark, mapBreakpointPropToClasses } from '../../../utils';
import type { BreakpointCustomizable, Theme } from '../../../types';
import type { HeadlineTag } from '../../basic/typography/headline/headline-utils';
import type { AccordionChangeEvent, AccordionSize } from './accordion-utils';
import { setCollapsibleElementHeight, getContentWrapperHeight, getSlottedCss } from './accordion-utils';
import { observeResize, unobserveResize } from '../../../utils/resize-observer';

@Component({
  tag: 'p-accordion',
  styleUrl: 'accordion.scss',
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
  @Prop() public tag?: HeadlineTag = 'h2';

  /** Defines if accordion is open. */
  @Prop() public open?: boolean;

  /** Displays the Accordion as compact version with thinner border and smaller paddings. */
  @Prop() public compact?: boolean;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public accordionChange: EventEmitter<AccordionChangeEvent>;

  private collapsibleElement: HTMLDivElement;
  private content: HTMLDivElement;
  private contentWrapperHeight: string;

  @Watch('open')
  public openChangeHandler(): void {
    this.setCollapsibleElementHeight();
  }

  public connectedCallback(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
  }

  public componentDidLoad(): void {
    observeResize(
      this.content,
      ({ borderBoxSize, contentRect }) => {
        this.contentWrapperHeight = getContentWrapperHeight(borderBoxSize, contentRect);
        this.setCollapsibleElementHeight();
      },
      { box: 'border-box' }
    );
  }

  public disconnectedCallback(): void {
    unobserveResize(this.content);
  }

  public render(): JSX.Element {
    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--open']: this.open,
      ...(!this.compact && mapBreakpointPropToClasses('root--size', this.size)),
      ['root--compact']: this.compact,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class={rootClasses}>
        <PrefixedTagNames.pHeadline tag={this.tag} theme={this.theme} variant="inherit">
          <button
            id={buttonId}
            type="button"
            aria-expanded={this.open}
            aria-controls={contentId}
            onClick={this.handleButtonClick}
          >
            {this.heading || <slot name="heading" />}
            <PrefixedTagNames.pIcon
              class="icon"
              color="inherit"
              name="arrowHeadDown"
              theme={this.theme}
              aria-hidden="true"
            />
          </button>
        </PrefixedTagNames.pHeadline>
        <div
          id={contentId}
          class="collapsible"
          role="region"
          aria-labelledby={buttonId}
          ref={(el) => (this.collapsibleElement = el)}
        >
          <div class="content" ref={(el) => (this.content = el)}>
            <slot />
          </div>
        </div>
      </div>
    );
  }

  private handleButtonClick = (): void => {
    this.accordionChange.emit({ open: !this.open });
  };

  private setCollapsibleElementHeight(): void {
    setCollapsibleElementHeight(this.collapsibleElement, this.open, this.contentWrapperHeight);
  }
}
