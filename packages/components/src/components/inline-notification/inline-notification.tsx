import type { PropTypes, Theme } from '../../types';
import type { IconColor } from '../icon/icon-utils';
import type { InlineNotificationState, InlineNotificationStateDeprecated } from './inline-notification-utils';
import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  hasHeading,
  HEADING_TAGS,
  THEMES,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './inline-notification-styles';
import {
  getContentAriaAttributes,
  getInlineNotificationIconName,
  INLINE_NOTIFICATION_STATES,
} from './inline-notification-utils';
import type { InlineNotificationActionIcon, InlineNotificationHeadingTag } from './inline-notification-utils';
import { getSlottedAnchorStyles } from '../../styles';

const propTypes: PropTypes<typeof InlineNotification> = {
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<InlineNotificationHeadingTag>(HEADING_TAGS),
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<InlineNotificationState>(INLINE_NOTIFICATION_STATES),
  dismissButton: AllowedTypes.boolean,
  persistent: AllowedTypes.boolean,
  actionLabel: AllowedTypes.string,
  actionLoading: AllowedTypes.boolean,
  actionIcon: AllowedTypes.string, // TODO: we could use AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]) but then main chunk will increase
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "heading", "description": "Shows a heading. Can be used to render rich markup." }
 * @slot {"name": "", "description": "Default slot to render a description. Can be used to render rich markup." }
 */
@Component({
  tag: 'p-inline-notification',
  shadow: true,
})
export class InlineNotification {
  @Element() public host!: HTMLElement;

  /** Heading of the inline-notification. */
  @Prop() public heading?: string = '';

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public headingTag?: InlineNotificationHeadingTag = 'h5';

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

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  private get hasDismissButton(): boolean {
    return this.persistent ? false : this.dismissButton;
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
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
    const Heading = this.headingTag;

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
          {hasHeading(this.host, this.heading) &&
            (this.heading ? (
              <Heading id={labelId} class="heading">
                {this.heading}
              </Heading>
            ) : (
              <slot name="heading" />
            ))}
          <p id={descriptionId} class="description">
            {this.description || <slot />}
          </p>
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
            Close notification
          </PrefixedTagNames.pButtonPure>
        )}
      </Host>
    );
  }
}
