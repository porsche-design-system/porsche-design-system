import type { PropTypes, Theme } from '../../types';
import type { IconColor } from '../icon/icon-utils';
import type { InlineNotificationState, InlineNotificationStateDeprecated } from './inline-notification-utils';
import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasHeading,
  THEMES,
  translate,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './inline-notification-styles';
import {
  fallbackWordings,
  getContentAriaAttributes,
  getInlineNotificationIconName,
  INLINE_NOTIFICATION_STATES,
} from './inline-notification-utils';
import type { InlineNotificationActionIcon, InlineNotificationWordings } from './inline-notification-utils';

// TODO: wordings prop should not be omitted, but generateComponentMeta can't handle it currently
const propTypes: Omit<PropTypes<typeof InlineNotification>, 'wordings'> = {
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<InlineNotificationState>(INLINE_NOTIFICATION_STATES),
  dismissButton: AllowedTypes.boolean,
  persistent: AllowedTypes.boolean,
  actionLabel: AllowedTypes.string,
  actionLoading: AllowedTypes.boolean,
  actionIcon: AllowedTypes.string, // TODO: we could use AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]) but then main chunk will increase
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  // wordings: AllowedTypes.shape<InlineNotificationWordings>({ dismiss: AllowedTypes.string }),
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

  /** If false, the inline-notification will not have a dismiss button. */
  @Prop() public dismissButton?: boolean = true;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `dismissButton` instead.
   * Defines if the inline-notification can be closed/removed by the user. */
  @Prop() public persistent?: boolean;

  /** Action label of the inline-notification. */
  @Prop() public actionLabel?: string;

  /** Disables the action button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public actionLoading?: boolean = false;

  /** Action icon of the inline-notification. */
  @Prop() public actionIcon?: InlineNotificationActionIcon = 'arrow-right';

  /** Adapts the inline-notification color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @Prop() public wordings?: InlineNotificationWordings;

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  private get hasDismissButton(): boolean {
    return this.persistent ? false : this.dismissButton;
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropValueIsUsed<
      typeof InlineNotification,
      InlineNotificationStateDeprecated,
      InlineNotificationState
    >(this, 'state', {
      neutral: 'info',
    });
    warnIfDeprecatedPropIsUsed<typeof InlineNotification>(this, 'persistent', 'Please use dismissButton prop instead.');
    attachComponentCss(this.host, getComponentCss, this.state, !!this.actionLabel, this.hasDismissButton, this.theme);

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
        {this.hasDismissButton && (
          <PrefixedTagNames.pButtonPure
            class="close"
            type="button"
            icon="close"
            theme={this.theme}
            hideLabel={true}
            aria-controls={bannerId}
            onClick={this.dismiss.emit}
          >
            {translate(this.wordings, fallbackWordings, 'dismiss')}
          </PrefixedTagNames.pButtonPure>
        )}
      </Host>
    );
  }
}
