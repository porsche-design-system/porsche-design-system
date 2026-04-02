import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getSlotTextContent,
  hasPropValueChanged,
  validateProps,
} from '../../utils';
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

  public disconnectedCallback(): void {
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
    attachComponentCss(this.host, getComponentCss, this.open, this.position, this.state, this.dismissButton);

    const Heading = this.headingTag;
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const headingText = this.heading ? this.heading : getSlotTextContent(this.host, 'heading');

    return (
      <div
        popover="manual"
        aria-hidden={this.open ? 'false' : 'true'}
        {...getBannerAriaAttributes(this.state, headingText)}
        ref={(el: HTMLElement) => (this.refPopover = el)}
      >
        <div class="banner">
          {this.heading ? <Heading>{this.heading}</Heading> : <slot name="heading" />}
          {this.description ? <p>{this.description}</p> : <slot name="description" />}
          {this.dismissButton && (
            <PrefixedTagNames.pButton
              class="dismiss"
              type="button"
              variant="secondary"
              icon="close"
              hideLabel={true}
              compact={true}
              onClick={this.dismissBanner}
              aria={{ 'aria-description': this.heading }}
              ref={(el: HTMLElement) => (this.refDismiss = el)}
            >
              Close banner
            </PrefixedTagNames.pButton>
          )}
        </div>
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
