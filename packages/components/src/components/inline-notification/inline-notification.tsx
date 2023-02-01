import type { IconName, PropTypes, Theme } from '../../types';
import type { IconColor } from '../icon/icon-utils';
import type { InlineNotificationState } from './inline-notification-utils';
import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasHeading,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './inline-notification-styles';
import {
  getContentAriaAttributes,
  getInlineNotificationIconName,
  INLINE_NOTIFICATION_STATES,
} from './inline-notification-utils';

const propTypes: PropTypes<typeof InlineNotification> = {
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<InlineNotificationState>(INLINE_NOTIFICATION_STATES),
  persistent: AllowedTypes.boolean,
  actionLabel: AllowedTypes.string,
  actionLoading: AllowedTypes.boolean,
  actionIcon: AllowedTypes.string, // TODO: we could use AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]) but then main chunk will increase
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
  @Prop() public state?: InlineNotificationState = 'info';

  /** Defines if the inline-notification can be closed/removed by the user. */
  @Prop() public persistent?: boolean = false;

  /** Action label of the inline-notification. */
  @Prop() public actionLabel?: string;

  /** Disables the action button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public actionLoading?: boolean = false;

  /** Action icon of the inline-notification. */
  @Prop() public actionIcon?: IconName = 'arrow-right';

  /** Adapts the inline-notification color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const deprecatedStateMap: Partial<Record<InlineNotificationState, InlineNotificationState>> = {
      neutral: 'info',
    };
    warnIfDeprecatedPropValueIsUsed(this.host, 'state', deprecatedStateMap);
    attachComponentCss(this.host, getComponentCss, this.state, !!this.actionLabel, !this.persistent, this.theme);

    const bannerId = 'banner';
    const labelId = 'label';
    const descriptionId = 'description';
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
        <div id={bannerId} class="content" {...getContentAriaAttributes(this.state, labelId, descriptionId)}>
          {hasHeading(this.host, this.heading) && <h5 id={labelId}>{this.heading || <slot name="heading" />}</h5>}
          <p id={descriptionId}>{this.description || <slot />}</p>
        </div>
        {this.actionLabel && (
          <PrefixedTagNames.pButtonPure
            class="action"
            theme={this.theme}
            icon={this.actionIcon}
            loading={this.actionLoading}
            onClick={this.action.emit}
          >
            {this.actionLabel}
          </PrefixedTagNames.pButtonPure>
        )}
        {!this.persistent && (
          <PrefixedTagNames.pButtonPure
            type="button"
            icon="close"
            theme={this.theme}
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
