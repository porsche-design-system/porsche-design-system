import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import type { Theme } from '../../../../types';
import { attachComponentCss, getPrefixedTagNames } from '../../../../utils';
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
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <PrefixedTagNames.pScroller theme={this.theme}>
        <div class="item-wrapper">
          <slot />
        </div>
      </PrefixedTagNames.pScroller>
    );
  }

  private defineStepperHorizontalItemElements = (): void => {
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };
}
