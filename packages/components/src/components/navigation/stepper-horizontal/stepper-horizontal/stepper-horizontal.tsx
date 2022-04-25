import { Component, Element, h, JSX, Prop, State } from '@stencil/core';
import { Theme } from '../../../../types';
import { attachComponentCss } from '../../../../utils';
import { getComponentCss } from './stepper-horizontal-styles';
import { HorizontalScrollWrapper } from '../../../common/horizontal-scrolling/horizontal-scroll-wrapper';

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
    attachComponentCss(this.host, getComponentCss, this.theme);
  }

  public render(): JSX.Element {
    return (
      <HorizontalScrollWrapper
        host={this.host}
        isNextHidden={false}
        isPrevHidden={false}
        scrollOnPrevNextClick={() => {}}
        withBar={false}
        theme={this.theme}
      >
        <slot />
      </HorizontalScrollWrapper>
    );
  }

  private defineStepperHorizontalItemElements = (): void => {
    this.stepperHorizontalItems = Array.from(this.host.children) as HTMLPStepperHorizontalItemElement[];
  };
}
