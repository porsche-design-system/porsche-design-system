import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { addComponentCss } from '../toast-a/toast-item-a-styles';
import type { ToastState } from '../toast-a/toast-a-types';

@Component({
  tag: 'p-toast-item-c',
  shadow: true,
})
export class ToastItemC {
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
        {/*// @ts-ignore*/}
        <button onClick={this.close.emit}>X</button>
      </div>
    );
  }
}
