import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import {
  FLYOUT_ARIA_ATTRIBUTES,
  FLYOUT_POSITIONS,
  type FlyoutAriaAttribute,
  type FlyoutPosition,
  type FlyoutPositionDeprecated,
} from './flyout-utils';
import { getComponentCss } from './flyout-styles';
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
  private header: HTMLSlotElement;
  private footer: HTMLSlotElement;
  private subFooter: HTMLSlotElement;
  private hasHeader: boolean;
  private hasFooter: boolean;
  private hasSubFooter: boolean;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);

    if (isOpen && this.hasSubFooter) {
      // this.updateShadow();
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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.toggleAttribute('data-stuck', !entry.isIntersecting);
        });
      },
      {
        root: this.dialog,
        threshold: 1,
      }
    );

    if (this.hasHeader) {
      io.observe(this.header);
    }
    if (this.hasFooter) {
      io.observe(this.footer);
    }
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
      // this.updateShadow();
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
        inert={this.open ? null : true} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
        tabIndex={-1} // dialog always has a dismiss button to be focused
        ref={(el) => (this.dialog = el)}
        onCancel={this.onCancelDialog}
        onClick={this.onClickDialog}
        {...parseAndGetAriaAttributes(this.aria)}
      >
        <PrefixedTagNames.pButtonPure
          class="dismiss"
          type="button"
          hideLabel
          icon="close"
          theme={this.theme}
          onClick={this.dismissDialog}
        >
          Dismiss flyout
        </PrefixedTagNames.pButtonPure>
        <div class="scroller">
          <div class="flyout">
            {this.hasHeader && <slot name="header" ref={(el: HTMLSlotElement) => (this.header = el)} />}
            <slot />
            {this.hasFooter && <slot name="footer" ref={(el: HTMLSlotElement) => (this.footer = el)} />}
            {this.hasSubFooter && <slot name="sub-footer" ref={(el: HTMLSlotElement) => (this.subFooter = el)} />}
          </div>
        </div>
      </dialog>
    );
  }

  private onSlotChange = (): void => {
    // forceUpdate(this.host);
    // this.dismissBtn.focus();
  };

  private onClickDialog = (e: MouseEvent & { target: HTMLElement }): void => {
    if (e.target.className === 'scroller') {
      // dismiss dialog when clicked on backdrop
      this.dismissDialog();
    }
  };

  private onCancelDialog = (e: Event): void => {
    // prevent closing the dialog uncontrolled by ESC (only relevant for browsers supporting <dialog/>)
    e.preventDefault();
    this.dismissDialog();
  };

  private dismissDialog = (): void => {
    this.dismiss.emit();
  };

  private setDialogVisibility(isOpen: boolean): void {
    // Only call showModal/close on dialog when state changes
    if (isOpen === true && !this.dialog.open) {
      this.dialog.showModal();
    } else if (isOpen === false && this.dialog.open) {
      this.dialog.close();
    }
  }
}
