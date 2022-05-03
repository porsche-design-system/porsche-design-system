import { Component, Element, State, Prop, Watch, Event, h, EventEmitter } from '@stencil/core';
import { PrevNextButton } from './prev-next-button';
import {
  attachComponentCss,
  getHTMLElement,
  getHTMLElements,
  isParentOfKind,
  observeChildren,
  scrollElementTo,
  unobserveChildren,
} from '../../../utils';
import { getComponentCss } from './scroller-styles';
import { getScrollActivePosition, getScrollPositionAfterPrevNextClick } from './scroller-utils';
import type { ActiveElementChange, Direction, GradientColorTheme } from './scroller-utils';
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

  /** Defines which element to be visualized as selected (zero-based numbering). */
  @Prop() public activeElementIndex?: number;

  /** Elements that are not set in the slot can be passed here **/
  @Prop() public slottedElements?: HTMLElement[];

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public activeElementChange: EventEmitter<ActiveElementChange>;

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;
  @State() private scrollItems: HTMLElement[];

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private direction: Direction = 'next';
  private prevActiveElement: number;
  private hasTabsBarParent = false;

  @Watch('activeElementIndex')
  public activeElementHandler(_newValue: number, oldValue: number): void {
    this.prevActiveElement = oldValue;
    this.direction = this.activeElementIndex > this.prevActiveElement ? 'next' : 'prev';

    this.scrollActiveElementIntoView();
  }

  public connectedCallback(): void {
    this.hasTabsBarParent = isParentOfKind(this.host, 'pTabsBar', true);
    this.setScrollItems();
    if (!this.slottedElements) {
      this.initMutationObserver();
    }
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.initIntersectionObserver();
    this.scrollAreaElement.addEventListener('click', (e) => {
      const newTabIndex = this.scrollItems.indexOf(e.target as HTMLElement);
      if (newTabIndex >= 0) {
        this.onElementClick(newTabIndex);
      }
    });

    // TODO: validation of active element index inside of tabs bar!

    if (!(this.direction === 'next' && this.activeElementIndex === undefined)) {
      // skip scrolling on first render when no activeTabIndex is set
      this.scrollActiveElementIntoView(true);
    }
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.gradientColorScheme, this.hasTabsBarParent, this.theme);
  }

  public componentWillUpdate(): void {
    this.setScrollItems();
  }

  public disconnectedCallback(): void {
    if (!this.slottedElements) {
      unobserveChildren(this.host);
    }
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
    this.prevGradientElement = getHTMLElement(shadowRoot, '.gradient');
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.scrollItems, this.scrollAreaElement, direction);
    scrollElementTo(this.scrollAreaElement, scrollPosition);
  };

  private scrollActiveElementIntoView = (skipAnimation?: boolean): void => {
    // scrollAreaElement might be undefined in certain scenarios with framework routing involved
    // where the watcher triggers this function way before componentDidLoad calls defineHTMLElements
    if (!this.scrollAreaElement) {
      return;
    }

    const scrollActivePosition = getScrollActivePosition(
      this.scrollItems,
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

  private onElementClick = (newElementIndex: number): void => {
    this.activeElementChange.emit({ activeElementIndex: newElementIndex });
  };

  private initMutationObserver = (): void => {
    observeChildren(this.host, () => {
      this.setScrollItems();
    });
  };

  private setScrollItems = (): void => {
    this.scrollItems = this.slottedElements ? this.slottedElements : (Array.from(this.host.children) as HTMLElement[]);
  };
}
