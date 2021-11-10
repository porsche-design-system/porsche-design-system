import { Component, Element, Event, EventEmitter, Host, JSX, Prop, h } from '@stencil/core';
import type { Theme } from '../../../../types';
import type { ToastState } from '../toast/toast-utils';
import { TOAST_STATES } from '../toast/toast-utils';
import { getContentAriaAttributes } from './toast-item-utils';
import {
  attachComponentCss,
  getPrefixedTagNames,
  throwIfRootNodeIsNotOfKind,
  throwIfValueIsInvalid,
} from '../../../../utils';
import { getComponentCss } from './toast-item-styles';
import { getIconName } from '../../inline-notification/inline-notification-utils';

@Component({
  tag: 'p-toast-item',
  shadow: true,
})
export class ToastItem {
  @Element() public host!: HTMLElement;

  /** Message of the toast-item. */
  @Prop() public message?: string = '';

  /** State of the toast-item. */
  @Prop() public state?: ToastState = 'neutral';

  /** Adapts the toast-item color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  public connectedCallback(): void {
    throwIfRootNodeIsNotOfKind(this.host, 'pToast');
  }

  public componentWillRender(): void {
    throwIfValueIsInvalid(this.state, TOAST_STATES, 'state');
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);
  }

  public render(): JSX.Element {
    const toastId = 'toast';
    const messageId = 'message';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pIcon class="icon" name={getIconName(this.state)} color="inherit" aria-hidden="true" />
        <PrefixedTagNames.pText id={messageId} class="content" {...getContentAriaAttributes(messageId)}>
          {this.message}
        </PrefixedTagNames.pText>
        <PrefixedTagNames.pButtonPure
          class="close"
          type="button"
          icon="close"
          hideLabel={true}
          aria-controls={toastId}
          onClick={this.dismiss.emit}
        >
          Close toast
        </PrefixedTagNames.pButtonPure>
      </Host>
    );
  }
}
