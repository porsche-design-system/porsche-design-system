import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import type { ToastState, ToastStateDeprecated } from '../toast/toast-utils';
import { TOAST_STATES } from '../toast/toast-utils';
import type { IconColor } from '../../icon/icon-utils';
import type { PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  THEMES,
  throwIfRootNodeIsNotOneOfKind,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../../utils';
import { getComponentCss } from './toast-item-styles';
import { getInlineNotificationIconName } from '../../inline-notification/inline-notification-utils';

const propTypes: PropTypes<typeof ToastItem> = {
  text: AllowedTypes.string,
  state: AllowedTypes.oneOf<ToastState>(TOAST_STATES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-toast-item',
  shadow: true,
})
export class ToastItem {
  @Element() public host!: HTMLElement;

  /** Text of the toast-item. */
  @Prop() public text?: string = '';

  /** State of the toast-item. */
  @Prop() public state?: ToastState = 'info';

  /** Adapts the toast-item color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event() public dismiss?: EventEmitter<void>; // TODO: this is the only event without { bubbles: false }

  public connectedCallback(): void {
    throwIfRootNodeIsNotOneOfKind(this.host, ['p-toast']);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropValueIsUsed<typeof ToastItem, ToastStateDeprecated, ToastState>(this, 'state', {
      neutral: 'info',
    });
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);

    const toastId = 'toast';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pIcon
          class="icon"
          name={getInlineNotificationIconName(this.state)}
          color={`notification-${this.state}` as IconColor}
          theme={this.theme}
          aria-hidden="true"
        />
        <p id={toastId} class="content" role="status" aria-live="polite" innerHTML={this.text}></p>
        <PrefixedTagNames.pButtonPure
          theme={this.theme}
          class="close"
          type="button"
          icon="close"
          hideLabel={true}
          aria-controls={toastId}
          onClick={this.dismiss.emit}
        >
          Close notification message
        </PrefixedTagNames.pButtonPure>
      </Host>
    );
  }
}
