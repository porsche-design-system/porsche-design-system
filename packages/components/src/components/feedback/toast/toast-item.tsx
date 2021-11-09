import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-item-styles';
import type { ToastState } from './toast-manager';

@Component({
  tag: 'p-toast-item',
  shadow: true,
})
export class ToastItem {
  @Element() public host!: HTMLElement;

  /** Defines a message. */
  @Prop() public message?: string;

  /** Defines visual appearance. */
  @Prop() public state?: ToastState = 'neutral';

  @Event() public close?: EventEmitter<void>;

  public connectedCallback(): void {
    addComponentCss(this.host, this.state);
  }

  public render(): JSX.Element {
    return (
      <div class="root">
        <slot />
        <span>{this.message}</span>
        <span class="progress" />
        <button onClick={this.close.emit as any}>X</button>
      </div>
    );
  }
}
