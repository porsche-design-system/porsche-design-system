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
    this.manager = toastManager.register(this.host);
    // eslint-disable-next-line no-console
    console.log('connectedCallback', this.manager);
  }

  public componentWillRender(): void {
    const { state } = this.manager.getToast() || {};
    addComponentCss(this.host, state);
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
          <div key={toast.message} class="root">
            <PrefixedTagNames.pText>{toast.message}</PrefixedTagNames.pText>
            <span class="progress" />
            <PrefixedTagNames.pButtonPure
              class="close"
              type="button"
              icon="close"
              hideLabel={true}
              onClick={this.manager.dismissToast}
            >
              Close toast
            </PrefixedTagNames.pButtonPure>
          </div>
        )}
      </Host>
    );
  }
}
