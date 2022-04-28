import { Component, Element, State, Prop, Watch, h } from '@stencil/core';
import { PrevNextButton } from './prev-next-button';
import type { Direction } from './scroller-utils';
import type { ThemeExtendedElectric } from '../../../types';
import {
  attachComponentCss,
  getHTMLElement,
  getHTMLElements,
  getPrefixedTagNames,
  getTagName,
  scrollElementTo,
} from '../../../utils';
// TODO: move to scroll wrapper utils
import {
  getScrollActivePosition,
  getScrollPositionAfterPrevNextClick,
  TabGradientColorTheme,
} from '../../navigation/tabs-bar/tabs-bar-utils';
import { getComponentCss } from './scroller-styles';

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

  /** Defines which element to be visualized as selected (zero-based numbering). */
  @Prop() public activeElementIndex?: number;

  /** Elements that are not set in the slot can be passed here **/
  @Prop() public slottedElements?: HTMLElement[];

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private direction: Direction = 'next';
  private prevActiveElement: number;
  private hasTabsBarParent: boolean = false;

  @Watch('activeElementIndex')
  public activeTabHandler(_newValue: number, oldValue: number): void {
    this.prevActiveElement = oldValue;
    this.direction = this.activeElementIndex > this.prevActiveElement ? 'next' : 'prev';

    this.scrollActiveElementIntoView();
  }

  public connectedCallback(): void {
    // TODO: move this into utility!
    const { host } = this.host.getRootNode() as ShadowRoot;
    const parentTagName = host && getTagName(host as HTMLElement);
    this.hasTabsBarParent = parentTagName === getPrefixedTagNames(this.host).pTabsBar;

    if (!this.slottedElements) {
      this.slottedElements = this.host.children as any;
    }
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.initIntersectionObserver();

    // TODO: validation of active element index inside of tabs bar!

    if (!(this.direction === 'next' && this.activeElementIndex === undefined)) {
      // skip scrolling on first render when no activeTabIndex is set
      this.scrollActiveElementIntoView(true);
    }
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.gradientColorScheme, this.hasTabsBarParent, this.theme);
  }

  public render(): JSX.Element {
    // TODO: role="tablist" ? maybe generic?
    // TODO: better name for root class?
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

  private defineHTMLElements = (): void => {
    const { shadowRoot } = this.host;
    this.scrollAreaElement = getHTMLElement(shadowRoot, '.scroll-area');
    this.prevGradientElement = getHTMLElement(shadowRoot, '.gradient');
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.slottedElements, this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };

  private scrollActiveElementIntoView = (skipAnimation?: boolean): void => {
    // scrollAreaElement might be undefined in certain scenarios with framework routing involved
    // where the watcher triggers this function way before componentDidLoad calls defineHTMLElements
    if (!this.scrollAreaElement) {
      return;
    }

    const scrollActivePosition = getScrollActivePosition(
      this.slottedElements,
      this.direction,
      this.activeElementIndex,
      this.scrollAreaElement.offsetWidth,
      this.prevGradientElement.offsetWidth
    );

    if (skipAnimation) {
      this.scrollAreaElement.scrollLeft = scrollActivePosition;
    } else {
      scrollElementTo(this.scrollAreaElement, scrollActivePosition);
    }
  };
}
