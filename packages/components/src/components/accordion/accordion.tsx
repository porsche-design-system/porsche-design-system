import { Component, Element, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  HEADLINE_TAGS,
  THEMES_EXTENDED_ELECTRIC,
  validateProps,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, ThemeExtendedElectric } from '../../types';
import type { HeadlineTag } from '../headline/headline-utils';
import type { AccordionChangeEvent, AccordionSize } from './accordion-utils';
import {
  ACCORDION_SIZES,
  getContentHeight,
  observeResize,
  removeResizeObserverFallback,
  resizeObserverFallback,
  setCollapsibleElementHeight,
  unobserveResize,
  useResizeObserverFallback,
  warnIfCompactAndSizeIsSet,
} from './accordion-utils';
import { getComponentCss } from './accordion-styles';

const propTypes: PropTypes<typeof Accordion> = {
  size: AllowedTypes.breakpoint<AccordionSize>(ACCORDION_SIZES),
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(THEMES_EXTENDED_ELECTRIC),
  heading: AllowedTypes.string,
  tag: AllowedTypes.oneOf<HeadlineTag>(HEADLINE_TAGS),
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
  @Prop() public theme?: ThemeExtendedElectric = 'light';

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
  private contentHeight: string;

  @Watch('open')
  public openChangeHandler(): void {
    this.setCollapsibleElementHeight();
  }

  public connectedCallback(): void {
    if (useResizeObserverFallback) {
      resizeObserverFallback(this.host, this.setContentHeight, true);
    }
  }

  public componentWillLoad(): void {
    warnIfCompactAndSizeIsSet(this.host, this.compact, this.size);
  }

  public componentDidLoad(): void {
    if (!useResizeObserverFallback) {
      observeResize(
        this.content,
        ({ contentRect }) => {
          this.contentHeight = getContentHeight(contentRect, this.compact);
          this.setCollapsibleElementHeight();
        },
        { box: 'border-box' }
      );
    }
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.compact, this.open, this.theme);
  }

  public componentDidRender(): void {
    if (useResizeObserverFallback) {
      this.contentHeight = getContentHeight(this.content.getBoundingClientRect(), this.compact);
    }
  }

  public disconnectedCallback(): void {
    if (useResizeObserverFallback) {
      removeResizeObserverFallback(this.host, true);
    } else {
      unobserveResize(this.content);
    }
  }

  public render(): JSX.Element {
    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const Heading = this.tag;

    return (
      <div class="root">
        <Heading class="heading">
          <button
            id={buttonId}
            type="button"
            aria-expanded={this.open ? 'true' : 'false'}
            aria-controls={contentId}
            onClick={this.onButtonClick}
          >
            {this.heading || <slot name="heading" />}
            <PrefixedTagNames.pIcon
              class="icon"
              color="inherit"
              name="arrowHeadDown"
              theme={this.theme}
              size="inherit"
              aria-hidden="true"
            />
          </button>
        </Heading>
        <div
          id={contentId}
          class="collapsible"
          role="region"
          aria-labelledby={buttonId}
          ref={(el) => (this.collapsibleElement = el)}
        >
          <div ref={(el) => (this.content = el)}>
            <slot />
          </div>
        </div>
      </div>
    );
  }

  private onButtonClick = (): void => {
    this.accordionChange.emit({ open: !this.open });
  };

  private setCollapsibleElementHeight(): void {
    setCollapsibleElementHeight(this.collapsibleElement, this.open, this.contentHeight);
  }

  private setContentHeight = (): void => {
    if (this.content) {
      this.contentHeight = getContentHeight(this.content.getBoundingClientRect(), this.compact);
      this.setCollapsibleElementHeight();
    }
  };
}
