import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getScrollActivePosition,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  observeBreakpointChange,
  parseJSON,
  throwIfChildCountIsExceeded,
  throwIfChildrenAreNotOfKind,
  unobserveBreakpointChange,
  validateProps,
} from '../../../utils';
import { getClickedItem } from '../../../utils/dom/getClickedItem';
import { getComponentCss } from './stepper-horizontal-styles';
import {
  getIndexOfStepWithStateCurrent,
  STEPPER_HORIZONTAL_SIZES,
  type StepperHorizontalSize,
  type StepperHorizontalUpdateEventDetail,
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

  private stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];
  private scrollerElement: HTMLPScrollerElement;
  private currentStepIndex: number;

  public connectedCallback(): void {
    this.validateComponent(); // on every reconnect
    this.observeBreakpointChange();
  }

  public componentWillLoad(): void {
    // Initial validation
    this.validateComponent();
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

    // TODO: would be great to use this in jsx but that doesn't work reliable and causes jsdom-polyfill unit test to fail
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.onSlotChange);
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

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pScroller
          class="scroller"
          aria={{ role: 'list' }}
          onClick={this.onClickScroller}
          ref={(el: HTMLPScrollerElement) => (this.scrollerElement = el)}
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
    }
  };

  private validateComponent = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'p-stepper-horizontal-item');
    throwIfChildCountIsExceeded(this.host, 9);
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
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

  private onSlotChange = (): void => {
    this.validateComponent();
    this.currentStepIndex = getIndexOfStepWithStateCurrent(this.stepperHorizontalItems);
    this.scrollIntoView();
  };
}
