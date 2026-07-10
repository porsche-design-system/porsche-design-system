import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getHasNativePopoverSupport,
  throwIfRootNodeIsNotOneOfKind,
  validateProps,
} from '../../../utils';
import { FCDismissButton } from '../../common/fc-dismiss-button/fc-dismiss-button';
import { NotificationBase } from '../../common/notification-base/notification-base';
import { TOAST_STATES, type ToastState } from '../toast/toast-utils';
import { getComponentCss } from './toast-item-styles';

const propTypes: PropTypes<typeof ToastItem> = {
  text: AllowedTypes.string,
  state: AllowedTypes.oneOf<ToastState>(TOAST_STATES),
};

@Component({
  tag: 'p-toast-item',
  shadow: true,
})
export class ToastItem {
  @Element() public host!: HTMLElement;

  /** Sets the notification message text displayed inside the toast item to inform the user about the outcome of an action. */
  @Prop() public text?: string = '';

  /** Sets the visual and semantic state of the toast item, controlling its icon and color scheme (`info`, `warning`, `error`, `success`). */
  @Prop() public state?: ToastState = 'info';

  // Since the event listener is registered on parent p-toast, the event needs to bubble
  /** Emitted when the user clicks the close button on the toast item, signalling that it should be dismissed. */
  @Event() public dismiss?: EventEmitter<void>;

  public connectedCallback(): void {
    throwIfRootNodeIsNotOneOfKind(this.host, ['p-toast']);
  }

  public componentDidRender(): void {
    if (getHasNativePopoverSupport()) {
      this.host.showPopover();
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.state);

    return (
      <Host popover="manual">
        <NotificationBase
          description={this.text}
          innerHTML={true}
          dismissButton={<FCDismissButton label="Close notification message" onClick={this.dismiss.emit} />}
        />
      </Host>
    );
  }
}
