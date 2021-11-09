import { Component, Element, h, Host, JSX, Method, Prop } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { toastManager, ToastManagerInstance } from './toast-manager';
import { Theme } from '../../../types';
import { ToastItemOffsetValue } from './toast-utils';
import { parseJSON } from './toast-utils';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  /** Adapts the toast-item color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The offset of the toast-item. */
  @Prop() public offset?: ToastItemOffsetValue = { bottom: 55 };

  @Element() public host!: HTMLElement;

  private manager: ToastManagerInstance;

  /* eslint-disable @typescript-eslint/require-await */
  @Method()
  public async getManager(): Promise<ToastManagerInstance> {
    return this.manager;
  }
  /* eslint-enable @typescript-eslint/require-await */

  public connectedCallback(): void {
    addComponentCss(this.host, parseJSON(this.offset));
    this.manager = toastManager.register(this.host);
    // eslint-disable-next-line no-console
    console.log('connectedCallback', this.manager);
  }

  public componentDidLoad(): void {
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
    const toast = this.manager.getToast();

    return (
      <Host>
        {toast && <p-toast-item key={toast.message} message={toast.message} state={toast.state} theme={this.theme} />}
      </Host>
    );
  }
}
