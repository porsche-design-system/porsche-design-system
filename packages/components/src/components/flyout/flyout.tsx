import { Component, Element, Event, type EventEmitter, forceUpdate, h, type JSX, Prop, Watch } from '@stencil/core';
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
  getShadowRootHTMLElements,
  hasNamedSlot,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setScrollLock,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import { throttle } from 'throttle-debounce';

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

  private dialog: HTMLDialogElement;
  private wrapper: HTMLDivElement;
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

    if (isOpen && this.hasSubFooter) {
      this.updateShadow();
    }
  }

  public componentDidLoad(): void {
    // in case flyout is rendered with open prop
    if (this.open) {
      setScrollLock(true);

      this.setDialogVisibility(true);
    }

    // TODO: would be great to use this in jsx but that doesn't work reliable and causes focus e2e test to fail
    getShadowRootHTMLElements(this.host, 'slot').forEach((element) =>
      element.addEventListener('slotchange', this.onSlotChange)
    );
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    // showModal needs to be called after render cycle to prepare visibility states of dialog in order to focus the dismiss button correctly
    this.setDialogVisibility(this.open);

    // TODO: should this really be executed on every rerender, e.g. prop change?
    if (this.open && this.hasSubFooter) {
      // TODO: why not scroll to top when opened just like modal does?
      this.updateShadow();
    }
  }

  public disconnectedCallback(): void {
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
      <dialog
        // ignore needed for pipeline
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        inert={this.open ? null : true} // prevents focusable elements during fade-out transition
        tabIndex={-1} // dialog always has a dismiss button to be focused
        ref={(ref) => (this.dialog = ref)}
        onCancel={this.onCancelDialog}
        onClick={this.onClickDialog}
        {...parseAndGetAriaAttributes(this.aria)}
      >
        <div
          class="wrapper"
          ref={(ref) => (this.wrapper = ref)}
          {...(this.hasSubFooter && { onScroll: this.updateShadow })} // if no sub-footer is used scroll shadows are done via CSS
        >
          <div key="header" class="header" ref={(el) => (this.header = el)}>
            <PrefixedTagNames.pButtonPure
              class="dismiss"
              type="button"
              hideLabel
              icon="close"
              theme={this.theme}
              onClick={this.dismissDialog}
              ref={(el: HTMLButtonElement) => (this.dismissBtn = el)}
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
      </dialog>
    );
  }

  private updateHeaderShadow = (): void => {
    const shouldApplyShadow = this.wrapper.scrollTop > FLYOUT_SCROLL_SHADOW_THRESHOLD;

    this.header.classList.toggle(headerShadowClass, shouldApplyShadow);
  };

  private updateFooterShadow = (): void => {
    const shouldApplyShadow = this.subFooter.offsetTop > this.wrapper.clientHeight + this.wrapper.scrollTop;

    this.footer.classList.toggle(footerShadowClass, shouldApplyShadow);
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private updateShadow = throttle(100, () => {
    if (this.wrapper.scrollHeight > this.wrapper.clientHeight) {
      this.updateHeaderShadow();

      if (this.hasFooter) {
        this.updateFooterShadow();
      }
    }
  });

  private onClickDialog = (e: MouseEvent & { target: HTMLElement }): void => {
    if (e.target.tagName === 'DIALOG') {
      // dismiss dialog when clicked on backdrop
      this.dismissDialog();
    }
  };

  private onSlotChange = (): void => {
    forceUpdate(this.host);

    this.dismissBtn.focus();
  };

  private onCancelDialog = (e: Event): void => {
    // prevent closing the dialog uncontrolled by ESC (only relevant for browsers supporting <dialog/>)
    e.preventDefault();

    this.dismissDialog();
  };

  private setDialogVisibility(isOpen: boolean): void {
    // TODO: SupportsNativeDialog check
    // Only call showModal/close on dialog when state changes
    if (isOpen === true && !this.dialog.open) {
      this.dialog.showModal();
    } else if (isOpen === false && this.dialog.open) {
      this.dialog.close();
    }
  }

  private dismissDialog = (): void => {
    this.dismiss.emit();
  };
}
