import { Component, Element, JSX, Listen, Prop, Watch, Host, h } from '@stencil/core';
import type { StepperHorizontalItemInternalHTMLProps, StepperState } from './stepper-horizontal-item-utils';
import {
  getIconName,
  isItemClickable,
  isStateCompleteOrWarning,
  throwIfCurrentAndDisabled,
} from './stepper-horizontal-item-utils';
import { attachComponentCss, getPrefixedTagNames, throwIfParentIsNotOfKind } from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-item-styles';
import type { StepperHorizontalHostHtmlElement } from '../stepper-horizontal/stepper-horizontal-utils';

@Component({
  tag: 'p-stepper-horizontal-item',
  shadow: { delegatesFocus: true },
})
export class StepperHorizontalItem {
  @Element() public host!: HTMLElement & StepperHorizontalItemInternalHTMLProps;

  /** The validation state. */
  @Prop() public state?: StepperState;

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
    (this.host.parentElement as StepperHorizontalHostHtmlElement).stateChanged();
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pStepperHorizontal');
  }

  public componentWillRender(): void {
    throwIfCurrentAndDisabled(this.host);
    attachComponentCss(this.host, getComponentCss, this.state, this.disabled, this.host.theme || 'light');
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host role="listitem">
        <button
          type="button"
          aria-disabled={!this.state || this.disabled}
          aria-current={this.state === 'current' ? 'step' : null}
        >
          {isStateCompleteOrWarning(this.state) && (
            <PrefixedTagNames.pIcon
              class="icon"
              name={getIconName(this.state)}
              theme={this.host.theme || 'light'}
              color="inherit"
              aria-hidden="true"
            />
          )}
          {this.state && <span class="sr-only">{`${this.state}: `}</span>}
          <slot />
        </button>
      </Host>
    );
  }
}
