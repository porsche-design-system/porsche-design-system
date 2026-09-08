import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getSlotTextContent,
  hasNamedSlot,
  observeChildren,
  unobserveChildren,
  validateProps,
} from '../../utils';
import { FCDismissButton } from '../common/fc-dismiss-button/fc-dismiss-button';
import { NotificationBase } from '../common/notification-base/notification-base';
import { getComponentCss } from './inline-notification-styles';
import {
  getInlineNotificationAriaAttributes,
  INLINE_NOTIFICATION_HEADING_TAGS,
  INLINE_NOTIFICATION_STATES,
  type InlineNotificationActionIcon,
  type InlineNotificationHeadingTag,
  type InlineNotificationState,
} from './inline-notification-utils';

const propTypes: PropTypes<typeof InlineNotification> = {
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<InlineNotificationHeadingTag>(INLINE_NOTIFICATION_HEADING_TAGS),
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<InlineNotificationState>(INLINE_NOTIFICATION_STATES),
  dismissButton: AllowedTypes.boolean,
  actionLabel: AllowedTypes.string,
  actionLoading: AllowedTypes.boolean,
  actionIcon: AllowedTypes.string, // TODO: we could use AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]) but then main chunk will increase
};

/**
 * @slot {"name": "heading", "description": "Defines the heading of the inline notification. Can be used as an alternative to the `heading` prop for rich content." }
 * @slot {"name": "", "description": "Default slot for the inline notification description content." }
 */
@Component({
  tag: 'p-inline-notification',
  shadow: true,
})
export class InlineNotification {
  @Element() public host!: HTMLElement;

  /** Sets the heading text displayed at the top of the inline notification. */
  @Prop() public heading?: string = '';

  /** Sets the HTML heading tag (e.g. h2, h3) to maintain correct document structure. */
  @Prop() public headingTag?: InlineNotificationHeadingTag = 'h5';

  /** Sets the supporting description text shown below the heading. */
  @Prop() public description?: string = '';

  /** Sets the visual state — controls the icon and color scheme (`info`, `warning`, `error`, `success`). */
  @Prop() public state?: InlineNotificationState = 'info';

  /** Shows a dismiss button so the user can manually close the notification. */
  @Prop() public dismissButton?: boolean = true;

  /** Sets the label text of the optional action button inside the notification. */
  @Prop() public actionLabel?: string;

  /** Disables the action button and shows a spinner to indicate an ongoing operation. */
  @Prop() public actionLoading?: boolean = false;

  /** Sets the icon displayed inside the action button using a PDS icon name. */
  @Prop() public actionIcon?: InlineNotificationActionIcon = 'arrow-right';

  /** Emitted when the user clicks the dismiss button. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when the user clicks the action button. */
  @Event({ bubbles: false }) public action?: EventEmitter<void>;

  private hasHeadingSlot: boolean;

  public connectedCallback(): void {
    // Observe dynamic slot changes (only needed until :has-slotted CSS pseudo-class gets better support)
    observeChildren(
      this.host,
      () => {
        forceUpdate(this.host);
      },
      undefined,
      { subtree: false, childList: true, attributes: false }
    );
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasHeadingSlot = hasNamedSlot(this.host, 'heading');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.state,
      !!this.actionLabel,
      this.dismissButton,
      !!(this.heading || this.hasHeadingSlot)
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const headingText = this.heading ? this.heading : getSlotTextContent(this.host, 'heading');

    return (
      <NotificationBase
        {...getInlineNotificationAriaAttributes(this.state, headingText)}
        heading={this.heading}
        headingTag={this.headingTag}
        hasHeadingSlot={this.hasHeadingSlot}
        description={this.description}
        {...(this.actionLabel && {
          actionLabel: (
            <PrefixedTagNames.pButtonPure
              class="action"
              icon={this.actionIcon}
              loading={this.actionLoading}
              onClick={this.action.emit}
            >
              {this.actionLabel}
            </PrefixedTagNames.pButtonPure>
          ),
        })}
        {...(this.dismissButton && {
          dismissButton: (
            <FCDismissButton
              label="Close notification"
              onClick={this.dismiss.emit}
              ariaDescription={headingText || undefined}
            />
          ),
        })}
      />
    );
  }
}
