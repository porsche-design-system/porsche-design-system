import { Component, Element, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getHTMLElements,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  parseJSONAttribute,
  scrollAreaClass,
  scrollElementTo,
  THEMES,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './scroller-styles';
import {
  GRADIENT_COLOR_SCHEMES,
  GRADIENT_COLORS,
  getScrollPositionAfterPrevNextClick,
  isScrollable,
  SCROLL_INDICATOR_POSITIONS,
  SCROLLER_ARIA_ATTRIBUTES,
  type ScrollerAlignScrollIndicator,
  type ScrollerAriaAttribute,
  type ScrollerDirection,
  type ScrollerGradientColor,
  type ScrollerGradientColorScheme,
  type ScrollerScrollIndicatorPosition,
  type ScrollerScrollToPosition,
} from './scroller-utils';

const propTypes: PropTypes<typeof Scroller> = {
  gradientColorScheme: AllowedTypes.oneOf<ScrollerGradientColorScheme>([undefined, ...GRADIENT_COLOR_SCHEMES]),
  gradientColor: AllowedTypes.oneOf<ScrollerGradientColor>([undefined, ...GRADIENT_COLORS]),
  scrollToPosition: AllowedTypes.shape<ScrollerScrollToPosition>({
    scrollPosition: AllowedTypes.number,
    isSmooth: AllowedTypes.boolean,
  }),
  scrollIndicatorPosition: AllowedTypes.oneOf<ScrollerScrollIndicatorPosition>([
    undefined,
    ...SCROLL_INDICATOR_POSITIONS,
  ]),
  alignScrollIndicator: AllowedTypes.oneOf<ScrollerAlignScrollIndicator>(SCROLL_INDICATOR_POSITIONS),
  scrollbar: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
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

  /**
   * @deprecated since v3.0.0, will be removed with next major release.
   * Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: ScrollerGradientColorScheme;

  /**
   * @deprecated since v3.29.0, will be removed with next major release.
   * Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColor?: ScrollerGradientColor = 'background-base';

  /** Scrolls the scroll area to the left either smooth or immediately. */
  @Prop({ mutable: true }) public scrollToPosition?: ScrollerScrollToPosition;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `alignScrollIndicator` instead.
   * Sets the vertical position of scroll indicator */
  @Prop() public scrollIndicatorPosition?: ScrollerScrollIndicatorPosition;

  /** Sets the vertical position of scroll indicator. */
  @Prop() public alignScrollIndicator?: ScrollerAlignScrollIndicator = 'center';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Specifies if scrollbar should be shown. */
  @Prop() public scrollbar?: boolean = false;

  /** Add ARIA role. */
  @Prop() public aria?: SelectedAriaAttributes<ScrollerAriaAttribute>;

  @State() private isPrevHidden = true;
  @State() private isNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;

  @Watch('scrollToPosition')
  public scrollToPositionHandler(): void {
    // TODO: does this.scrollToPosition already have the new value? or why aren't we using the first parameter of this function
    this.scrollToPosition = parseJSONAttribute(this.scrollToPosition);

    // watcher might trigger before ref is defined with ssr
    if (this.scrollAreaElement) {
      const { scrollPosition, isSmooth } = this.scrollToPosition;
      if (isSmooth) {
        scrollElementTo(this.scrollAreaElement, scrollPosition);
      } else {
        this.scrollAreaElement.scrollLeft = scrollPosition;
      }
    }
  }

  public connectedCallback(): void {
    if (this.scrollAreaElement) {
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
      !(propName === 'scrollToPosition' && !isScrollable(this.isNextHidden, this.isPrevHidden)) && // should only update if scrollable
      hasPropValueChanged(newVal, oldVal)
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Scroller>(this, 'gradientColorScheme', 'Please use gradientColor prop instead.');
    warnIfDeprecatedPropIsUsed<typeof Scroller>(
      this,
      'gradientColor',
      'Prop can be omitted, gradient handling is managed internally.'
    );
    warnIfDeprecatedPropIsUsed<typeof Scroller>(
      this,
      'scrollIndicatorPosition',
      'Please use alignScrollIndicator prop instead.'
    );
    const deprecationMap: Record<ScrollerGradientColorScheme, ScrollerGradientColor> = {
      default: 'background-base',
      surface: 'background-surface',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Scroller, ScrollerGradientColorScheme, ScrollerGradientColor>(
      this,
      'gradientColorScheme',
      deprecationMap
    );
    attachComponentCss(
      this.host,
      getComponentCss,
      this.isNextHidden,
      this.isPrevHidden,
      this.scrollIndicatorPosition || this.alignScrollIndicator,
      this.scrollbar,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const renderPrevNextButton = (direction: ScrollerDirection): JSX.Element => {
      return (
        <div key={direction} class={direction === 'next' ? 'action-next' : 'action-prev'}>
          <PrefixedTagNames.pButton
            class="action-button"
            variant="ghost"
            hide-label="true"
            icon={direction === 'next' ? 'arrow-head-right' : 'arrow-head-left'}
            type="button"
            tabIndex={-1}
            onClick={() => this.scrollOnPrevNextClick(direction)}
            theme={this.theme}
            dir="ltr" // Otherwise icon will be flipped which doesn't make sense in this use case
          >
            {direction}
          </PrefixedTagNames.pButton>
        </div>
      );
    };

    return (
      <div class="root">
        <div class={scrollAreaClass} ref={(el) => (this.scrollAreaElement = el)}>
          <div
            class="scroll-wrapper"
            role={(parseAndGetAriaAttributes(this.aria) as any)?.role || null}
            tabIndex={isScrollable(this.isPrevHidden, this.isNextHidden) ? 0 : null}
          >
            <slot />
            <div class="trigger" />
            <div class="trigger" />
          </div>
        </div>
        {(['prev', 'next'] satisfies ScrollerDirection[]).map(renderPrevNextButton)}
      </div>
    );
  }

  private initIntersectionObserver = (): void => {
    const [firstTrigger, lastTrigger] = getHTMLElements(this.host.shadowRoot, '.trigger');

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (target === firstTrigger) {
            this.isPrevHidden = isIntersecting;
          } else if (target === lastTrigger) {
            this.isNextHidden = isIntersecting;
          }
        }
      },
      {
        root: this.scrollAreaElement,
        // Defines the percentage of how much of the target (trigger) is visible within the element specified (this.host).
        // In this case 0.9px of the trigger have to be hidden to show the gradient
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(firstTrigger);
    this.intersectionObserver.observe(lastTrigger);
  };

  private scrollOnPrevNextClick = (direction: ScrollerDirection): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };
}
