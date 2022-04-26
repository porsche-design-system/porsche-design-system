import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import type { Theme } from '../../../../types';
import { attachComponentCss } from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';

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

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    return (
      // <ScrollWrapper
      //   host={this.host}
      //   isNextHidden={false}
      //   isPrevHidden={false}
      //   slottedElements={[<div></div>]}
      //   scrollAreaElement={<div></div>}
      //   withBar={false}
      //   theme={this.theme}
      // >
      //   <slot />
      // </ScrollWrapper>
      <div>
        <slot />
      </div>
    );
  }

  private defineStepperHorizontalItemElements = (): void => {
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };
}
