import { Component, Element, Host, JSX, Method, Prop, h } from '@stencil/core';
import { getComponentCss, toastCloseClassName } from './toast-styles';
import type { ToastMessage } from './toast-manager';
import { toastManager } from './toast-manager';
import type { Theme } from '../../../../types';
import { attachComponentCss, getPrefixedTagNames } from '../../../../utils';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  /** Adapts the toast color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  private toastItemElement: HTMLPToastItemElement;

  @Method()
  public addMessage(message: ToastMessage): void {
    toastManager.addMessage(message);
  }

  public connectedCallback(): void {
    toastManager.register(this.host, () => this.toastItemElement.classList.add(toastCloseClassName));
  }

  public componentDidLoad(): void {
    this.host.addEventListener('dismiss', (e) => {
      e.stopPropagation();
      toastManager.dismissToastItem();
    });
  }

  public componentShouldUpdate(
    _: unknown,
    __: unknown,
    propertyName: keyof Pick<InstanceType<typeof Toast>, 'theme'>
  ): boolean {
    return propertyName !== 'theme';
  }

  public componentWillRender(): void {
    this.toastItemElement?.classList.remove(toastCloseClassName);
    attachComponentCss(this.host, getComponentCss);
  }

  public disconnectedCallback(): void {
    toastManager.unregister();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const toast = toastManager.getToast();

    return (
      <Host>
        {toast && (
          <PrefixedTagNames.pToastItem {...toast} theme={this.theme} ref={(el) => (this.toastItemElement = el)} />
        )}
      </Host>
    );
  }
}
