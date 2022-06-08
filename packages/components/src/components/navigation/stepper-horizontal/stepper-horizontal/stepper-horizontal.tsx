import { Component, Element, Event, EventEmitter, JSX, Prop, State, h } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  getScrollActivePosition,
  getScrollerElements,
  observeChildren,
  observeProperties,
  throwIfChildCountIsExceeded,
  throwIfChildrenAreNotOfKind,
  unobserveChildren,
} from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import type { StepChangeEvent } from './stepper-horizontal-utils';
import { getIndexOfStepWithStateCurrent, throwIfMultipleCurrentStates } from './stepper-horizontal-utils';
import type { Theme } from '../../../../types';

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

  @State() private stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];

  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private scrollerElement: HTMLElement;

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss);
    // Initial validation
    this.validateComponent();
    this.defineStepperHorizontalItemElements();
    this.observeProperties();
    observeChildren(this.host as HTMLPStepperHorizontalItemElement, () => {
      // Throw when new steps are added
      this.validateComponent();
      throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);
      this.defineStepperHorizontalItemElements();
      this.observeProperties();
    });
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);

    // Sometimes lifecycle gets called after disconnectedCallback()
    if (this.scrollAreaElement && this.prevGradientElement) {
      this.addEventListeners();

      // Initial scroll current into view
      (this.scrollerElement as HTMLPScrollerElement).scrollToPosition = {
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
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <PrefixedTagNames.pScroller theme={this.theme} ref={(el) => (this.scrollerElement = el)}>
        <div class="item-wrapper">
          <slot />
        </div>
      </PrefixedTagNames.pScroller>
    );
  }

  private addEventListeners = (): void => {
    this.scrollAreaElement.addEventListener('click', (e) => {
      const target = e.target as HTMLPStepperHorizontalItemElement;

      // Click in between steps should not do anything
      if (target.tagName !== 'DIV') {
        const newStepIndex = this.stepperHorizontalItems.indexOf(target);
        this.scrollIntoView(newStepIndex);

        this.stepChange.emit({ activeStepIndex: newStepIndex });
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

  private scrollIntoView = (newStepIndex: number): void => {
    const currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);

    const direction = newStepIndex > currentStepIndex ? 'next' : 'prev';
    const scrollActivePosition = getScrollActivePosition(
      this.stepperHorizontalItems,
      direction,
      newStepIndex,
      this.scrollAreaElement.offsetWidth,
      this.prevGradientElement.offsetWidth
    );

    (this.scrollerElement as HTMLPScrollerElement).scrollToPosition = {
      scrollPosition: scrollActivePosition,
      isSmooth: true,
    };
  };

  private observeProperties = (): void => {
    this.stepperHorizontalItems.forEach((el) =>
      observeProperties(el, ['state'], () => {
        const newStepIndex = this.stepperHorizontalItems.findIndex((item) => item.state === 'current');
        this.scrollIntoView(newStepIndex);
      })
    );
  };
}
