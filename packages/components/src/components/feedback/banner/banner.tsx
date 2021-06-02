import { JSX, Component, Prop, h, Element, Event, EventEmitter } from '@stencil/core';
import { getPrefixedTagNames, insertSlottedStyles, hasNamedSlot, isDark, getTagName } from '../../../utils';
import type { BannerState, Theme } from '../../../types';
import { addCss } from './banner-utils';

@Component({
  tag: 'p-banner',
  styleUrl: 'banner.scss',
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
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the close button is clicked. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private closeButton: HTMLButtonElement;

  public connectedCallback(): void {
    if (!this.persistent) {
      document.addEventListener('keydown', this.handleKeyboardEvents);
    }
    this.addSlottedStyles();
  }

  public componentWillRender(): void {
    addCss(this.host);
  }

  public componentDidLoad(): void {
    if (!this.persistent) {
      this.closeButton.focus();
    }
  }

  public disconnectedCallback(): void {
    if (!this.persistent) {
      document.removeEventListener('keydown', this.handleKeyboardEvents);
    }
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      [`root--${this.state}`]: this.state !== 'neutral',
      ['root--theme-dark']: isDark(this.theme),
    };

    const bannerLabelId = 'banner-label';
    const bannerDescriptionId = 'banner-description';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pContentWrapper
        width={this.width}
        role="alertdialog"
        aria-labelledby={bannerLabelId}
        aria-describedby={bannerDescriptionId}
      >
        <div class={rootClasses}>
          {this.state !== 'neutral' && (
            <PrefixedTagNames.pIcon name={this.state === 'error' ? 'exclamation' : 'warning'} class="icon" />
          )}
          <div class="content">
            {hasNamedSlot(this.host, 'title') && (
              <PrefixedTagNames.pHeadline variant="headline-5" id={bannerLabelId}>
                <slot name="title" />
              </PrefixedTagNames.pHeadline>
            )}
            {hasNamedSlot(this.host, 'description') && (
              <PrefixedTagNames.pText id={bannerDescriptionId}>
                <slot name="description" />
              </PrefixedTagNames.pText>
            )}
            {!this.persistent && (
              <div class="close">
                <PrefixedTagNames.pButtonPure
                  icon="close"
                  hideLabel={true}
                  onClick={this.removeBanner}
                  ref={(el) => (this.closeButton = el)}
                >
                  Close notification
                </PrefixedTagNames.pButtonPure>
              </div>
            )}
          </div>
        </div>
      </PrefixedTagNames.pContentWrapper>
    );
  }

  private handleKeyboardEvents = (e: KeyboardEvent): void => {
    const { key } = e;
    if (key === 'Esc' || key === 'Escape') {
      this.removeBanner();
    }
  };

  private removeBanner = (): void => {
    this.dismiss.emit();
    this.host.classList.add('banner--close');
    setTimeout(() => {
      this.host.remove();
    }, 1000);
  };

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
      transition: color .24s ease !important;
      outline: transparent solid 1px !important;
      outline-offset: 1px !important;
    }

    ${tagName} a:hover {
      color: #d5001c !important;
    }

    ${tagName} a:focus {
      outline-color: currentColor !important;
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
