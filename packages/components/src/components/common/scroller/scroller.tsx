import { Component, Element, State, Prop, Watch, Event, EventEmitter, h } from '@stencil/core';
import { PrevNextButton } from './prev-next-button';
import type { Direction } from './scroller-utils';
import type { ThemeExtendedElectric } from '../../../types';
import { attachComponentCss, getHTMLElement, getHTMLElements, scrollElementTo } from '../../../utils';
// TODO: move to scroll wrapper utils
import {
  getScrollActivePosition,
  getScrollPositionAfterPrevNextClick,
  TabGradientColorTheme,
} from '../../navigation/tabs-bar/tabs-bar-utils';
import { getComponentCss } from './scroller-styles';
import { ActiveElementChangeEvent } from './scroller-utils';

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

  /** Defines which element to be visualized as selected (zero-based numbering). */
  @Prop() public activeElementIndex?: number;

  /** Emitted when active element is changed. */
  @Event({ bubbles: false }) public activeElementChange: EventEmitter<ActiveElementChangeEvent>;

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;

  private intersectionObserver: IntersectionObserver;
  private slottedElements: HTMLElement[] = [];
  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private direction: Direction = 'next';
  private prevActiveElement: number;
  private parentHost: HTMLElement;

  // TODO: extract and unit test!
  private get focusedElementIndex(): number {
    // TODO: this sucks
    if (document?.activeElement.tagName === 'P-TABS') {
      return this.activeElementIndex;
    }
    const indexOfActiveElement = this.slottedElements.indexOf(document?.activeElement as HTMLElement);
    return indexOfActiveElement < 0 ? 0 : indexOfActiveElement;
  }

  @Watch('activeElementIndex')
  public activeTabHandler(_newValue: number, oldValue: number): void {
    this.prevActiveElement = oldValue;
    this.direction = this.activeElementIndex > this.prevActiveElement ? 'next' : 'prev';

    this.scrollActiveElementIntoView();
  }

  public connectedCallback(): void {
    this.setSlottedElements();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.initIntersectionObserver();

    // TODO: validation of active element index inside of tabs bar!

    if (!(this.direction === 'next' && this.activeElementIndex === undefined)) {
      // skip scrolling on first render when no activeTabIndex is set
      this.scrollActiveElementIntoView(true);
    }

    this.scrollAreaElement.addEventListener('click', (e) => {
      const newTabIndex = this.slottedElements.indexOf(e.target as HTMLElement);
      if (newTabIndex >= 0) {
        this.onElementClick(newTabIndex, true);
      }
    });
    this.scrollAreaElement.addEventListener('keydown', this.onKeydown);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.gradientColorScheme, this.theme);
  }

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

  private setSlottedElements = (): void => {
    this.parentHost = (this.host.parentNode as any).host;
    // TODO: find a generic selector? This works only if used internally and not solo
    this.slottedElements = getHTMLElements(this.parentHost, 'a,button');
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

  private onElementClick = (activeElementIndex: number, isEnter: boolean): void => {
    this.activeElementChange.emit({ activeElementIndex, isEnter });
  };

  private onKeydown = (e: KeyboardEvent): void => {
    let upcomingFocusedElementIndex: number;
    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        upcomingFocusedElementIndex = this.getPrevNextTabIndex('prev');
        break;

      case 'ArrowRight':
      case 'Right':
        upcomingFocusedElementIndex = this.getPrevNextTabIndex('next');
        break;

      case 'Home':
        upcomingFocusedElementIndex = 0;
        break;

      case 'End':
        upcomingFocusedElementIndex = this.slottedElements.length - 1;
        break;

      case 'Enter':
        this.onElementClick(this.focusedElementIndex, true);
        return;

      default:
        return;
    }

    this.onElementClick(upcomingFocusedElementIndex, false);
    this.slottedElements[upcomingFocusedElementIndex].focus();

    e.preventDefault();
  };

  // TODO: should be pure function and unit tested
  private getPrevNextTabIndex = (direction: Direction): number => {
    const slottedElementsLength = this.slottedElements.length;
    const newTabIndex = this.focusedElementIndex + (direction === 'next' ? 1 : -1);

    return (newTabIndex + slottedElementsLength) % slottedElementsLength;
  };
}
