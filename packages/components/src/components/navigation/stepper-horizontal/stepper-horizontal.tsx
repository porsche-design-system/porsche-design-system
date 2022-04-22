import { Component, Element, h, JSX, Prop, Host, State } from '@stencil/core';
import { Theme } from '../../../types';

@Component({
  tag: 'p-stepper-horizontal',
  shadow: true,
})
export class StepperHorizontal {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @State() public stepperHorizontalItems: HTMLPStepperHorizontalItemElement[] = [];

  public connectedCallback(): void {
    this.defineStepperHorizontalItemElements();
  }

  public render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

  private defineStepperHorizontalItemElements = (): void => {
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPTabsItemElement[];
  };
}
