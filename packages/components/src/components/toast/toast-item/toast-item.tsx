import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import { type ToastState, type ToastStateDeprecated, TOAST_STATES } from '../toast/toast-utils';
import type { IconColor } from '../../icon/icon-utils';
import type { PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getHasNativePopoverSupport,
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

  // Since the event listener is registered on parent p-toast, the event needs to bubble
  /** Emitted when the close button is clicked. */
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
    warnIfDeprecatedPropValueIsUsed<typeof ToastItem, ToastStateDeprecated, ToastState>(this, 'state', {
      neutral: 'info',
    });
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);

    const toastId = 'toast';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host popover="manual">
        <PrefixedTagNames.pIcon
          class="icon"
          name={getInlineNotificationIconName(this.state)}
          color={`notification-${this.state}` as IconColor}
          theme={this.theme}
          aria-hidden="true"
        />
        <p id={toastId} innerHTML={this.text} />
        <PrefixedTagNames.pButton
          variant="ghost"
          theme={this.theme}
          class="close"
          type="button"
          icon="close"
          hideLabel={true}
          aria-controls={toastId}
          onClick={this.dismiss.emit}
        >
          Close notification message
        </PrefixedTagNames.pButton>
      </Host>
    );
  }
}
