import { Component, Element, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, parseJSONAttribute, validateProps } from '../../utils';
import { getComponentCss } from './scroller-styles';
import {
  isScrollable,
  SCROLLER_ALIGN_SCROLL_INDICATORS,
  SCROLLER_ARIA_ATTRIBUTES,
  type ScrollerAlignScrollIndicator,
  type ScrollerAriaAttribute,
  type ScrollerDirection,
  type ScrollerScrollToPosition,
} from './scroller-utils';

const propTypes: PropTypes<typeof Scroller> = {
  sticky: AllowedTypes.boolean,
  compact: AllowedTypes.boolean,
  scrollbar: AllowedTypes.boolean,
  aria: AllowedTypes.aria<ScrollerAriaAttribute>(SCROLLER_ARIA_ATTRIBUTES),
  scrollToPosition: AllowedTypes.shape<ScrollerScrollToPosition>({
    scrollPosition: AllowedTypes.number,
    isSmooth: AllowedTypes.boolean,
  }),
  alignScrollIndicator: AllowedTypes.oneOf<ScrollerAlignScrollIndicator>(SCROLLER_ALIGN_SCROLL_INDICATORS),
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

  /** Specifies if scrollbar should be shown. */
  @Prop() public scrollbar?: boolean = false;

  /** Displays in compact mode. */
  @Prop() public compact?: boolean;

  /** Add ARIA role. */
  @Prop() public aria?: SelectedAriaAttributes<ScrollerAriaAttribute>;

  /**
   * @experimental Makes the indicator sticky at the top or bottom while scrolling depending on the scroll direction.
   */
  @Prop() public sticky?: boolean = false;

  /** @deprecated since v4.0.0, will be removed with next major release, has no effect anymore. */
  @Prop() public alignScrollIndicator?: ScrollerAlignScrollIndicator = 'center';

  /** @deprecated since v4.0.0, use native `scrollIntoView()` on the slotted element itself. */
  @Prop({ mutable: true }) public scrollToPosition?: ScrollerScrollToPosition;

  @State() private isIndicatorPrevHidden = true;
  @State() private isIndicatorNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private scrollArea: HTMLElement;
  private sentinelLeft: HTMLElement;
  private sentinelRight: HTMLElement;

  @Watch('scrollToPosition')
  public scrollToPositionHandler(): void {
    // TODO: does this.scrollToPosition already have the new value? or why aren't we using the first parameter of this function
    this.scrollToPosition = parseJSONAttribute(this.scrollToPosition);

    // watcher might trigger before ref is defined with ssr
    if (this.scrollArea) {
      const { scrollPosition, isSmooth } = this.scrollToPosition;
      this.scrollArea.scrollTo({ left: scrollPosition, behavior: isSmooth ? 'smooth' : 'instant' });
    }
  }

  public connectedCallback(): void {
    if (this.scrollArea) {
      this.scrollToPosition = parseJSONAttribute(this.scrollToPosition);
    }
  }

  public componentDidLoad(): void {
    this.initIntersectionObserver();
    if (this.scrollToPosition) {
      this.scrollToPositionHandler();
    }
  }

  public componentShouldUpdate(
    newVal: unknown,
    oldVal: unknown,
    propName: keyof InstanceType<typeof Scroller>
  ): boolean {
    return (
      !(propName === 'scrollToPosition' && !isScrollable(this.isIndicatorNextHidden, this.isIndicatorPrevHidden)) && // should only update if scrollable
      hasPropValueChanged(newVal, oldVal)
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.isIndicatorPrevHidden,
      this.isIndicatorNextHidden,
      this.sticky,
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
