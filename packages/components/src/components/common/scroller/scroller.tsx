import { Component, Element, Prop, State, h, Watch } from '@stencil/core';
import { PrevNextButton } from './prev-next-button';
import { attachComponentCss, getHTMLElement, getHTMLElements, scrollElementTo } from '../../../utils';
import { getComponentCss } from './scroller-styles';
import { getScrollPositionAfterPrevNextClick } from './scroller-utils';
import type { Direction, GradientColorTheme, ScrollToPosition } from './scroller-utils';
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

  // TODO: description
  /** If set, it will scroll */
  @Prop() public scrollToPosition?: ScrollToPosition;

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;

  @Watch('scrollToPosition')
  public scrollToPositionHandler({ scrollPosition, skipAnimation }: ScrollToPosition): void {
    console.log('-> scrollPosition, skipAnimation', scrollPosition, skipAnimation);

    if (skipAnimation) {
      this.scrollAreaElement.scrollLeft = scrollPosition;
    } else {
      scrollElementTo(this.scrollAreaElement, scrollPosition);
    }
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.initIntersectionObserver();
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.gradientColorScheme, this.theme);
  }

  public render(): JSX.Element {
    return (
      <div class="root">
        <div class="scroll-area" tabindex="0">
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
            scrollOnPrevNextClick={() => this.scrollOnPrevNextClick(direction)}
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
        // In his case 0.9px of the trigger have to be hidden to show the gradient
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(firstTrigger);
    this.intersectionObserver.observe(lastTrigger);
  };

  private defineHTMLElements = (): void => {
    const { shadowRoot } = this.host;
    this.scrollAreaElement = getHTMLElement(shadowRoot, '.scroll-area');
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };
}
