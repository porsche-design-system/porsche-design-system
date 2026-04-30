import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getSlotTextContent,
  hasNamedSlot,
  hasPropValueChanged,
  observeChildren,
  unobserveChildren,
  validateProps,
} from '../../utils';
import { NotificationBase } from '../common/notification-base/notification-base';
import { getComponentCss } from './banner-styles';
import {
  BANNER_HEADING_TAGS,
  BANNER_POSITIONS,
  BANNER_STATES,
  type BannerHeadingTag,
  type BannerPosition,
  type BannerState,
  getBannerAriaAttributes,
} from './banner-utils';

const propTypes: Omit<PropTypes<typeof Banner>, 'width'> = {
  open: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<BannerHeadingTag>(BANNER_HEADING_TAGS),
  description: AllowedTypes.string,
  position: AllowedTypes.breakpoint<BannerPosition>(BANNER_POSITIONS),
  state: AllowedTypes.oneOf<BannerState>(BANNER_STATES),
  dismissButton: AllowedTypes.boolean,
};

/**
 * @slot {"name": "heading", "description": "Defines the heading of the banner. Can be used as an alternative to the `heading` prop for rich content." }
 * @slot {"name": "", "description": "Default slot for the banner description content." }
 * @slot {"name": "description", "description": "Deprecated: Use the default slot instead.", "isDeprecated": true }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-banner',
  shadow: true,
})
export class Banner {
  @Element() public host!: HTMLElement;

  /** Controls whether the banner is open or closed. */
  @Prop() public open: boolean = false;

  /** Sets the heading text of the banner. */
  @Prop() public heading?: string = '';

  /** Sets the heading tag for proper semantic structure within the page. */
  @Prop() public headingTag?: BannerHeadingTag = 'h5';

  /** Sets the description text of the banner. */
  @Prop() public description?: string = '';

  /** Sets the position of the banner. */
  @Prop() public position?: BreakpointCustomizable<BannerPosition> = { base: 'bottom', s: 'top' };

  /** Defines the visual state of the banner. */
  @Prop() public state?: BannerState = 'info';

  /** Shows a dismiss button allowing the banner to be closed. */
  @Prop() public dismissButton?: boolean = true;

  /** Emitted when the banner is requested to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private refPopover: HTMLElement;
  private refDismiss: HTMLElement;
  private hasHeadingSlot: boolean;
  private hasDescriptionSlot: boolean;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    if (this.dismissButton) {
      if (isOpen) {
        document.addEventListener('keydown', this.onKeyboardEvent);
      } else {
        document.removeEventListener('keydown', this.onKeyboardEvent);
      }
    }
  }

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

    if (this.open && this.dismissButton) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);

    if (this.open && this.dismissButton) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    // showPopover needs to be called after render cycle to prepare visibility states of popover in order to focus the dismiss button correctly
    this.refPopover[this.open ? 'showPopover' : 'hidePopover']();
    this.refDismiss?.focus();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasHeadingSlot = hasNamedSlot(this.host, 'heading');
    this.hasDescriptionSlot = hasNamedSlot(this.host, 'description');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.position,
      this.state,
      this.dismissButton,
      !!(this.heading || this.hasHeadingSlot)
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const headingText = this.heading ? this.heading : getSlotTextContent(this.host, 'heading');

    return (
      <div
        popover="manual"
        aria-hidden={this.open ? 'false' : 'true'}
        {...getBannerAriaAttributes(this.state, headingText)}
        ref={(el: HTMLElement) => (this.refPopover = el)}
      >
        <NotificationBase
          heading={this.heading}
          headingTag={this.headingTag}
          hasHeadingSlot={this.hasHeadingSlot}
          description={this.description}
          hasDescriptionSlot={this.hasDescriptionSlot}
          {...(this.dismissButton && {
            dismissButton: (
              <PrefixedTagNames.pButton
                class="dismiss"
                type="button"
                variant="secondary"
                icon="close"
                hideLabel={true}
                compact={true}
                onClick={this.dismissBanner}
                {...(headingText ? { aria: { 'aria-description': headingText } } : {})}
                ref={(el: HTMLElement) => (this.refDismiss = el)}
              >
                Close banner
              </PrefixedTagNames.pButton>
            ),
          })}
        />
      </div>
    );
  }

  private onKeyboardEvent = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.dismissBanner();
    }
  };

  private dismissBanner = (): void => {
    this.dismiss.emit();
  };
}
