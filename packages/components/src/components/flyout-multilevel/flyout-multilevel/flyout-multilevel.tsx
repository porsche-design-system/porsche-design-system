import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, State, Watch } from '@stencil/core';
import {
  FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES,
  type FlyoutMultilevelAriaAttribute,
  type FlyoutMultilevelUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
  syncFlyoutMultilevelItemsProps,
  validateActiveIdentifier,
} from './flyout-multilevel-utils';
import { getComponentCss } from './flyout-multilevel-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getDirectChildHTMLElementOfKind,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setScrollLock,
  THEMES,
  validateProps,
} from '../../../utils';
import { type PropTypes, type SelectedAriaAttributes, type Theme } from '../../../types';

const propTypes: PropTypes<typeof FlyoutMultilevel> = {
  activeIdentifier: AllowedTypes.string,
  open: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<FlyoutMultilevelAriaAttribute>(FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot to render p-flyout-multilevel items." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 * @controlled {"props": ["activeIdentifier"], "event": "update"}
 *
 * @experimental
 */
@Component({
  tag: 'p-flyout-multilevel',
  shadow: true,
})
export class FlyoutMultilevel {
  @Element() public host!: HTMLElement;

  // TODO: shouldn't open prop be changed internally too?
  /** If true, the flyout-multilevel is visualized as opened. */
  @Prop() public open?: boolean = false;

  /** Defines which flyout-multilevel-item to be visualized as opened. */
  @Prop() public activeIdentifier?: string | undefined;

  /** Adapts the flyout-multilevel color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutMultilevelAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when activeIdentifier is changed. */
  @Event({ bubbles: false }) public update?: EventEmitter<FlyoutMultilevelUpdateEventDetail>;

  @State() private flyoutMultilevelItemElements: HTMLPFlyoutMultilevelItemElement[] = [];

  private dialog: HTMLDialogElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);
  }

  public componentWillLoad(): void {
    this.defineFlyoutMultilevelItemElements();

    this.host.shadowRoot.addEventListener(
      INTERNAL_UPDATE_EVENT_NAME,
      (e: CustomEvent<FlyoutMultilevelUpdateEventDetail>) => {
        e.stopPropagation(); // prevents internal event from bubbling further
        const activeIdentifier = e.detail.activeIdentifier;
        this.update.emit({ activeIdentifier });
      }
    );
  }

  public componentDidLoad(): void {
    if (this.open) {
      setScrollLock(true);
      this.setDialogVisibility(true);
    }
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.defineFlyoutMultilevelItemElements);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    // showModal needs to be called after render cycle to prepare visibility states of dialog in order to focus the dismiss button correctly
    this.setDialogVisibility(this.open);
  }

  public disconnectedCallback(): void {
    setScrollLock(false);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    validateActiveIdentifier(this, this.flyoutMultilevelItemElements, this.activeIdentifier);
    attachComponentCss(this.host, getComponentCss, this.open, !!this.activeIdentifier, this.theme);
    syncFlyoutMultilevelItemsProps(this.flyoutMultilevelItemElements, this.activeIdentifier, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
        // eslint-disable-next-line
        /* @ts-ignore */
        inert={this.open ? null : true} // prevents focusable elements during fade-out transition
        tabIndex={-1} // dialog always has a dismiss button to be focused
        ref={(ref) => (this.dialog = ref)}
        onCancel={this.onCancelDialog}
        onClick={this.onClickDialog}
      >
        <div class="header">
          <PrefixedTagNames.pButtonPure
            class="dismiss"
            type="button"
            size="medium"
            icon="close"
            hideLabel={true}
            theme={this.theme}
            onClick={this.dismissDialog}
          >
            Dismiss flyout
          </PrefixedTagNames.pButtonPure>
        </div>
        <div class="scroller">
          <nav class="content" {...parseAndGetAriaAttributes(this.aria)}>
            <slot />
          </nav>
        </div>
      </dialog>
    );
  }

  private defineFlyoutMultilevelItemElements = (): void => {
    this.flyoutMultilevelItemElements = getDirectChildHTMLElementOfKind(
      this.host,
      'p-flyout-multilevel-item'
    ) as HTMLPFlyoutMultilevelItemElement[];
  };

  private onClickDialog = (e: MouseEvent & { target: HTMLElement }): void => {
    if (e.target.tagName === 'DIALOG') {
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
