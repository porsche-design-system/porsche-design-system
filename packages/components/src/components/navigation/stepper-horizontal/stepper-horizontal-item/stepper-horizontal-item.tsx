import { Component, Element, h, JSX, Prop, Listen } from '@stencil/core';
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
  @Prop() public state?: StepperState = 'current';

  /** Disables the stepper. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (!!this.disabled) {
      e.stopPropagation();
    }
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pStepperHorizontal');
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <button>
        {isStateCompleteOrWarning(this.state) && (
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
