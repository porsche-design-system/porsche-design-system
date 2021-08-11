import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-item-a-styles';
import type { CallToAction2, ToastState2 } from './toast-a-types';

@Component({
  tag: 'p-toast-item-a',
  shadow: true,
})
export class ToastItemA {
  @Element() public host!: HTMLElement;

  /** Defines visual appearance. */
  @Prop() public state?: ToastState2 = 'neutral';

  /** Defines a call to action button. */
  @Prop() public action?: CallToAction2;

  public connectedCallback(): void {
    addComponentCss(this.host, this.state);
  }

  public render(): JSX.Element {
    return (
      <div class="root">
        <slot />
        {...this.action && <p-button-pure onClick={() => this.action.callback()}>{this.action.label}</p-button-pure>}
        <span class="progress" />
      </div>
    );
  }
}
