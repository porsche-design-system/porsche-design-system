import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  throwIfChildCountIsExceeded,
  throwIfChildrenAreNotOfKind,
  validateProps,
} from '../../../utils';
import { getClickedItem } from '../../../utils/dom/getClickedItem';
import { getComponentCss } from './stepper-horizontal-styles';
import {
  getIndexOfStepWithStateCurrent,
  STEPPER_HORIZONTAL_SIZES,
  type StepperHorizontalSize,
  type StepperHorizontalUpdateEventDetail,
  scrollStepperHorizontalItemIntoView,
  throwIfMultipleCurrentStates,
} from './stepper-horizontal-utils';

const propTypes: PropTypes<typeof StepperHorizontal> = {
  size: AllowedTypes.breakpoint<StepperHorizontalSize>(STEPPER_HORIZONTAL_SIZES),
};

/**
 * @slot {"name": "", "description": "Default slot for the `p-stepper-horizontal-item` tags." }
 */
@Component({
  tag: 'p-stepper-horizontal',
  shadow: true,
})
export class StepperHorizontal {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<StepperHorizontalSize> = 'small';

  /** Emitted when active step is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<StepperHorizontalUpdateEventDetail>;

  private scroller: HTMLElement;
  private stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];
  private slot: HTMLSlotElement;
  private resizeObserver: ResizeObserver;

  public disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
    this.slot?.removeEventListener('slotchange', this.onSlotChange);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillLoad(): void {
    this.defineStepperHorizontalItems();
  }

  public componentDidLoad(): void {
    // scroll current step into view initially
    scrollStepperHorizontalItemIntoView(
      getIndexOfStepWithStateCurrent(this.stepperHorizontalItems),
      this.scroller,
      this.stepperHorizontalItems,
      false
    );

    // it would be better to use `<slot onslotchange={() => {}} />` in jsx but that doesn't work reliable or triggers initially when component is rendered via js framework
    this.slot.addEventListener('slotchange', this.onSlotChange);
    this.resizeObserver = new ResizeObserver(() => {
      // scroll into view in case the current step is not centered after resize
      scrollStepperHorizontalItemIntoView(
        getIndexOfStepWithStateCurrent(this.stepperHorizontalItems),
        this.scroller,
        this.stepperHorizontalItems,
        false
      );
    });
    this.resizeObserver.observe(this.scroller);
  }

  public componentDidUpdate(): void {
    // scroll the new current step into view
    scrollStepperHorizontalItemIntoView(
      getIndexOfStepWithStateCurrent(this.stepperHorizontalItems),
      this.scroller,
      this.stepperHorizontalItems
    );
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size);

    throwIfChildrenAreNotOfKind(this.host, 'p-stepper-horizontal-item');
    throwIfChildCountIsExceeded(this.host, 9);
    throwIfMultipleCurrentStates(this.host, this.stepperHorizontalItems);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pScroller
          class="scroller"
          aria={{ role: 'list' }}
          onClick={this.onClickScroller}
          ref={(el: HTMLElement) => (this.scroller = el)}
        >
          <slot ref={(el: HTMLSlotElement) => (this.slot = el)} />
        </PrefixedTagNames.pScroller>
      </Host>
    );
  }

  private defineStepperHorizontalItems = (): void => {
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };

  private onClickScroller = (e: MouseEvent): void => {
    const target = getClickedItem<HTMLPStepperHorizontalItemElement>(
      this.host,
      'p-stepper-horizontal-item',
      e.composedPath()
    );

    if (target) {
      this.update.emit({ activeStepIndex: this.stepperHorizontalItems.indexOf(target) });
    }
  };

  private onSlotChange = (): void => {
    this.defineStepperHorizontalItems();
    // scroll the current step into view after slot change in case the current step has changed or is not centered anymore
    scrollStepperHorizontalItemIntoView(
      getIndexOfStepWithStateCurrent(this.stepperHorizontalItems),
      this.scroller,
      this.stepperHorizontalItems
    );
  };
}
