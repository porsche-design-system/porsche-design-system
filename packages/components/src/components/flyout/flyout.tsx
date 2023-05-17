import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, Watch } from '@stencil/core';

import { FLYOUT_ARIA_ATTRIBUTES, FLYOUT_POSITIONS, FlyoutAriaAttribute, FlyoutPosition } from './flyout-utils';
import { getComponentCss } from './flyout-styles';

import { attachComponentCss, getPrefixedTagNames, hasNamedSlot, parseAndGetAriaAttributes, THEMES } from '../../utils';
import { AllowedTypes, PropTypes, validateProps } from '../../utils/validation/validateProps';
import { SelectedAriaAttributes, Theme } from '../../types';
import { clickStartedInScrollbarTrack } from '../modal/modal-utils';
import { setFocusTrap } from '../../utils/focusTrap';
import { setScrollLock } from '../../utils/scrollLock';

const propTypes: PropTypes<typeof Flyout> = {
  open: AllowedTypes.boolean,
  position: AllowedTypes.oneOf<FlyoutPosition>(FLYOUT_POSITIONS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<FlyoutAriaAttribute>(FLYOUT_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-flyout',
  shadow: true,
})
export class Flyout {
  @Element() public host!: HTMLElement;

  /** If true, the flyout is open. */
  @Prop() public open: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  // TODO: Naming: align or position?
  /** The position of the flyout */
  @Prop() public position?: FlyoutPosition = 'right';

  /** Adapts the flyout color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private dialog: HTMLElement;
  private dismissBtn: HTMLElement;
  private header: HTMLElement;
  private footer: HTMLElement;
  private hasHeader: boolean;
  private hasFooter: boolean;
  private hasSecondaryContent: boolean;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);
    this.updateFocusTrap(isOpen);

    if (isOpen) {
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    } else {
      this.focusedElBeforeOpen?.focus();
    }
  }

  public componentDidLoad(): void {
    // in case flyout is rendered with open prop
    if (this.open) {
      setScrollLock(true);
      this.updateFocusTrap(true);
    }
  }

  public componentDidRender(): void {
    if (this.open) {
      this.onScroll();
      // Necessary to select button to make :focus-visible work
      this.dismissBtn.shadowRoot.querySelector('button').focus();
    }
  }

  public disconnectedCallback(): void {
    setFocusTrap(this.host, false);
    setScrollLock(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasHeader = hasNamedSlot(this.host, 'header');
    this.hasFooter = hasNamedSlot(this.host, 'footer');
    this.hasSecondaryContent = hasNamedSlot(this.host, 'secondary-content');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      this.position,
      this.hasHeader,
      this.hasFooter,
      this.hasSecondaryContent,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const dismissBtn = (
      <PrefixedTagNames.pButtonPure
        class="dismiss"
        type="button"
        hideLabel
        icon="close"
        theme={this.theme}
        onClick={this.dismissFlyout}
        ref={(el) => (this.dismissBtn = el)}
      >
        Dismiss flyout
      </PrefixedTagNames.pButtonPure>
    );
    return (
      <Host onMouseDown={this.onMouseDown}>
        <div
          class="root"
          role="dialog"
          {...parseAndGetAriaAttributes({
            'aria-modal': true,
            'aria-hidden': !this.open,
            ...parseAndGetAriaAttributes(this.aria),
          })}
          tabIndex={-1}
          ref={(el) => (this.dialog = el)}
          onScroll={this.onScroll}
        >
          <div class="header" ref={(el) => (this.header = el)}>
            {this.hasHeader && (
              <div class="header-content">
                <slot name="header" />
              </div>
            )}
            {dismissBtn}
          </div>
          <div class="content">
            <slot />
          </div>
          {this.hasFooter && (
            <div class="footer" ref={(el) => (this.footer = el)}>
              <slot name="footer" />
            </div>
          )}
          {this.hasSecondaryContent && (
            <div class="secondary-content">
              <slot name="secondary-content" />
            </div>
          )}
        </div>
      </Host>
    );
  }

  private onMouseDown = (e: MouseEvent): void => {
    if ((e.composedPath() as HTMLElement[])[0] === this.host && !clickStartedInScrollbarTrack(this.host, e)) {
      this.dismissFlyout();
    }
  };

  private updateFocusTrap = (isOpen: boolean): void => {
    setFocusTrap(this.host, isOpen, this.dismissBtn, this.dismissFlyout);
  };

  private onScroll = (): void => {
    this.updateHeaderShadow();
    if (this.hasFooter) {
      this.updateFooterShadow();
    }
  };

  private updateHeaderShadow = (): void => {
    this.header.style.boxShadow = this.dialog.scrollTop > 10 ? 'rgba(204, 204, 204, 0.35) 0px 5px 10px' : 'none';
  };

  private updateFooterShadow = (): void => {
    const footerBottom = this.footer ? window.innerHeight - this.footer.getBoundingClientRect().bottom : 0;
    this.footer.style.boxShadow = footerBottom < 10 ? 'rgba(204, 204, 204, 0.35) 0px -5px 10px' : 'none';
  };

  private dismissFlyout = (): void => {
    this.dismiss.emit();
  };
}
