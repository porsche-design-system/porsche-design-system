import { Component, Element, h, JSX, Prop, Listen, Watch } from '@stencil/core';
import type { Theme } from '../../../../types';
import type { StepperState } from './stepper-horizontal-item-utils';
import { getIcon, isStateCompleteOrWarning } from './stepper-horizontal-item-utils';
import { attachComponentCss, getHTMLElements, getPrefixedTagNames, throwIfParentIsNotOfKind } from '../../../../utils';
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
    if (!!this.disabled || this.state === 'current') {
      e.stopPropagation();
    }
  }

  @Watch('state')
  stateHandler(newValue: StepperState, _oldValue: StepperState) {
    if (newValue === undefined) {
      this.disabled = true;
    }
  }

  private stepCounter: number;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pStepperHorizontal');
    if (this.state === undefined) {
      this.disabled = true;
    }
    this.setStepCounter();
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.state, this.disabled, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const isCompleteOrWarning = isStateCompleteOrWarning(this.state);
    // TODO: Screen reader step counter inside button?
    return (
      <button tabIndex={isCompleteOrWarning ? 0 : -1} disabled={this.disabled}>
        {isCompleteOrWarning ? (
          <PrefixedTagNames.pIcon
            class="icon"
            name={getIcon(this.state)}
            theme={this.theme}
            color="inherit"
            aria-hidden="true"
          />
        ) : (
          <span class="step-count-svg-wrapper">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="100%" height="100%">
              {this.disabled && <circle class="outer-circle" cx="12" cy="12" r="9" />}
              <circle class="inner-circle" cx="12" cy="12" r={this.disabled ? '8' : '9'} />
              <text x="12" y="16.5" text-anchor="middle">
                {this.stepCounter}
              </text>
            </svg>
          </span>
        )}
        <slot />
      </button>
    );
  }
  // TODO: Needs to be called when items are removed / added
  private setStepCounter = (): void => {
    const stepItems = getHTMLElements(this.host.parentElement, 'p-stepper-horizontal-item');
    this.stepCounter = stepItems.indexOf(this.host as HTMLPStepperHorizontalItemElement) + 1;
  };
}
