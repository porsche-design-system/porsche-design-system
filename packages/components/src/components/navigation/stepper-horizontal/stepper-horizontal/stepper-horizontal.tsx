import { Component, Element, Event, EventEmitter, JSX, Prop, State, h } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  getScrollActivePosition,
  getScrollerElements,
  observeChildren,
  throwIfChildCountIsExceeded,
  throwIfChildrenAreNotOfKind,
} from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import type { StepChangeEvent } from './stepper-horizontal-utils';
import { getIndexOfStepWithStateCurrent } from './stepper-horizontal-utils';
import type { Theme } from '../../../../types';
import type { ScrollToPosition } from '../../../common/scroller/scroller-utils';

@Component({
  tag: 'p-stepper-horizontal',
  shadow: true,
})
export class StepperHorizontal {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when active step is changed. */
  @Event({ bubbles: false }) public stepChange: EventEmitter<StepChangeEvent>;

  @State() public stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];
  @State() private scroll: ScrollToPosition;

  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private scrollerElement: HTMLElement;

  public connectedCallback(): void {
    // Initial validation
    this.validateComponent();
    this.defineStepperHorizontalItemElements();
    observeChildren(this.host, () => {
      // Throw when new steps are added
      this.validateComponent();
      this.defineStepperHorizontalItemElements();
      this.stepperHorizontalItems.forEach((element) => element.refreshStepCounter());
    });
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();

    this.addEventListeners();

    // Initial scroll current into view
    this.scroll = {
      scrollPosition: getScrollActivePosition(
        this.stepperHorizontalItems,
        'next',
        getIndexOfStepWithStateCurrent(this.stepperHorizontalItems),
        this.scrollAreaElement.offsetWidth,
        this.prevGradientElement.offsetWidth
      ),
      isSmooth: false,
    };
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <PrefixedTagNames.pScroller
        theme={this.theme}
        ref={(el) => (this.scrollerElement = el)}
        scrollToPosition={this.scroll}
      >
        <div class="item-wrapper">
          <slot />
        </div>
      </PrefixedTagNames.pScroller>
    );
  }

  private addEventListeners = (): void => {
    this.scrollAreaElement.addEventListener('click', (e) => {
      const target = e.target as HTMLPStepperHorizontalItemElement;

      if (target.tagName !== 'DIV') {
        const currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);
        const newStepIndex = this.stepperHorizontalItems.indexOf(target);
        const prevState = (
          this.stepperHorizontalItems[currentStepIndex] as unknown as HTMLPStepperHorizontalItemElement
        ).state;

        const direction = newStepIndex > currentStepIndex ? 'next' : 'prev';
        const scrollActivePosition = getScrollActivePosition(
          this.stepperHorizontalItems,
          direction,
          newStepIndex,
          this.scrollAreaElement.offsetWidth,
          this.prevGradientElement.offsetWidth
        );

        this.scroll = { scrollPosition: scrollActivePosition, isSmooth: true };

        this.stepChange.emit({ activeStepIndex: newStepIndex, prevState, prevStepIndex: currentStepIndex });
      }
    });
  };

  private defineHTMLElements = (): void => {
    const { scrollAreaElement, prevGradientElement } = getScrollerElements(this.scrollerElement);
    this.scrollAreaElement = scrollAreaElement;
    this.prevGradientElement = prevGradientElement;
  };

  private defineStepperHorizontalItemElements = (): void => {
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };

  private validateComponent = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'pStepperHorizontalItem');
    throwIfChildCountIsExceeded(this.host, 9);
  };
}
