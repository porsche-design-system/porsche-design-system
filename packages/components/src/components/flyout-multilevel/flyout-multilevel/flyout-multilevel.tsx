import { Component, Element, Event, type EventEmitter, type JSX, Listen, Prop, State, Watch, h } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../../types';
import {
  AllowedTypes,
  THEMES,
  attachComponentCss,
  getHTMLElementOfKind,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setScrollLock,
  validateProps,
} from '../../../utils';
import { animatePrimaryClass, animateSecondaryClass, getComponentCss } from './flyout-multilevel-styles';
import {
  FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES,
  type FlyoutMultilevelAriaAttribute,
  type FlyoutMultilevelUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
  type Item,
  updateFlyoutMultiLevelState,
  validateActiveIdentifier,
} from './flyout-multilevel-utils';

const propTypes: PropTypes<typeof FlyoutMultilevel> = {
  activeIdentifier: AllowedTypes.string,
  primary: AllowedTypes.boolean,
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

  @Prop({ reflect: true }) public primary: boolean = true;

  /** Adapts the flyout-multilevel color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutMultilevelAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when activeIdentifier is changed. */
  @Event({ bubbles: false }) public update?: EventEmitter<FlyoutMultilevelUpdateEventDetail>;

  @State() private flyoutMultilevelItemElements: Item[] = [];

  private dialog: HTMLDialogElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);
  }

  @Watch('activeIdentifier')
  public activeIdentifierChangeHandler(newVal: string | undefined, oldVal: string | undefined): void {
    this.updateFlyoutMultiLevelState(oldVal, newVal);
  }

  @Watch('theme')
  public themeChangeHandler(theme: Theme): void {
    for (const item of this.flyoutMultilevelItemElements) {
      item.theme = theme;
    }
  }

  @Listen(INTERNAL_UPDATE_EVENT_NAME)
  public onInternalUpdate(e: CustomEvent<FlyoutMultilevelUpdateEventDetail>): void {
    e.stopPropagation(); // prevents internal event from bubbling further
    const activeIdentifier = e.detail.activeIdentifier;
    this.update.emit({ activeIdentifier });
  }

  public componentWillLoad(): void {
    this.defineFlyoutMultilevelItemElements();
    this.updateFlyoutMultiLevelState(undefined, this.activeIdentifier);
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

  public componentWillRender(): void {
    this.dialog?.classList.remove(animateSecondaryClass);
    this.dialog?.offsetHeight; /* trigger reflow to restart animation */
    this.dialog?.classList.add(animateSecondaryClass);
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
    attachComponentCss(this.host, getComponentCss, this.primary, !!this.activeIdentifier, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        ref={(ref) => (this.dialog = ref)}
        {...parseAndGetAriaAttributes(this.aria)}
        onCancel={this.onCancelDialog}
        onClick={this.onClickDialog}
      >
        <PrefixedTagNames.pButtonPure
          class="back"
          type="button"
          size="small"
          alignLabel="end"
          stretch={true}
          icon="arrow-left"
          theme={this.theme}
          hideLabel={true}
          onClick={() => this.update.emit({ activeIdentifier: undefined })}
        >
          Back
        </PrefixedTagNames.pButtonPure>
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
        <div class="scroller">
          <slot />
        </div>
      </dialog>
    );
  }

  private defineFlyoutMultilevelItemElements = (): void => {
    this.flyoutMultilevelItemElements = getHTMLElementOfKind(this.host, 'p-flyout-multilevel-item') as Item[];
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

  private updateFlyoutMultiLevelState(oldVal: string | undefined, newVal: string | undefined): void {
    const oldItem = oldVal && this.flyoutMultilevelItemElements.find((item) => item.identifier === oldVal);
    const newItem = newVal && this.flyoutMultilevelItemElements.find((item) => item.identifier === newVal);
    updateFlyoutMultiLevelState(this.host, oldItem, false); // Reset old state
    updateFlyoutMultiLevelState(this.host, newItem, true); // Set new state
    // TODO: Check mobile view
    // Whenever the hierarchy changes we need to animate the primary side
    if (newVal && oldVal && oldItem.parentElement !== newItem.parentElement) {
      this.dialog?.classList.remove(animatePrimaryClass);
      this.dialog?.offsetHeight; /* trigger reflow to restart animation */
      this.dialog?.classList.add(animatePrimaryClass);
    }
  }
}
