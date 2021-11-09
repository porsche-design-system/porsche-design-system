import { Component, Element, h, Host, JSX, Method } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { toastManager, ToastManagerInstance } from './toast-manager';
import { getPrefixedTagNames } from '../../../utils';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  @Element() public host!: HTMLElement;

  private manager: ToastManagerInstance;

  /* eslint-disable @typescript-eslint/require-await */
  @Method()
  public async getManager(): Promise<ToastManagerInstance> {
    return this.manager;
  }
  /* eslint-enable @typescript-eslint/require-await */

  public connectedCallback(): void {
    addComponentCss(this.host);
    this.manager = toastManager.register(this.host);
    // eslint-disable-next-line no-console
    console.log('connectedCallback', this.manager);
  }

  public componentDidLoad(): void {
    // eslint-disable-next-line no-console
    console.log('componentDidLoad', this.manager);
    this.host.shadowRoot.addEventListener('close', this.manager.dismissToast);
  }

  public disconnectedCallback(): void {
    toastManager.unregister();
    // eslint-disable-next-line no-console
    console.log('disconnectedCallback', this.manager);
  }

  public render(): JSX.Element {
    // eslint-disable-next-line no-console
    console.log('render', this.manager);
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const toast = this.manager.getToast();

    return (
      <Host>
        {toast && (
          <PrefixedTagNames.pToastItem key={toast.message} state={toast.state}>
            <PrefixedTagNames.pText>{toast.message}</PrefixedTagNames.pText>
          </PrefixedTagNames.pToastItem>
        )}
      </Host>
    );
  }
}
