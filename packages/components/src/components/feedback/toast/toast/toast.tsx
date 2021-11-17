import { Component, Element, Host, JSX, Method, Prop, h } from '@stencil/core';
import { getComponentCss } from './toast-styles';
import type { ToastMessage, ToastManager } from './toast-manager';
import { toastManager } from './toast-manager';
import type { Theme } from '../../../../types';
import { attachComponentCss, getPrefixedTagNames } from '../../../../utils';
import type { ToastOffset } from './toast-utils';
import { defaultToastOffset } from './toast-utils';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  /** Adapts the toast color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The bottom offset of the toast. */
  @Prop() public offsetBottom?: ToastOffset = defaultToastOffset;

  @Element() public host!: HTMLElement;

  private manager: ToastManager;

  @Method()
  public addMessage(message: ToastMessage): void {
    this.manager.addMessage(message);
  }

  public connectedCallback(): void {
    this.manager = toastManager.register(this.host);
  }

  public componentDidLoad(): void {
    this.host.addEventListener('dismiss', (e) => {
      e.stopPropagation();
      this.manager.dismissToastItem();
    });
  }

  public componentShouldUpdate(_, __, propertyName: string): boolean {
    return propertyName !== 'offset';
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.offsetBottom);
  }

  public componentDidRender(): void {
    this.manager.startTimeout();
  }

  public disconnectedCallback(): void {
    toastManager.unregister();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const toast = this.manager.getToast();

    return <Host>{toast && <PrefixedTagNames.pToastItem {...toast} theme={this.theme} />}</Host>;
  }
}
