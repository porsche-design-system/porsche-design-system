import { Component, Element, Event, EventEmitter, Prop, h, Watch } from '@stencil/core';
import { getPrefixedTagNames, insertSlottedStyles, isDark, mapBreakpointPropToClasses, pxToRem } from '../../../utils';
import type { BreakpointCustomizable, Theme } from '../../../types';
import type { HeadlineTag } from '../../basic/typography/headline/headline-utils';
import type { AccordionChangeEvent, AccordionSize, AccordionWeight } from './accordion-utils';
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

  private collapsibleElement: HTMLDivElement;
  private contentWrapper: HTMLDivElement;
  private contentResizeObserver: ResizeObserver;
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
    this.initResizeObserver();
  }

  public disconnectedCallback(): void {
    this.contentResizeObserver.disconnect();
  }

  public render(): JSX.Element {
    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

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
        <PrefixedTagNames.pHeadline tag={this.tag} theme={this.theme} variant="inherit">
          <button
            id={buttonId}
            type="button"
            aria-expanded={this.open}
            aria-controls={contentId}
            onClick={this.handleButtonClick}
          >
            {this.heading || <slot name="heading" />}
            <PrefixedTagNames.pIcon class="icon" name="arrowHeadDown" theme={this.theme} aria-hidden="true" />
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

  private initResizeObserver = (): void => {
    this.contentResizeObserver = new ResizeObserver((entries) => {
      for (const {
        contentRect: { height },
      } of entries) {
        const CONTENT_WRAPPER_PADDING = 8;
        this.contentWrapperHeight = `${pxToRem(height + CONTENT_WRAPPER_PADDING)}rem`;
        if (this.open) {
          this.collapsibleElement.style.height = this.contentWrapperHeight;
        }
      }
    });
    this.contentResizeObserver.observe(this.contentWrapper);
  };
}
