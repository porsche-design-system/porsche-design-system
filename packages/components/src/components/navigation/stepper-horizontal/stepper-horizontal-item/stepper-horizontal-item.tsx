import { Component, Element, h, JSX, Prop, Listen, Watch } from '@stencil/core';
import type { Theme } from '../../../../types';
import type { StepperState } from './stepper-horizontal-item-utils';
import { getIcon, isStateCompleteOrWarning } from './stepper-horizontal-item-utils';
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

  /** Disables the stepper. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (!!this.disabled) {
      e.stopPropagation();
    }
  }

  @Watch('state')
  stateHandler(newValue: StepperState, _oldValue: StepperState) {
    if (newValue === undefined) {
      this.disabled = true;
    }
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pStepperHorizontal');
    if (this.state === undefined) {
      this.disabled = true;
    }
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.state, this.disabled, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isCompleteOrWarning = isStateCompleteOrWarning(this.state);
    return (
      <button tabIndex={isCompleteOrWarning ? 0 : -1} disabled={this.disabled}>
        {isCompleteOrWarning && (
          <PrefixedTagNames.pIcon
            class="icon"
            name={getIcon(this.state)}
            theme={this.theme}
            color="inherit"
            aria-hidden="true"
          />
        )}
        <slot />
      </button>
    );
  }
}
