import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, Watch } from '@stencil/core';
import {
  type FlyoutNavigationUpdateEvent,
  INTERNAL_DISMISS_EVENT_NAME,
  INTERNAL_UPDATE_EVENT_NAME,
  syncFlyoutNavigationItemsProps,
} from './flyout-navigation-utils';
import { getComponentCss } from './flyout-navigation-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  setScrollLock,
  THEMES,
  throwIfChildrenAreNotOfKind,
  validateProps,
} from '../../../utils';
import { type PropTypes, type Theme } from '../../../types';

const propTypes: PropTypes<typeof FlyoutNavigation> = {
  activeId: AllowedTypes.string,
  open: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-flyout-navigation',
  shadow: true,
})
export class FlyoutNavigation {
  @Element() public host!: HTMLElement;

  // TODO: shouldn't open prop be changed internally too?
  /** If true, the flyout-navigation is visualized as opened. */
  @Prop() public open: boolean = false;

  /** Defines which flyout-navigation-item to be visualized as opened. */
  @Prop({ mutable: true }) public activeId?: string = undefined;

  /** Adapts the flyout-navigation color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  // TODO: return type is missing
  /** Emitted when activeId state is changed. */
  @Event({ bubbles: false }) public update?: EventEmitter<FlyoutNavigationUpdateEvent>;

  private dialog: HTMLDialogElement;
  private flyoutNavigationItemElements: HTMLPFlyoutNavigationItemElement[] = [];

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);
    this.setDialogVisibility(isOpen);
  }

  public componentWillLoad(): void {
    this.defineFlyoutNavigationItemElements();

    this.host.shadowRoot.addEventListener(INTERNAL_UPDATE_EVENT_NAME, (e: CustomEvent<FlyoutNavigationUpdateEvent>) => {
      e.stopPropagation(); // prevents internal event from bubbling further
      const activeId = e.detail.activeId;
      this.activeId = activeId;
      this.update.emit({ activeId });
    });

    this.host.shadowRoot.addEventListener(INTERNAL_DISMISS_EVENT_NAME, (e) => {
      e.stopPropagation(); // prevents internal event from bubbling further
      this.dismissDialog();
    });
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.defineFlyoutNavigationItemElements);
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
    attachComponentCss(this.host, getComponentCss, this.open, !!this.activeId, this.theme);
    syncFlyoutNavigationItemsProps(this.flyoutNavigationItemElements, this.activeId, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        ref={(ref) => (this.dialog = ref)}
        onClick={(e) => this.onClickDialog(e)}
        onCancel={(e) => this.onCancelDialog(e)}
      >
        <div class="wrapper">
          <div class="drawer">
            <div class="header">
              <PrefixedTagNames.pButtonPure
                class="dismiss"
                type="button"
                size="medium"
                hideLabel={true}
                icon="close"
                theme="light"
                onClick={this.dismissDialog}
              >
                Dismiss flyout
              </PrefixedTagNames.pButtonPure>
            </div>
            <div class="content">
              <slot />
            </div>
          </div>
        </div>
      </dialog>
    );
  }

  private defineFlyoutNavigationItemElements = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'p-flyout-navigation-item');
    this.flyoutNavigationItemElements = Array.from(this.host.children) as HTMLPFlyoutNavigationItemElement[];
  };

  private onClickDialog(e: MouseEvent): void {
    if ((e.target as any).nodeName === 'DIALOG') {
      // dismiss dialog when clicked on backdrop
      this.dismissDialog();
    }
  }

  private onCancelDialog(e: Event): void {
    // prevent closing the dialog uncontrolled by ESC (only relevant for browsers supporting <dialog/>)
    e.preventDefault();
    this.dismissDialog();
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
