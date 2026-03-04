import { Component, Element, h, type JSX, Method, Prop, State } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, validateProps } from '../../utils';
import { getComponentCss } from './scroller-styles';
import {
  SCROLLER_ARIA_ATTRIBUTES,
  SCROLLER_INDICATOR_POSITIONS,
  type ScrollerAriaAttribute,
  type ScrollerDirection,
  type ScrollerIndicatorPosition,
} from './scroller-utils';

const propTypes: PropTypes<typeof Scroller> = {
  indicatorPosition: AllowedTypes.oneOf<ScrollerIndicatorPosition>(SCROLLER_INDICATOR_POSITIONS),
  indicatorSticky: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  scrollbar: AllowedTypes.boolean,
  aria: AllowedTypes.aria<ScrollerAriaAttribute>(SCROLLER_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot for the scroller content." }
 */
@Component({
  tag: 'p-scroller',
  shadow: true,
})
export class Scroller {
  @Element() public host!: HTMLElement;

  /** Sets the vertical position of scroll indicator. */
  @Prop() public indicatorPosition?: ScrollerIndicatorPosition = 'center';

  /**
   * @experimental Makes the indicator sticky at the top while scrolling.
   */
  @Prop() public indicatorSticky?: boolean = false;

  /** Specifies if scrollbar should be shown. */
  @Prop() public scrollbar?: boolean = false;

  /** Displays in compact mode. */
  @Prop() public compact?: boolean;

  /** Add ARIA role. */
  @Prop() public aria?: SelectedAriaAttributes<ScrollerAriaAttribute>;

  @Method()
  async scrollTo(options: ScrollToOptions): Promise<void> {
    this.scrollArea?.scrollTo(options);
  }

  @Method()
  async scrollBy(options: ScrollToOptions): Promise<void> {
    this.scrollArea?.scrollBy(options);
  }

  @State() private isIndicatorPrevHidden = true;
  @State() private isIndicatorNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private scrollArea: HTMLElement;
  private sentinelLeft: HTMLElement;
  private sentinelRight: HTMLElement;

  public componentDidLoad(): void {
    this.initIntersectionObserver();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.isIndicatorPrevHidden,
      this.isIndicatorNextHidden,
      this.indicatorPosition,
      this.indicatorSticky,
      this.scrollbar,
      this.compact
    );

    return (
      <div class="root">
        {/** biome-ignore lint/a11y/noStaticElementInteractions: mainly a visual scroll indicator, a11y compliance is given by native scroll container */}
        <span class="prev" onClick={() => this.scroll('prev')} />
        {/** biome-ignore lint/a11y/noStaticElementInteractions: mainly a visual scroll indicator, a11y compliance is given by native scroll container */}
        <span class="next" onClick={() => this.scroll('next')} />
        <div
          class="scroll"
          ref={(el) => (this.scrollArea = el)}
          tabIndex={this.isIndicatorPrevHidden && this.isIndicatorNextHidden ? null : 0}
        >
          <span class="sentinel" ref={(el) => (this.sentinelLeft = el)} />
          <slot />
          <span class="sentinel" ref={(el) => (this.sentinelRight = el)} />
        </div>
      </div>
    );
  }

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (target === this.sentinelLeft) {
            this.isIndicatorPrevHidden = isIntersecting;
          } else if (target === this.sentinelRight) {
            this.isIndicatorNextHidden = isIntersecting;
          }
        }
      },
      {
        root: this.scrollArea,
        // Defines the percentage of how much of the target (sentinel) is visible within the element specified (this.host).
        // In this case 0.9px of the trigger have to be hidden to show the gradient
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(this.sentinelLeft);
    this.intersectionObserver.observe(this.sentinelRight);
  };

  private scroll = (direction: ScrollerDirection): void => {
    const left = this.scrollArea.offsetWidth * 0.5;
    this.scrollArea?.scrollBy({
      left: direction === 'prev' ? -left : left,
      behavior: 'smooth',
    });
  };
}
