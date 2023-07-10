import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import type { PropTypes, Theme } from '../../types';
import type { BannerState, BannerStateDeprecated, BannerWidth } from './banner-utils';
import { BANNER_STATES } from './banner-utils';
import {
  AllowedTypes,
  attachComponentCss,
  consoleWarn,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasNamedSlot,
  THEMES,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './banner-styles';
import { getDeprecatedPropOrSlotWarningMessage } from '../../utils/log/helper';

const propTypes: Omit<PropTypes<typeof Banner>, 'width'> = {
  open: AllowedTypes.boolean,
  heading: AllowedTypes.string,
  description: AllowedTypes.string,
  state: AllowedTypes.oneOf<BannerState>(BANNER_STATES),
  dismissButton: AllowedTypes.boolean,
  persistent: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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

  /** Description of the banner. */
  @Prop() public description?: string = '';

  /** State of the banner. */
  @Prop() public state?: BannerState = 'info';

  /** If false, the banner will not have a dismiss button. */
  @Prop() public dismissButton?: boolean = true;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `dismissButton` instead.
   * Defines if the banner can be closed/removed by the user. */
  @Prop() public persistent?: boolean;

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public width?: BannerWidth;

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private inlineNotificationElement: HTMLPInlineNotificationElement;
  private closeBtn: HTMLElement;

  private get hasDismissButton(): boolean {
    return this.persistent ? false : this.dismissButton;
  }

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    if (this.hasDismissButton) {
      if (isOpen) {
        this.closeBtn?.focus();
        document.addEventListener('keydown', this.onKeyboardEvent);
      } else {
        document.removeEventListener('keydown', this.onKeyboardEvent);
      }
    }
  }

  public connectedCallback(): void {
    if (this.open && this.hasDismissButton) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public componentDidLoad(): void {
    if (this.hasDismissButton) {
      // messy… optional chaining is needed in case child component is unmounted too early
      this.closeBtn = getShadowRootHTMLElement<HTMLElement>(this.inlineNotificationElement, '.close');
      this.closeBtn?.focus();
    }
  }

  public disconnectedCallback(): void {
    if (this.hasDismissButton) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropValueIsUsed<typeof Banner, BannerStateDeprecated, BannerState>(this, 'state', {
      neutral: 'info',
    });
    warnIfDeprecatedPropIsUsed<typeof Banner>(this, 'persistent', 'Please use dismissButton prop instead.');
    warnIfDeprecatedPropIsUsed<typeof Banner>(
      this,
      'width',
      'The component is aligned with Porsche Grid "extended" by default.'
    );
    const hasTitleSlot = hasNamedSlot(this.host, 'title');
    if (hasTitleSlot) {
      consoleWarn(
        getDeprecatedPropOrSlotWarningMessage(this.host, 'slot="title"'),
        'Please use the heading prop or slot="heading" instead.'
      );
    }
    attachComponentCss(this.host, getComponentCss, this.open);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pInlineNotification
        ref={(el) => (this.inlineNotificationElement = el)}
        heading={this.heading}
        description={this.description}
        state={this.state}
        dismissButton={this.hasDismissButton}
        theme={this.theme}
        onDismiss={this.removeBanner}
        aria-hidden={!this.open ? 'true' : 'false'}
      >
        {hasNamedSlot(this.host, 'heading') ? (
          <slot name="heading" slot="heading" />
        ) : (
          hasTitleSlot && <slot name="title" slot="heading" />
        )}
        {hasNamedSlot(this.host, 'description') && <slot name="description" />}
      </PrefixedTagNames.pInlineNotification>
    );
  }

  private onKeyboardEvent = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.removeBanner();
    }
  };

  private removeBanner = (e?: CustomEvent): void => {
    if (this.hasDismissButton) {
      e?.stopPropagation(); // prevent double event emission because of identical name
      this.dismiss.emit();
    }
  };
}
