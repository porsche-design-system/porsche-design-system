import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import type { ToastState } from '../toast/toast-utils';
import { TOAST_STATES } from '../toast/toast-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  THEMES,
  throwIfRootNodeIsNotOneOfKind,
  validateProps,
} from '../../../utils';
import type { PropTypes, Theme } from '../../../types';
import { getComponentCss } from './toast-item-styles';
import { getIconName } from '../../inline-notification/inline-notification-utils';

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
  @Prop() public state?: ToastState = 'neutral';

  /** Adapts the toast-item color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event() public dismiss?: EventEmitter<void>;

  public connectedCallback(): void {
    throwIfRootNodeIsNotOneOfKind(this.host, ['p-toast']);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.state, this.theme);
  }

  public render(): JSX.Element {
    const toastId = 'toast';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pIcon class="icon" name={getIconName(this.state)} color="inherit" aria-hidden="true" />
        <p id={toastId} class="content" role="status" aria-live="polite">
          {this.text}
        </p>
        <PrefixedTagNames.pButtonPure
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
