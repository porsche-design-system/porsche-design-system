import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import { FLYOUT_NAVIGATION_ARIA_ATTRIBUTES, type FlyoutNavigationAriaAttribute } from './flyout-navigation-utils';
import { getComponentCss } from './flyout-navigation-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  setScrollLock,
  THEMES,
  validateProps,
} from '../../../utils';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../../types';

const propTypes: PropTypes<typeof FlyoutNavigation> = {
  open: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<FlyoutNavigationAriaAttribute>(FLYOUT_NAVIGATION_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-flyout-navigation',
  shadow: true,
})
export class FlyoutNavigation {
  @Element() public host!: HTMLElement;

  /** If true, the flyout-navigation is open. */
  @Prop() public open: boolean = false;

  /** Adapts the flyout-navigation color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutNavigationAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  private dialog: HTMLDialogElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);
    this.setDialogVisibility(isOpen);
  }

  public componentDidLoad(): void {
    // in case flyout is rendered with open prop
    if (this.open) {
      setScrollLock(true);
      this.setDialogVisibility(true);
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public disconnectedCallback(): void {
    setScrollLock(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.open, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        ref={(ref) => (this.dialog = ref)}
        onClick={(e: MouseEvent & { target: HTMLElement }) => {
          if (e.target.nodeName === 'DIALOG') {
            // dismiss dialog when clicked on backdrop
            this.dismissDialog();
          }
        }}
        onCancel={(e) => {
          // prevent closing the dialog uncontrolled by ESC (only relevant for browsers supporting <dialog/>)
          e.preventDefault();
          this.dismissDialog();
        }}
      >
        <PrefixedTagNames.pButtonPure
          class="dismiss"
          type="button"
          hideLabel
          icon="close"
          variant="secondary"
          theme="dark"
          onClick={this.dismissDialog}
        >
          Dismiss flyout
        </PrefixedTagNames.pButtonPure>
        <div class="nav">
          <slot name="level-1" />
          <slot name="level-2" />
        </div>
      </dialog>
    );
  }

  private setDialogVisibility(isOpen: boolean): void {
    if (isOpen === true) {
      this.dialog.showModal();
    } else {
      this.dialog.close();
    }
  }

  private dismissDialog = (): void => {
    this.dismiss.emit();
  };
}
