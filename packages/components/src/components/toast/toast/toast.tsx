import type { ToastMessage } from './toast-manager';
import { toastManager } from './toast-manager';
import { Component, Element, h, Host, type JSX, Method, Prop } from '@stencil/core';
import { getComponentCss, toastCloseClassName } from './toast-styles';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../../utils';
import type { PropTypes, Theme } from '../../../types';

const propTypes: PropTypes<typeof Toast> = {
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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

  public componentShouldUpdate(_: unknown, __: unknown, propName: keyof InstanceType<typeof Toast>): boolean {
    return propName !== 'theme';
  }

  public disconnectedCallback(): void {
    toastManager.unregister();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    this.toastItemElement?.classList.remove(toastCloseClassName);

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
