import { Component, Element, Event, EventEmitter, Host, JSX, Prop, h } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  getScrollActivePosition,
  observeChildren,
  throwIfChildCountIsExceeded,
  throwIfChildrenAreNotOfKind,
  unobserveChildren,
} from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import type { StepChangeEvent, StepperHorizontalHostHtmlElement } from './stepper-horizontal-utils';
import {
  getIndexOfStepWithStateCurrent,
  syncItemsProps,
  throwIfMultipleCurrentStates,
} from './stepper-horizontal-utils';
import type { Theme } from '../../../../types';
import { getClickedItem } from '../../../../utils/dom/getClickedItem';
import { getScrollerElements } from '../../../common/scroller/scroller-utils';

@Component({
  tag: 'p-stepper-horizontal',
  shadow: true,
})
export class StepperHorizontal {
  @Element() public host!: StepperHorizontalHostHtmlElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when active step is changed. */
  @Event({ bubbles: false }) public stepChange: EventEmitter<StepChangeEvent>;

  private stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];
  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private scrollerElement: HTMLElement;
  private currentStepIndex: number;

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss);
    this.defineStepperHorizontalItemElements();
    // Initial validation
    this.validateComponent();

    observeChildren(this.host, () => {
      this.defineStepperHorizontalItemElements();
      // Validate when new steps are added
      this.validateComponent();
      this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);
      this.scrollIntoView();
    });
  }

  public componentWillRender(): void {
    syncItemsProps(this.host, this.theme);
  }

  public componentDidLoad(): void {
    this.defineScrollerElements();
    this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);

    this.host.stateChanged = () => {
      throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);
      this.scrollIntoView();
    };

    // Sometimes lifecycle gets called after disconnectedCallback()
    if (this.scrollAreaElement && this.prevGradientElement) {
      this.addEventListeners();

      // Initial scroll current into view
      (this.scrollerElement as HTMLPScrollerElement).scrollToPosition = {
        scrollPosition: getScrollActivePosition(
          this.stepperHorizontalItems,
          'next',
          this.currentStepIndex,
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
      <Host role="list">
        <PrefixedTagNames.pScroller theme={this.theme} ref={(el) => (this.scrollerElement = el)}>
          <div class="item-wrapper">
            <slot />
          </div>
        </PrefixedTagNames.pScroller>
      </Host>
    );
  }

  private addEventListeners = (): void => {
    this.scrollAreaElement.addEventListener('click', (e) => {
      const target = getClickedItem<HTMLPStepperHorizontalItemElement>(
        this.host,
        'pStepperHorizontalItem',
        e.composedPath()
      );

      if (target) {
        const clickedStepIndex = this.stepperHorizontalItems.indexOf(target);

        this.stepChange.emit({ activeStepIndex: clickedStepIndex });
      }
    });
  };

  private defineScrollerElements = (): void => {
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
    throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);
  };

  private scrollIntoView = (): void => {
    const newStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);
    // If state is set to undefined index is -1
    if (newStepIndex !== -1) {
      const direction = newStepIndex > this.currentStepIndex ? 'next' : 'prev';
      const scrollActivePosition = getScrollActivePosition(
        this.stepperHorizontalItems,
        direction,
        newStepIndex,
        this.scrollAreaElement.offsetWidth,
        this.prevGradientElement.offsetWidth
      );

      this.currentStepIndex = newStepIndex;

      (this.scrollerElement as HTMLPScrollerElement).scrollToPosition = {
        scrollPosition: scrollActivePosition,
        isSmooth: true,
      };
    }
  };
}
