import { Component, Element, h, Host, JSX, Method, Prop } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import { ToastManager, toastManager, ToastManagerInternal } from './toast-manager';
import { Theme } from '../../../../types';
import { ToastOffsetValue } from './toast-utils';
import { parseJSON } from './toast-utils';
import { getPrefixedTagNames } from '../../../../utils';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  /** Adapts the toast-item color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The offset of the toast-item. */
  @Prop() public offset?: ToastOffsetValue = { bottom: 55 };

  @Element() public host!: HTMLElement;

  private manager: ToastManagerInternal;
  private key = 0;

  /* eslint-disable @typescript-eslint/require-await */
  @Method()
  public async getManager(): Promise<ToastManager> {
    return this.manager;
  }

  public connectedCallback(): void {
    // addComponentCss(this.host, parseJSON(this.offset));
    this.manager = toastManager.register(this.host);
    // eslint-disable-next-line no-console
    console.log('connectedCallback', this.manager);
    this.host.shadowRoot.addEventListener('dismiss', this.manager.dismissToast);
  }

  public componentWillRender(): void {
    this.key++;
    addComponentCss(this.host, parseJSON(this.offset));
  }

  public componentDidRender(): void {
    this.manager.startToast();
  }

  public disconnectedCallback(): void {
    toastManager.unregister();
    // eslint-disable-next-line no-console
    console.log('disconnectedCallback', this.manager);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    // eslint-disable-next-line no-console
    console.log('render', this.manager);
    const toast = this.manager.getToast();

    return (
      <Host>
        {toast && <PrefixedTagNames.pToastItem {...toast} theme={this.theme}></PrefixedTagNames.pToastItem>}
        <span key={this.key} class="progress" />
      </Host>
    );
  }
}
