import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import { getPrefixedTagNames, isDark, isLightElectric, mapBreakpointPropToClasses } from '../../../utils';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import type { HeadlineTag } from '../../basic/typography/headline/headline-utils';
import type { AccordionChangeEvent, AccordionSize } from './accordion-utils';
import {
  getContentHeight,
  mutationObserverFallback,
  observeResize,
  removeMutationObserverFallback,
  setCollapsibleElementHeight,
  unobserveResize,
  useMutationObserverFallback,
  warnIfCompactAndSizeIsSet,
} from './accordion-utils';

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
    if (useMutationObserverFallback) {
      mutationObserverFallback(this);
    }
  }

  public componentWillLoad(): void {
    warnIfCompactAndSizeIsSet(this.host, this.compact, this.size);
  }

  public componentDidLoad(): void {
    if (!useMutationObserverFallback) {
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

  public componentDidRender(): void {
    if (useMutationObserverFallback) {
      this.contentHeight = getContentHeight(this.content.getBoundingClientRect(), this.compact);
    }
  }

  public disconnectedCallback(): void {
    if (useMutationObserverFallback) {
      removeMutationObserverFallback(this);
    } else {
      unobserveResize(this.content);
    }
  }

  public setContentHeight = (): void => {
    if (this.content) {
      this.contentHeight = getContentHeight(this.content.getBoundingClientRect(), this.compact);
      this.setCollapsibleElementHeight();
    }
  };

  public render(): JSX.Element {
    const buttonId = 'accordion-control';
    const contentId = 'accordion-panel';

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--theme-light-electric']: isLightElectric(this.theme),
      ['root--open']: this.open,
      ...(!this.compact && mapBreakpointPropToClasses('root--size', this.size)),
      ['root--compact']: this.compact,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const Heading = this.tag;

    return (
      <div class={rootClasses}>
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
}
