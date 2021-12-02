import { JSX, Component, Prop, h, Element, Event, EventEmitter, Host } from '@stencil/core';
import {
  getPrefixedTagNames,
  hasNamedSlot,
  attachComponentCss,
  getShadowRootHTMLElement,
  throwIfValueIsInvalid,
  attachSlottedCss,
} from '../../../utils';
import type { Theme } from '../../../types';
import { getComponentCss, getSlottedCss } from './banner-styles';
import type { BannerState } from './banner-utils';
import { BANNER_STATES } from './banner-utils';

@Component({
  tag: 'p-banner',
  shadow: true,
})
export class Banner {
  @Element() public host!: HTMLElement;

  /** State of the banner. */
  @Prop() public state?: BannerState = 'neutral';

  /** Defines if the banner can be closed/removed by the user. */
  @Prop() public persistent?: boolean = false;

  /** Defines the width of the banner corresponding to the `content-wrapper` dimensions */
  @Prop() public width?: 'basic' | 'extended' | 'fluid' = 'basic';

  /** Adapts the banner color depending on the theme. */
  @Prop() public theme?: Exclude<Theme, 'light-electric'> = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private inlineNotificationElement: HTMLPInlineNotificationElement;

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss);
    attachSlottedCss(this.host, getSlottedCss);
    if (!this.persistent) {
      document.addEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public componentDidLoad(): void {
    if (!this.persistent) {
      // messy.. optional chaining is needed in case child component is unmounted to early
      getShadowRootHTMLElement<HTMLElement>(this.inlineNotificationElement, '.close')?.focus();
    }
  }

  public componentWillRender(): void {
    throwIfValueIsInvalid(this.state, BANNER_STATES, 'state');
  }

  public disconnectedCallback(): void {
    if (!this.persistent) {
      document.removeEventListener('keydown', this.onKeyboardEvent);
    }
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pContentWrapper width={this.width}>
          <PrefixedTagNames.pInlineNotification
            ref={(el) => (this.inlineNotificationElement = el)}
            class="root"
            state={this.state}
            persistent={this.persistent}
            theme={this.theme}
            onDismiss={this.removeBanner}
          >
            {hasNamedSlot(this.host, 'title') && <slot name="title" slot="heading" />}
            {hasNamedSlot(this.host, 'description') && <slot name="description" />}
          </PrefixedTagNames.pInlineNotification>
        </PrefixedTagNames.pContentWrapper>
      </Host>
    );
  }

  private onKeyboardEvent = ({ key }: KeyboardEvent): void => {
    if (key === 'Esc' || key === 'Escape') {
      this.removeBanner();
    }
  };

  private removeBanner = (e?: CustomEvent): void => {
    e?.stopPropagation(); // prevent double event emission because of identical name
    this.dismiss.emit();
    this.host.classList.add('banner--close');
    setTimeout(() => {
      this.host.remove();
    }, 600); // duration of animation
  };
}
