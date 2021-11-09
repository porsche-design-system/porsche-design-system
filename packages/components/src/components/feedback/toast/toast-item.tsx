import { JSX, Component, Prop, h, Element, Event, EventEmitter, Host } from '@stencil/core';
import type { ToastItemState } from './toast-item-utils';
import type { Theme } from '../../../types';
import { getContentAriaAttributes, getIconName, TOAST_ITEM_STATES } from './toast-item-utils';
import { attachComponentCss, getPrefixedTagNames, throwIfValueIsInvalid } from '../../../utils';
import { getComponentCss } from './toast-item-styles';

@Component({
  tag: 'p-toast-item',
  shadow: true,
})
export class ToastItem {
  @Element() public host!: HTMLElement;

  /** Message of the toast-item. */
  @Prop() public message?: string = '';

  /** State of the toast-item. */
  @Prop() public state?: ToastItemState = 'neutral';

  /** Adapts the toast-item color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  public componentWillRender(): void {
    throwIfValueIsInvalid(this.state, TOAST_ITEM_STATES, 'state');
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);
  }

  public render(): JSX.Element {
    const toastId = 'toast';
    const labelId = 'label';
    const messageId = 'message';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pIcon class="icon" name={getIconName(this.state)} color="inherit" aria-hidden="true" />
        <div id={toastId} class="content" {...getContentAriaAttributes(labelId, messageId)}>
          <PrefixedTagNames.pText id={messageId}>{this.message || <slot />}</PrefixedTagNames.pText>
        </div>

        <PrefixedTagNames.pButtonPure
          class="close"
          type="button"
          icon="close"
          hideLabel={true}
          aria-controls={toastId}
          onClick={this.dismiss.emit}
        >
          Close notification
        </PrefixedTagNames.pButtonPure>
      </Host>
    );
  }
}
