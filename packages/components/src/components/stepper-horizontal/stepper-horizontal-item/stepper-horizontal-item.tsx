import { Component, Element, h, Host, type JSX, Listen, Prop, Watch } from '@stencil/core';
import type {
  StepperHorizontalItemInternalHTMLProps,
  StepperHorizontalItemState,
} from './stepper-horizontal-item-utils';
import {
  getStepperHorizontalIconName,
  isItemClickable,
  isStateCompleteOrWarning,
  STEPPER_ITEM_STATES,
  throwIfCurrentAndDisabled,
} from './stepper-horizontal-item-utils';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  updateParent,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './stepper-horizontal-item-styles';

const propTypes: PropTypes<typeof StepperHorizontalItem> = {
  state: AllowedTypes.oneOf<StepperHorizontalItemState>([undefined, ...STEPPER_ITEM_STATES]),
  disabled: AllowedTypes.boolean,
};

@Component({
  tag: 'p-stepper-horizontal-item',
  shadow: { delegatesFocus: true },
})
export class StepperHorizontalItem {
  @Element() public host!: HTMLElement & StepperHorizontalItemInternalHTMLProps;

  /** The validation state. */
  @Prop() public state?: StepperHorizontalItemState;

  /** Disables the stepper-horizontal-item. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (!isItemClickable(this.state, this.disabled)) {
      e.stopPropagation();
    }
  }

  @Watch('state')
  public onStateChange(): void {
    updateParent(this.host);
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-stepper-horizontal');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    throwIfCurrentAndDisabled(this.host);
    attachComponentCss(this.host, getComponentCss, this.state, this.disabled, this.host.theme || 'light');

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host role="listitem">
        <button
          type="button"
          aria-disabled={!this.state || this.disabled ? 'true' : null}
          aria-current={this.state === 'current' ? 'step' : null}
        >
          {isStateCompleteOrWarning(this.state) && (
            <PrefixedTagNames.pIcon
              class="icon"
              name={getStepperHorizontalIconName(this.state)}
              size="inherit"
              theme={this.host.theme || 'light'}
              color={this.disabled ? 'state-disabled' : `notification-${getStepperHorizontalIconName(this.state)}`}
              aria-hidden="true"
            />
          )}
          {this.state && <span class="sr-only">{this.state}: </span>}
          <slot />
        </button>
      </Host>
    );
  }
}
