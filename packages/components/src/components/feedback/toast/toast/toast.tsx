import { Component, Element, Host, JSX, Method, Prop, h } from '@stencil/core';
import { addComponentCss } from './toast-styles';
import type { ToastMessage, ToastManager } from './toast-manager';
import { toastManager } from './toast-manager';
import type { Theme } from '../../../../types';
import type { ToastOffsetValue } from './toast-utils';
import { getPrefixedTagNames } from '../../../../utils';
import { parseJSONAttribute } from '../../../../utils/json';
import { defaultToastOffset } from './toast-utils';

@Component({
  tag: 'p-toast',
  shadow: true,
})
export class Toast {
  /** Adapts the toast color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** The offset of the toast. */
  @Prop() public offset?: ToastOffsetValue = defaultToastOffset;

  @Element() public host!: HTMLElement;

  private manager: ToastManager;

  /* eslint-disable @typescript-eslint/require-await */
  @Method()
  public async addToast(message: ToastMessage): Promise<void> {
    this.manager.addToast(message);
  }

  public connectedCallback(): void {
    this.manager = toastManager.register(this.host);
    // eslint-disable-next-line no-console
    console.log('connectedCallback', this.manager);
  }

  public componentDidLoad(): void {
    this.host.addEventListener('dismiss', (e) => {
      e.stopPropagation();
      this.manager.dismissToast();
    });
  }

  public componentWillRender(): void {
    addComponentCss(this.host, parseJSONAttribute(this.offset));
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

    return <Host>{toast && <PrefixedTagNames.pToastItem {...toast} theme={this.theme} />}</Host>;
  }
}
