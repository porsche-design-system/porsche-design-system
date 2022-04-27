import { Component, Element, State, Prop, h } from '@stencil/core';
import { PrevNextButton } from './prev-next-button';
import type { Direction } from './scroller-utils';
import type { ThemeExtendedElectric } from '../../../types';
import { attachComponentCss, getHTMLElement, getHTMLElements, scrollElementTo } from '../../../utils';
// TODO: move to scroll wrapper utils
import { getScrollPositionAfterPrevNextClick, TabGradientColorTheme } from '../../navigation/tabs-bar/tabs-bar-utils';
import { getComponentCss } from './scroller-styles';

// TODO: scroll bar should be in tabs-bar only
// TODO: state handling should be inside of horizontal scroll wrapper
// TODO: role="tablist" ? maybe generic?
// TODO: better name for root class?

@Component({
  tag: 'p-scroller',
  shadow: true,
})
export class Scroller {
  @Element() public host!: HTMLElement;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: TabGradientColorTheme = 'default';

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;

  public connectedCallback(): void {
    this.setSlottedElements();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.initIntersectionObserver();
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.gradientColorScheme, this.theme);
  }

  private intersectionObserver: IntersectionObserver;
  private slottedElements: HTMLElement[] = [];
  private scrollAreaElement: HTMLElement;

  public render(): JSX.Element {
    return (
      <div class="root">
        <div class="scroll-area" role="tablist">
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
            scrollOnPrevNextClick={this.scrollOnPrevNextClick}
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
        // TODO: shouldn't root be the the scrollable div rather than the host?
        root: this.scrollAreaElement,
        // Defines the percentage of how much of the target (trigger) is visible within the element specified (this.host).
        // In his case 0.9px of the trigger have to be hidden to show the gradient
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(firstTrigger);
    this.intersectionObserver.observe(lastTrigger);
  };

  private setSlottedElements = (): void => {
    this.slottedElements = getHTMLElements(this.host, 'a,button');
  };
  private defineHTMLElements = (): void => {
    const { shadowRoot } = this.host;
    this.scrollAreaElement = getHTMLElement(shadowRoot, '.scroll-area');
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.slottedElements, this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };
}
