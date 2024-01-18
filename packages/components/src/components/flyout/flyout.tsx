import {
  Component,
  Element,
  Event,
  type EventEmitter,
  forceUpdate,
  h,
  Host,
  type JSX,
  Prop,
  Watch,
} from '@stencil/core';
import {
  FLYOUT_ARIA_ATTRIBUTES,
  FLYOUT_POSITIONS,
  FLYOUT_SCROLL_SHADOW_THRESHOLD,
  type FlyoutAriaAttribute,
  type FlyoutPosition,
  type FlyoutPositionDeprecated,
} from './flyout-utils';
import { footerShadowClass, getComponentCss, headerShadowClass } from './flyout-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasNamedSlot,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setFocusTrap,
  setScrollLock,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import { clickStartedInScrollbarTrack } from '../modal/modal-utils';
import { throttle } from 'throttle-debounce';
import { getShadowRootHTMLElements } from '../../utils/dom/getShadowRootHTMLElements';

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

  /** The position of the flyout */
  @Prop() public position?: FlyoutPosition = 'end';

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
  private subFooter: HTMLElement;
  private hasHeader: boolean;
  private hasFooter: boolean;
  private hasSubFooter: boolean;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);
    this.updateFocusTrap(isOpen);

    if (isOpen) {
      if (this.hasSubFooter) {
        this.onScroll();
      }
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

    // TODO: would be great to use this in jsx but that doesn't work reliable and causes focus e2e test to fail
    getShadowRootHTMLElements(this.host, 'slot').forEach((element) =>
      element.addEventListener('slotchange', () => {
        forceUpdate(this.host);

        this.dismissBtn.focus();
      })
    );
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    // TODO: should this really be executed on every rerender, e.g. prop change?
    if (this.open) {
      // TODO: why not scroll to top when opened just like modal does?

      if (this.hasSubFooter) {
        this.onScroll();
      }
      // Necessary to select button to make :focus-visible work
      getShadowRootHTMLElement(this.dismissBtn, 'button').focus();
    }
  }

  public disconnectedCallback(): void {
    setFocusTrap(this.host, false, this.dialog);
    setScrollLock(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    const positionDeprecationMap: Record<
      FlyoutPositionDeprecated,
      Exclude<FlyoutPosition, FlyoutPositionDeprecated>
    > = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Flyout, FlyoutPositionDeprecated, FlyoutPosition>(
      this,
      'position',
      positionDeprecationMap
    );

    this.hasHeader = hasNamedSlot(this.host, 'header');
    this.hasFooter = hasNamedSlot(this.host, 'footer');
    this.hasSubFooter = hasNamedSlot(this.host, 'sub-footer');

    attachComponentCss(
      this.host,
      getComponentCss,
      this.open,
      (positionDeprecationMap[this.position] || this.position) as Exclude<FlyoutPosition, FlyoutPositionDeprecated>,
      this.hasFooter,
      this.hasSubFooter,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /* @ts-ignore */
          inert={this.open ? null : true} // prevents focusable elements within nested open accordion
          ref={(el) => (this.dialog = el)}
          {...(this.hasSubFooter && { onScroll: this.onScroll })} // if no sub-footer is used scroll shadows are done via CSS
        >
          <div key="header" class="header" ref={(el) => (this.header = el)}>
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

            {this.hasHeader && <slot name="header" />}
          </div>
          <div class="content">
            <slot />
          </div>
          {this.hasFooter && (
            <div key="footer" class="footer" ref={(el) => (this.footer = el)}>
              <slot name="footer" />
            </div>
          )}
          {this.hasSubFooter && (
            <div key="sub-footer" class="sub-footer" ref={(el) => (this.subFooter = el)}>
              <slot name="sub-footer" />
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
    setFocusTrap(this.host, isOpen, this.dialog, this.dismissBtn, this.dismissFlyout);
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private onScroll = throttle(100, () => {
    if (this.dialog.scrollHeight > this.dialog.clientHeight) {
      this.updateHeaderShadow();
      if (this.hasFooter) {
        this.updateFooterShadow();
      }
    }
  });

  private updateHeaderShadow = (): void => {
    const shouldApplyShadow = this.dialog.scrollTop > FLYOUT_SCROLL_SHADOW_THRESHOLD;
    this.header.classList.toggle(headerShadowClass, shouldApplyShadow);
  };

  private updateFooterShadow = (): void => {
    const shouldApplyShadow = this.subFooter.offsetTop > this.dialog.clientHeight + this.dialog.scrollTop;
    this.footer.classList.toggle(footerShadowClass, shouldApplyShadow);
  };

  private dismissFlyout = (): void => {
    this.dismiss.emit();
  };
}
