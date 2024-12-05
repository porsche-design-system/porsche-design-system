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
import { getComponentCss } from './flyout-multilevel-styles';
import {
  FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES,
  type FlyoutMultilevelAriaAttribute,
  type FlyoutMultilevelUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
  type Item,
  syncThemeToItems,
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

  /** If true, the flyout-multilevel is visualized as opened. */
  @Prop() public open?: boolean = false;

  /** Defines which flyout-multilevel-item to be visualized as opened. */
  @Prop() public activeIdentifier?: string | undefined;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutMultilevelAriaAttribute>;

  /** Private property set by the component itself. */
  @Prop({ reflect: true, mutable: true }) public primary?: boolean = true;

  /** Adapts the flyout-multilevel color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when activeIdentifier is changed. */
  @Event({ bubbles: false }) public update?: EventEmitter<FlyoutMultilevelUpdateEventDetail>;

  @State() private flyoutMultilevelItemElements: Item[] = [];

  private dialog: HTMLDialogElement;
  private drawer: HTMLDivElement;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(isOpen);
  }

  @Watch('activeIdentifier')
  public async activeIdentifierChangeHandler(newVal: string | undefined, oldVal: string | undefined): Promise<void> {
    await this.updateFlyoutMultiLevelState(oldVal, newVal);
  }

  @Watch('theme')
  public themeChangeHandler(theme: Theme): void {
    syncThemeToItems(theme, this.flyoutMultilevelItemElements);
  }

  @Listen(INTERNAL_UPDATE_EVENT_NAME)
  public onInternalUpdate(e: CustomEvent<FlyoutMultilevelUpdateEventDetail>): void {
    e.stopPropagation(); // prevents internal event from bubbling further
    const activeIdentifier = e.detail.activeIdentifier;
    this.update.emit({ activeIdentifier });
  }

  public async componentWillLoad(): Promise<void> {
    syncThemeToItems(this.theme, this.flyoutMultilevelItemElements);
    this.defineFlyoutMultilevelItemElements();
    await this.updateFlyoutMultiLevelState(undefined, this.activeIdentifier);
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
    attachComponentCss(this.host, getComponentCss, this.open, this.primary, !!this.activeIdentifier, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
        /* @ts-ignore */
        inert={this.open ? null : true} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
        ref={(ref) => (this.dialog = ref)}
        {...parseAndGetAriaAttributes(this.aria)}
        onCancel={this.onCancelDialog}
        onClick={this.onClickDialog}
      >
        <div class="drawer" ref={(ref) => (this.drawer = ref)}>
          <PrefixedTagNames.pButtonPure
            class="back"
            type="button"
            size="small"
            alignLabel="end"
            stretch={true}
            icon="arrow-left"
            theme={this.theme}
            hideLabel={true}
            onClick={() => this.emitCloseSecondaryUpdate()}
          >
            Back
          </PrefixedTagNames.pButtonPure>
          <PrefixedTagNames.pButton
            class="dismiss-mobile"
            type="button"
            variant="ghost"
            hideLabel={true}
            icon="close"
            theme={this.theme}
            onClick={this.dismissDialog}
          >
            Dismiss flyout
          </PrefixedTagNames.pButton>
          <PrefixedTagNames.pButtonPure
            class="dismiss-desktop"
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

  // TODO: Unnecessary to call animation in willLoad
  private async updateFlyoutMultiLevelState(oldVal: string | undefined, newVal: string | undefined): Promise<void> {
    const oldItem = oldVal && this.flyoutMultilevelItemElements.find((item) => item.identifier === oldVal);
    const newItem = newVal && this.flyoutMultilevelItemElements.find((item) => item.identifier === newVal);

    // Secondary Drawer is closed => only update state
    if (!newItem) {
      this.updateStates(oldItem, newItem);
    }

    // Secondary Drawer is opened => update state + fade in
    if (!oldItem) {
      this.updateStates(oldItem, newItem);
      this.animateDrawerFade('::after', 'in');
    }

    // Active item is changed => fade out + update state + fade in
    if (newItem && oldItem) {
      const isHierarchyChanged = oldItem.parentElement !== newItem.parentElement;
      const animations = [
        this.animateDrawerFade('::after', 'out'),
        isHierarchyChanged && this.animateDrawerFade('::before', 'out'),
      ].filter(Boolean);

      await Promise.all(animations.map((a) => a.finished));
      updateFlyoutMultiLevelState(this.host, oldItem, false);
      updateFlyoutMultiLevelState(this.host, newItem, true);
      isHierarchyChanged && this.animateDrawerFade('::before', 'in');
      this.animateDrawerFade('::after', 'in');
    }
  }

  private emitCloseSecondaryUpdate(): void {
    this.update.emit({ activeIdentifier: undefined });
  }

  private updateStates(oldItem: Item | undefined, newItem: Item | undefined): void {
    updateFlyoutMultiLevelState(this.host, oldItem, false); // Reset old state
    updateFlyoutMultiLevelState(this.host, newItem, true); // Set new state
  }

  private animateDrawerFade(pseudoElement: '::before' | '::after', direction: 'in' | 'out'): Animation {
    const keyframes = direction === 'in' ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: 1 }];
    const duration = direction === 'in' ? 400 : 150;
    return this.drawer?.animate(keyframes, { duration, pseudoElement });
  }
}
