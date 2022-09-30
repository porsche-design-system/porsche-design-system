import { JSX, Component, Prop, h, Element, Event, EventEmitter, Host } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getPrefixedTagNames,
  hasHeading,
  THEMES,
  validateProps,
} from '../../utils';
import type { IconName, PropTypes, Theme } from '../../types';
import { getComponentCss, getSlottedCss } from './inline-notification-styles';
import { INLINE_NOTIFICATION_STATES, getContentAriaAttributes, getIconName } from './inline-notification-utils';
import type { InlineNotificationState } from './inline-notification-utils';

const propTypes: PropTypes<typeof InlineNotification> = {
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<InlineNotificationState>(INLINE_NOTIFICATION_STATES),
  persistent: AllowedTypes.boolean,
  actionLabel: AllowedTypes.string,
  actionLoading: AllowedTypes.boolean,
  actionIcon: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-inline-notification',
  shadow: true,
})
export class InlineNotification {
  @Element() public host!: HTMLElement;

  /** Heading of the inline-notification. */
  @Prop() public heading?: string = '';

  /** Description of the inline-notification. */
  @Prop() public description?: string = '';

  /** State of the inline-notification. */
  @Prop() public state?: InlineNotificationState = 'neutral';

  /** Defines if the inline-notification can be closed/removed by the user. */
  @Prop() public persistent?: boolean = false;

  /** Action label of the inline-notification. */
  @Prop() public actionLabel?: string;

  /** Disables the action button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public actionLoading?: boolean = false;

  /** Action icon of the inline-notification. */
  @Prop() public actionIcon?: IconName = 'arrow-head-right';

  /** Adapts the inline-notification color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.state, !!this.actionLabel, !this.persistent, this.theme);
  }

  public render(): JSX.Element {
    const bannerId = 'banner';
    const labelId = 'label';
    const descriptionId = 'description';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pIcon class="icon" name={getIconName(this.state)} color="inherit" aria-hidden="true" />
        <div id={bannerId} class="content" {...getContentAriaAttributes(this.state, labelId, descriptionId)}>
          {hasHeading(this.host, this.heading) && <h5 id={labelId}>{this.heading || <slot name="heading" />}</h5>}
          <p id={descriptionId}>{this.description || <slot />}</p>
        </div>
        {this.actionLabel && (
          <PrefixedTagNames.pButtonPure
            class="action"
            icon={this.actionIcon}
            loading={this.actionLoading}
            onClick={this.action.emit}
          >
            {this.actionLabel}
          </PrefixedTagNames.pButtonPure>
        )}
        {!this.persistent && (
          <PrefixedTagNames.pButtonPure
            class="close"
            type="button"
            icon="close"
            hideLabel={true}
            aria-controls={bannerId}
            onClick={this.dismiss.emit}
          >
            Close notification
          </PrefixedTagNames.pButtonPure>
        )}
      </Host>
    );
  }
}
