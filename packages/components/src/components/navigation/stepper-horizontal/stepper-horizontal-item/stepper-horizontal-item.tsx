import { Component, Element, JSX, Listen, Prop, State, Watch, h } from '@stencil/core';
import type { Theme } from '../../../../types';
import type { StepperState } from './stepper-horizontal-item-utils';
import { getIconName, isStateCompleteOrWarning, throwIfCurrentAndDisabled } from './stepper-horizontal-item-utils';
import { attachComponentCss, getPrefixedTagNames, throwIfParentIsNotOfKind } from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-item-styles';

@Component({
  tag: 'p-stepper-horizontal-item',
  shadow: true,
})
export class StepperHorizontalItem {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The validation state. */
  @Prop() public state?: StepperState;

  /** Disables the stepper-horizontal-item. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  @State() private stepCounter: number;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (!!this.disabled || this.state === 'current') {
      e.stopPropagation();
    }
  }

  @Watch('state')
  public stateHandler(newValue: StepperState): void {
    if (!newValue) {
      this.disabled = true;
    }
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pStepperHorizontal');
    if (!this.state) {
      this.disabled = true;
    }
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.state, this.disabled, this.theme);
    throwIfCurrentAndDisabled(this.host);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isCompleteOrWarning = isStateCompleteOrWarning(this.state);

    return (
      <button disabled={this.disabled} aria-current={this.state === 'current' ? 'step' : null}>
        <span class="sr-only">Step {this.stepCounter}:</span>
        {isCompleteOrWarning && (
          <PrefixedTagNames.pIcon
            class="icon"
            name={getIconName(this.state)}
            theme={this.theme}
            color="inherit"
            aria-hidden="true"
          />
        )}
        <slot />
        {this.state && <span class="sr-only">{this.state}</span>}
      </button>
    );
  }
}
