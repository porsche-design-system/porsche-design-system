import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getScrollActivePosition,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  observeBreakpointChange,
  parseJSON,
  THEMES,
  throwIfChildCountIsExceeded,
  throwIfChildrenAreNotOfKind,
  unobserveBreakpointChange,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import type { StepperHorizontalSize, StepperHorizontalUpdateEvent } from './stepper-horizontal-utils';
import {
  getIndexOfStepWithStateCurrent,
  STEPPER_HORIZONTAL_SIZES,
  syncStepperHorizontalItemsProps,
  throwIfMultipleCurrentStates,
} from './stepper-horizontal-utils';
import { getClickedItem } from '../../../utils/dom/getClickedItem';

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

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when active step is changed. */
  @Event({ bubbles: false }) public stepChange: EventEmitter<StepperHorizontalUpdateEvent>;

  /** Emitted when active step is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<StepperHorizontalUpdateEvent>;

  private stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];
  private scrollerElement: HTMLPScrollerElement;
  private currentStepIndex: number;

  public connectedCallback(): void {
    this.validateComponent();
    this.defineStepperHorizontalItemElements();
    this.observeBreakpointChange();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);

    this.observeBreakpointChange();

    // Sometimes lifecycle gets called after disconnectedCallback()
    if (this.scrollerElement) {
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

    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.onSlotchange);
  }

  public componentDidUpdate(): void {
    throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);
    this.scrollIntoView();
  }

  public disconnectedCallback(): void {
    unobserveBreakpointChange(this.host);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size);
    syncStepperHorizontalItemsProps(this.host, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pScroller
          class="scroller"
          aria={{ role: 'list' }}
          theme={this.theme}
          onClick={this.onClickScroller}
          ref={(el) => (this.scrollerElement = el)}
        >
          <slot />
        </PrefixedTagNames.pScroller>
      </Host>
    );
  }

  private onClickScroller = (e: MouseEvent): void => {
    const target = getClickedItem<HTMLPStepperHorizontalItemElement>(
      this.host,
      'p-stepper-horizontal-item',
      e.composedPath()
    );

    if (target) {
      const clickedStepIndex = this.stepperHorizontalItems.indexOf(target);

      this.update.emit({ activeStepIndex: clickedStepIndex });
      this.stepChange.emit({ activeStepIndex: clickedStepIndex });
    }
  };

  private createStepperHorizontalItemElements = (): HTMLPStepperHorizontalItemElement[] => {
    return Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };

  private defineStepperHorizontalItemElements = (): void => {
    this.stepperHorizontalItems = this.createStepperHorizontalItemElements();
  };

  private validateComponent = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'p-stepper-horizontal-item');
    throwIfChildCountIsExceeded(this.host, 9);
    throwIfMultipleCurrentStates(this.host, this.createStepperHorizontalItemElements());
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

  private onSlotchange = (): void => {
    this.validateComponent();
    this.defineStepperHorizontalItemElements();
    this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);
    this.scrollIntoView();
  };
}
