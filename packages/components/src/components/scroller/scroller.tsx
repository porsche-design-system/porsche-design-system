import { Component, Element, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../types';
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
  validateProps,
} from '../../utils';
import { getComponentCss } from './scroller-styles';
import {
  getScrollPositionAfterPrevNextClick,
  isScrollable,
  SCROLL_INDICATOR_POSITIONS,
  SCROLLER_ARIA_ATTRIBUTES,
  type ScrollerAlignScrollIndicator,
  type ScrollerAriaAttribute,
  type ScrollerDirection,
  type ScrollerScrollToPosition,
} from './scroller-utils';

const propTypes: PropTypes<typeof Scroller> = {
  scrollToPosition: AllowedTypes.shape<ScrollerScrollToPosition>({
    scrollPosition: AllowedTypes.number,
    isSmooth: AllowedTypes.boolean,
  }),
  alignScrollIndicator: AllowedTypes.oneOf<ScrollerAlignScrollIndicator>(SCROLL_INDICATOR_POSITIONS),
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

  /** Scrolls the scroll area to the left either smooth or immediately. */
  @Prop({ mutable: true }) public scrollToPosition?: ScrollerScrollToPosition;

  /** Sets the vertical position of scroll indicator. */
  @Prop() public alignScrollIndicator?: ScrollerAlignScrollIndicator = 'center';

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
    attachComponentCss(
      this.host,
      getComponentCss,
      this.isNextHidden,
      this.isPrevHidden,
      this.alignScrollIndicator,
      this.scrollbar
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const renderPrevNextButton = (direction: ScrollerDirection): JSX.Element => {
      return (
        <div key={direction} class={direction === 'next' ? 'action-next' : 'action-prev'}>
          <PrefixedTagNames.pButton
            class="action-button"
            variant="secondary"
            hide-label="true"
            icon={direction === 'next' ? 'arrow-head-right' : 'arrow-head-left'}
            type="button"
            tabIndex={-1}
            onClick={() => this.scrollOnPrevNextClick(direction)}
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
