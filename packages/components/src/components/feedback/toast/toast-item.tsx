import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-item-styles';
import type { ToastState } from './toast-types';

@Component({
  tag: 'p-toast-item',
  shadow: true,
})
export class ToastItem {
  @Element() public host!: HTMLElement;

  /** Defines visual appearance. */
  @Prop() public state?: ToastState = 'neutral';

  /** Defines a call to action button. */
  @Prop() public action?: { label: string; callback: () => void };

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
