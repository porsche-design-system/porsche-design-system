import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import type { PropTypes, Theme } from '../../../types';
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
} from '../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import type { StepChangeEvent, StepperHorizontalSize } from './stepper-horizontal-utils';
import {
  getIndexOfStepWithStateCurrent,
  STEPPER_HORIZONTAL_SIZES,
  syncStepperHorizontalItemsProps,
  throwIfMultipleCurrentStates,
} from './stepper-horizontal-utils';
import { getClickedItem } from '../../../utils/dom/getClickedItem';
import type { BreakpointCustomizable } from '../../../types';

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
  private scrollerElement: HTMLPScrollerElement;
  private currentStepIndex: number;

  public connectedCallback(): void {
    this.defineStepperHorizontalItemElements();

    // TODO: wouldn't a slotchange listener be good enough? https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event
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
    attachComponentCss(this.host, getComponentCss, this.size);
    syncStepperHorizontalItemsProps(this.host, this.theme);
  }

  public componentDidLoad(): void {
    this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);

    this.observeBreakpointChange();

    // Sometimes lifecycle gets called after disconnectedCallback()
    if (this.scrollerElement) {
      this.addEventListeners();

      // Initial scroll current into view
      this.scrollerElement.scrollToPosition = {
        scrollPosition: getScrollActivePosition(
          this.stepperHorizontalItems,
          'next',
          this.currentStepIndex,
          this.scrollerElement
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
    this.scrollerElement.addEventListener('click', (e) => {
      const target = getClickedItem<HTMLPStepperHorizontalItemElement>(
        this.host,
        'p-stepper-horizontal-item',
        e.composedPath()
      );

      if (target) {
        const clickedStepIndex = this.stepperHorizontalItems.indexOf(target);

        this.stepChange.emit({ activeStepIndex: clickedStepIndex });
      }
    });
  };

  private defineStepperHorizontalItemElements = (): void => {
    // TODO: validation? this could be any kind of dom node
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };

  private validateComponent = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'p-stepper-horizontal-item');
    throwIfChildCountIsExceeded(this.host, 9);
    throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);
  };

  private scrollIntoView = (): void => {
    const newStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);
    // If state is set to undefined index is -1
    if (newStepIndex !== -1) {
      const scrollActivePosition = getScrollActivePosition(
        this.stepperHorizontalItems,
        newStepIndex > this.currentStepIndex ? 'next' : 'prev',
        newStepIndex,
        this.scrollerElement
      );

      this.currentStepIndex = newStepIndex;

      this.scrollerElement.scrollToPosition = {
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
