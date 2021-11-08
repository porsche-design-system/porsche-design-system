import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-item-d-styles';
import type { CallToAction2, ToastState2 } from './toast-d-types';

@Component({
  tag: 'p-toast-item-d',
  shadow: true,
})
export class ToastItemD {
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
        <span class="progress" />
        <div id={'bla'}>assdfsdfd</div>
      </div>
    );
  }
}
