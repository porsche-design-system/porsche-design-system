import { breakpointS } from '@porsche-design-system/styles';
import {
  Component,
  Element,
  Event,
  type EventEmitter,
  Host,
  type JSX,
  Listen,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../../types';
import {
  AllowedTypes,
  THEMES,
  getHTMLElementOfKind,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setScrollLock,
  validateProps,
} from '../../../utils';
import {
  FLYOUT_MULTILEVEL_ARIA_ATTRIBUTES,
  type FlyoutMultilevelAriaAttribute,
  type FlyoutMultilevelUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
  type Item,
  syncThemeToItems,
  updateFlyoutMultiLevelItemState,
  validateActiveIdentifier,
} from './flyout-multilevel-utils';

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
  styleUrl: './flyout-multilevel.scss',
})
export class FlyoutMultilevel {
  @Element() public host!: HTMLElement;

  /** If true, the flyout-multilevel is visualized as opened. */
  @Prop() public open?: boolean = false;

  /** Defines which flyout-multilevel-item to be visualized as opened. */
  @Prop() public activeIdentifier?: string | undefined;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<FlyoutMultilevelAriaAttribute>;

  /** Adapts the flyout-multilevel color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when activeIdentifier is changed. */
  @Event({ bubbles: false }) public update?: EventEmitter<FlyoutMultilevelUpdateEventDetail>;

  @State() private flyoutMultilevelItemElements: Item[] = [];
  @State() private primary: boolean = true;
  @State() private isSecondaryDrawerVisible: boolean = !!this.activeIdentifier;

  private dialog: HTMLDialogElement;
  private drawer: HTMLDivElement;
  private isDesktop = false;
  private matchMediaQueryS = window.matchMedia(`(min-width: ${breakpointS}px)`);

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

  public connectedCallback(): void {
    this.handleMediaQueryS(this.matchMediaQueryS);
    this.matchMediaQueryS.addEventListener('change', this.handleMediaQueryS);
  }

  public async componentWillLoad(): Promise<void> {
    this.defineFlyoutMultilevelItemElements();
    syncThemeToItems(this.theme, this.flyoutMultilevelItemElements);
    const activeItem = this.flyoutMultilevelItemElements.find(
      (item: Item) => item.identifier === this.activeIdentifier
    );
    activeItem && updateFlyoutMultiLevelItemState(activeItem, true); // Set item state
    this.primary = !activeItem || activeItem.parentElement === this.host;
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
    this.matchMediaQueryS.removeEventListener('change', this.handleMediaQueryS);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    validateActiveIdentifier(this, this.flyoutMultilevelItemElements, this.activeIdentifier);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host class={`${this.theme}`}>
        <dialog
          // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
          /* @ts-ignore */
          inert={this.open ? null : true} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
          ref={(ref) => (this.dialog = ref)}
          {...parseAndGetAriaAttributes(this.aria)}
          onCancel={this.onCancelDialog}
          onClick={this.onClickDialog}
          class={{ open: this.open }}
        >
          <div
            class={{ drawer: true, 'secondary-scroller-visible': this.isSecondaryDrawerVisible }}
            ref={(ref) => (this.drawer = ref)}
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
              <slot
                /* @ts-ignore */
                class={{ 'secondary-scroller-visible': this.isSecondaryDrawerVisible, primary: this.primary }}
              />
            </div>
          </div>
        </dialog>
      </Host>
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

  private async updateFlyoutMultiLevelState(oldVal: string | undefined, newVal: string | undefined): Promise<void> {
    const oldItem = oldVal && this.flyoutMultilevelItemElements.find((item) => item.identifier === oldVal);
    const newItem = newVal && this.flyoutMultilevelItemElements.find((item) => item.identifier === newVal);

    // Secondary Drawer is closed => only update state
    if (!newItem) {
      if (this.isDesktop) {
        this.updateStates(oldItem, newItem);
      } else {
        const animation = this.animateDrawerFade('::after', 'out');
        await animation.finished;
        this.updateStates(oldItem, newItem);
        this.animateDrawerFade('::after', 'in');
      }
    }

    // Secondary Drawer is opened => update state + fade in
    if (!oldItem) {
      if (this.isDesktop) {
        this.updateStates(oldItem, newItem);
        this.animateDrawerFade('::after', 'in');
      } else {
        const animation = this.animateDrawerFade('::after', 'out');
        await animation.finished;
        this.updateStates(oldItem, newItem);
        this.animateDrawerFade('::after', 'in');
      }
    }

    // Active item is changed => fade out + update state + fade in
    if (newItem && oldItem) {
      const isHierarchyChanged = oldItem.parentElement !== newItem.parentElement;
      const animations = [
        this.animateDrawerFade('::after', 'out'),
        isHierarchyChanged && this.animateDrawerFade('::before', 'out'),
      ].filter(Boolean);

      await Promise.all(animations.map((a) => a.finished));
      this.updateStates(oldItem, newItem);
      isHierarchyChanged && this.animateDrawerFade('::before', 'in');
      this.animateDrawerFade('::after', 'in');
    }
  }

  private emitCloseSecondaryUpdate(): void {
    this.update.emit({ activeIdentifier: undefined });
  }

  private updateStates(oldItem: Item | undefined, newItem: Item | undefined): void {
    this.primary = !oldItem || !newItem || newItem.parentElement === this.host;
    this.isSecondaryDrawerVisible = !!this.activeIdentifier;
    oldItem && updateFlyoutMultiLevelItemState(oldItem, false); // Reset old item state
    newItem && updateFlyoutMultiLevelItemState(newItem, true); // Set new item state
  }

  private animateDrawerFade(pseudoElement: '::before' | '::after', direction: 'in' | 'out'): Animation {
    const keyframes = direction === 'in' ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: 1 }];
    const duration = direction === 'in' ? 400 : 150;
    return this.drawer?.animate(keyframes, { duration, pseudoElement });
  }

  private handleMediaQueryS = (e: MediaQueryList | MediaQueryListEvent): void => {
    this.isDesktop = !!e.matches;
  };
}
