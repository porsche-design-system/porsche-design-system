import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import {
  getPrefixedTagNames,
  insertSlottedStyles,
  isDark,
  mapBreakpointPropToClasses,
  observeResize,
  pxToRem,
  unobserveResize,
} from '../../../utils';
import type { BreakpointCustomizable, Theme } from '../../../types';
import type { HeadlineTag } from '../../basic/typography/headline/headline-utils';
import type { AccordionChangeEvent, AccordionSize } from './accordion-utils';
import { getSlottedCss } from './accordion-utils';

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

  /** Displays the Accordion as compact version with thinner border and smaller paddings */
  @Prop() public compact?: boolean;

  /** Emitted when accordion state is changed. */
  @Event({ bubbles: false }) public accordionChange: EventEmitter<AccordionChangeEvent>;

  private collapsibleElement: HTMLDivElement;
  private contentWrapper: HTMLDivElement;
  private contentWrapperHeight: string;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    if (isOpen) {
      this.collapsibleElement.style.height = this.contentWrapperHeight;
    } else {
      this.collapsibleElement.style.height = '0';
    }
  }

  public connectedCallback(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
  }

  public componentDidLoad(): void {
    observeResize(
      this.contentWrapper,
      ({ borderBoxSize }) => {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBorderBoxSize = Array.isArray(borderBoxSize) ? borderBoxSize[0] : borderBoxSize;

        // when content is wider than the accordion we get a vertical scrollbar, which takes some space away from the content
        // thus this size needs to be added to the contentWrapperHeight
        const scrollBarHeight: number = this.collapsibleElement.offsetHeight - this.collapsibleElement.clientHeight;
        const blockSize: number = contentBorderBoxSize.blockSize;

        this.contentWrapperHeight = `${pxToRem(blockSize + scrollBarHeight)}rem`;
        if (this.open) {
          this.collapsibleElement.style.height = this.contentWrapperHeight;
        }
      },
      { box: 'border-box' }
    );
  }

  public disconnectedCallback(): void {
    unobserveResize(this.contentWrapper);
  }

  public render(): JSX.Element {
    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--open']: this.open,
      ...(!this.compact && { ...mapBreakpointPropToClasses('root--size', this.size) }),
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
          <div class="content-wrapper" ref={(el) => (this.contentWrapper = el)}>
            <slot />
          </div>
        </div>
      </div>
    );
  }

  private handleButtonClick = (): void => {
    this.accordionChange.emit({ open: !this.open });
  };
}
