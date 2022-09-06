import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import type { PropTypes, Theme } from '../../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getScrollActivePosition,
  observeBreakpointChange,
  observeChildren,
  parseJSON,
  THEMES,
  throwIfChildCountIsExceeded,
  throwIfChildrenAreNotOfKind,
  unobserveBreakpointChange,
  unobserveChildren,
  validateProps,
} from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import type { StepChangeEvent, StepperHorizontalSize } from './stepper-horizontal-utils';
import {
  getIndexOfStepWithStateCurrent,
  STEPPER_HORIZONTAL_SIZES,
  syncItemsProps,
  throwIfMultipleCurrentStates,
} from './stepper-horizontal-utils';
import { getClickedItem } from '../../../../utils/dom/getClickedItem';
import { getScrollerElements } from '../../../common/scroller/scroller-utils';
import type { BreakpointCustomizable } from '../../../../types';

const propTypes: PropTypes<typeof StepperHorizontal> = {
  size: AllowedTypes.breakpoint<StepperHorizontalSize>(STEPPER_HORIZONTAL_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-stepper-horizontal',
  shadow: true,
})
export class StepperHorizontal {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<StepperHorizontalSize> = 'small';

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
    attachComponentCss(this.host, getComponentCss, this.size);
    this.defineStepperHorizontalItemElements();

    observeChildren(this.host, () => {
      this.defineStepperHorizontalItemElements();
      // Validate when new steps are added
      this.validateComponent();
      this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);
      this.scrollIntoView();
    });

    this.observeBreakpointChange();
  }

  public componentWillLoad(): void {
    // Initial validation
    this.validateComponent();
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    syncItemsProps(this.host, this.theme);
  }

  public componentDidLoad(): void {
    this.defineScrollerElements();
    this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);

    this.observeBreakpointChange();

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

  public componentDidUpdate(): void {
    throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);
    this.scrollIntoView();
  }

  public disconnectedCallback(): void {
    unobserveBreakpointChange(this.host);

    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host role="list">
        <PrefixedTagNames.pScroller class="scroller" theme={this.theme} ref={(el) => (this.scrollerElement = el)}>
          <slot />
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
    // TODO: validation? this could be any kind of dom node
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

  private observeBreakpointChange = (): void => {
    if (typeof parseJSON(this.size) === 'object') {
      observeBreakpointChange(this.host, this.scrollIntoView);
    }
  };
}
