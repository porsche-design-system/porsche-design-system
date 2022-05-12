import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { PrevNextButton } from './prev-next-button';
import { attachComponentCss, getHTMLElements, scrollElementTo } from '../../../utils';
import { getComponentCss } from './scroller-styles';
import type { Direction, GradientColorTheme, ScrollToPosition, PrevNextButtonJssStyle } from './scroller-utils';
import { getScrollPositionAfterPrevNextClick } from './scroller-utils';
import type { ThemeExtendedElectric } from '../../../types';

@Component({
  tag: 'p-scroller',
  shadow: true,
})
export class Scroller {
  @Element() public host!: HTMLElement;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: GradientColorTheme = 'default';

  /** Scrolls the scroll area to the left either smooth or immediately */
  @Prop() public scrollToPosition?: ScrollToPosition;

  // TODO: remove this property from generated readme and types
  @Prop() public prevNextButtonJssStyle?: PrevNextButtonJssStyle;

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;

  @Watch('scrollToPosition')
  public scrollToPositionHandler({ scrollPosition, isSmooth }: ScrollToPosition): void {
    if (isSmooth) {
      scrollElementTo(this.scrollAreaElement, scrollPosition);
    } else {
      this.scrollAreaElement.scrollLeft = scrollPosition;
    }
  }

  public componentDidLoad(): void {
    this.initIntersectionObserver();
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.gradientColorScheme, this.theme, this.prevNextButtonJssStyle);
  }

  public render(): JSX.Element {
    return (
      <div class="root">
        <div class="scroll-area" ref={(el) => (this.scrollAreaElement = el)}>
          <div class="scroll-wrapper">
            <slot />
            <div class="trigger" />
            <div class="trigger" />
          </div>
        </div>
        {['prev', 'next'].map((direction: Direction) => (
          <PrevNextButton
            host={this.host}
            direction={direction}
            isHidden={direction === 'next' ? this.isNextHidden : this.isPrevHidden}
            onPrevNextClick={() => this.scrollOnPrevNextClick(direction)}
            theme={this.theme}
          />
        ))}
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

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };
}
