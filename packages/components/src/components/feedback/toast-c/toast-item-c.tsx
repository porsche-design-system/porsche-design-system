import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { addComponentCss } from './toast-item-c-styles';
import type { ToastState } from './toast-c-types';

@Component({
  tag: 'p-toast-item-c',
  shadow: true,
})
export class ToastItemC {
  @Element() public host!: HTMLElement;

  /** Defines visual appearance. */
  @Prop() public state?: ToastState = 'neutral';

  /** Defines the toastId of the toast */
  @Prop() public toastId: string;

  /** Defines a message.. */
  @Prop() public message?: string;

  @Event() public close?: EventEmitter<string>;

  public connectedCallback(): void {
    addComponentCss(this.host, this.state);
  }

  public render(): JSX.Element {
    return (
      <div class="root">
        <slot />
        <span>{this.message}</span>
        <span class="progress" />
        <button onClick={() => this.close.emit(this.toastId)}>X</button>
      </div>
    );
  }
}
