import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop, Watch } from '@stencil/core';
import type { PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  HEADING_TAGS,
  hasNamedSlot,
  validateProps,
} from '../../utils';
import { getComponentCss } from './banner-styles';
import { BANNER_STATES, type BannerHeadingTag, type BannerState } from './banner-utils';

const propTypes: Omit<PropTypes<typeof Banner>, 'width'> = {
  open: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  headingTag: AllowedTypes.oneOf<BannerHeadingTag>(HEADING_TAGS),
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<BannerState>(BANNER_STATES),
  dismissButton: AllowedTypes.boolean,
};

/**
 * @slot {"name": "heading", "description": "Defines the heading used in the banner. Can be used alternatively to the heading prop. Can be used for rich content.", "hasAltProp": true }
 * @slot {"name": "description", "description": "Defines the description used in the banner. Can be used alternatively to the description prop. Can be used for rich content.", "hasAltProp": true }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'p-banner',
  shadow: true,
})
export class Banner {
  @Element() public host!: HTMLElement;

  /** If true, the banner is open. */
  @Prop() public open: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** Heading of the banner. */
  @Prop() public heading?: string = '';

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public headingTag?: BannerHeadingTag = 'h5';

  /** Description of the banner. */
  @Prop() public description?: string = '';

  /** State of the banner. */
  @Prop() public state?: BannerState = 'info';

  /** If false, the banner will not have a dismiss button. */
  @Prop() public dismissButton?: boolean = true;

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private inlineNotificationElement: HTMLPInlineNotificationElement;
  private closeBtn: HTMLElement;

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
    if (this.open && this.dismissButton) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public componentDidRender(): void {
    // showPopover needs to be called after render cycle to prepare visibility states of popover in order to focus the dismiss button correctly
    this.setBannerVisibility(this.open);

    if (this.dismissButton) {
      this.closeBtn = getShadowRootHTMLElement<HTMLElement>(this.inlineNotificationElement, '.close');
      this.closeBtn?.focus();
    }
  }

  public disconnectedCallback(): void {
    if (this.open && this.dismissButton) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.open);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host popover="manual">
        <PrefixedTagNames.pInlineNotification
          ref={(el: HTMLPInlineNotificationElement) => (this.inlineNotificationElement = el)}
          heading={this.heading}
          headingTag={this.headingTag}
          description={this.description}
          state={this.state}
          dismissButton={this.dismissButton}
          onDismiss={this.onDismiss}
          aria-hidden={this.open ? 'false' : 'true'}
        >
          {hasNamedSlot(this.host, 'heading') && <slot name="heading" slot="heading" />}
          {hasNamedSlot(this.host, 'description') && <slot name="description" />}
        </PrefixedTagNames.pInlineNotification>
      </Host>
    );
  }

  private onKeyboardEvent = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.dismissBanner();
    }
  };

  private onDismiss = (event?: CustomEvent): void => {
    if (this.dismissButton) {
      event?.stopPropagation(); // prevent double event emission because of identical name
      this.dismiss.emit();
    }
  };

  private setBannerVisibility(isOpen: boolean): void {
    if (isOpen) {
      this.host.showPopover();
    } else {
      this.host.hidePopover();
    }
  }

  private dismissBanner = (): void => {
    this.dismiss.emit();
  };
}
