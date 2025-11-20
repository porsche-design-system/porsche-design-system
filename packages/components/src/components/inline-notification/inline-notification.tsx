import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  HEADING_TAGS,
  hasHeading,
  validateProps,
} from '../../utils';
import { getComponentCss } from './inline-notification-styles';
import {
  getContentAriaAttributes,
  getInlineNotificationIconName,
  INLINE_NOTIFICATION_STATES,
  type InlineNotificationActionIcon,
  type InlineNotificationHeadingTag,
  type InlineNotificationState,
} from './inline-notification-utils';

const propTypes: PropTypes<typeof InlineNotification> = {
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<InlineNotificationHeadingTag>(HEADING_TAGS),
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<InlineNotificationState>(INLINE_NOTIFICATION_STATES),
  dismissButton: AllowedTypes.boolean,
  actionLabel: AllowedTypes.string,
  actionLoading: AllowedTypes.boolean,
  actionIcon: AllowedTypes.string, // TODO: we could use AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]) but then main chunk will increase
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

  /** Action label of the inline-notification. */
  @Prop() public actionLabel?: string;

  /** Disables the action button and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public actionLoading?: boolean = false;

  /** Action icon of the inline-notification. */
  @Prop() public actionIcon?: InlineNotificationActionIcon = 'arrow-right';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.state, !!this.actionLabel, this.dismissButton);

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
          color={this.state}
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
            icon={this.actionIcon}
            loading={this.actionLoading}
            onClick={this.action.emit}
          >
            {this.actionLabel}
          </PrefixedTagNames.pButtonPure>
        )}
        {this.dismissButton && (
          <PrefixedTagNames.pButton
            class="close"
            type="button"
            variant="secondary"
            icon="close"
            hideLabel={true}
            aria-controls={bannerId}
            onClick={this.dismiss.emit}
          >
            Close notification
          </PrefixedTagNames.pButton>
        )}
      </Host>
    );
  }
}
