import { breakpointS } from '@porsche-design-system/emotion';
import { Component, Element, Event, type EventEmitter, h, type JSX, Listen, Prop, State, Watch } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getHTMLElementOfKind,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  setScrollLock,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './drilldown-styles';
import {
  DRILLDOWN_ARIA_ATTRIBUTES,
  type DrilldownAriaAttribute,
  type DrilldownUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
  type Item,
  updateDrilldownItemState,
  validateActiveIdentifier,
} from './drilldown-utils';

const propTypes: PropTypes<typeof Drilldown> = {
  activeIdentifier: AllowedTypes.string,
  open: AllowedTypes.boolean,
  aria: AllowedTypes.aria<DrilldownAriaAttribute>(DRILLDOWN_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot to render p-drilldown items." }
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 * @controlled {"props": ["activeIdentifier"], "event": "update"}
 *
 * @experimental
 */
@Component({
  tag: 'p-drilldown',
  shadow: true,
})
export class Drilldown {
  @Element() public host!: HTMLElement;

  /** If true, the drilldown is visualized as opened. */
  @Prop() public open?: boolean = false;

  /** Defines which drilldown-item to be visualized as opened. */
  @Prop() public activeIdentifier?: string | undefined;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<DrilldownAriaAttribute>;

  /** Emitted when the component requests to be dismissed. */
  @Event({ bubbles: false }) public dismiss?: EventEmitter<void>;

  /** Emitted when activeIdentifier is changed. */
  @Event({ bubbles: false }) public update?: EventEmitter<DrilldownUpdateEventDetail>;

  @State() private drilldownItemElements: Item[] = [];
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
    await this.updateDrilldownState(oldVal, newVal);
  }

  @Listen(INTERNAL_UPDATE_EVENT_NAME)
  public onInternalUpdate(e: CustomEvent<DrilldownUpdateEventDetail>): void {
    e.stopPropagation(); // prevents internal event from bubbling further
    const activeIdentifier = e.detail.activeIdentifier;
    this.update.emit({ activeIdentifier });
  }

  public connectedCallback(): void {
    this.handleMediaQueryS(this.matchMediaQueryS);
    this.matchMediaQueryS.addEventListener('change', this.handleMediaQueryS);
  }

  public async componentWillLoad(): Promise<void> {
    this.defineDrilldownItemElements();
    const activeItem = this.drilldownItemElements.find((item: Item) => item.identifier === this.activeIdentifier);
    activeItem && updateDrilldownItemState(activeItem, true); // Set item state
    this.primary = !activeItem || activeItem.parentElement === this.host;
  }

  public componentDidLoad(): void {
    if (this.open) {
      setScrollLock(true);
      this.setDialogVisibility(true);
    }
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.defineDrilldownItemElements);
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
    validateActiveIdentifier(this, this.drilldownItemElements, this.activeIdentifier);
    attachComponentCss(this.host, getComponentCss, this.open, this.primary, this.isSecondaryDrawerVisible);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <dialog
        inert={!this.open} // prevents focusable elements during fade-out transition + prevents focusable elements within nested open accordion
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
            hideLabel={true}
            onClick={() => this.emitCloseSecondaryUpdate()}
          >
            Back
          </PrefixedTagNames.pButtonPure>
          <PrefixedTagNames.pButton
            class="dismiss-mobile"
            type="button"
            icon="close"
            compact={true}
            variant="secondary"
            hideLabel={true}
            onClick={this.dismissDialog}
          >
            Dismiss drilldown
          </PrefixedTagNames.pButton>
          <PrefixedTagNames.pButton
            class="dismiss-desktop"
            type="button"
            icon="close"
            variant="secondary"
            hideLabel={true}
            onClick={this.dismissDialog}
          >
            Dismiss drilldown
          </PrefixedTagNames.pButton>
          <div class="scroller">
            <slot />
          </div>
        </div>
      </dialog>
    );
  }

  private defineDrilldownItemElements = (): void => {
    this.drilldownItemElements = getHTMLElementOfKind(this.host, 'p-drilldown-item') as Item[];
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

  private async updateDrilldownState(oldVal: string | undefined, newVal: string | undefined): Promise<void> {
    const oldItem = oldVal && this.drilldownItemElements.find((item) => item.identifier === oldVal);
    const newItem = newVal && this.drilldownItemElements.find((item) => item.identifier === newVal);

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
    oldItem && updateDrilldownItemState(oldItem, false); // Reset old item state
    newItem && updateDrilldownItemState(newItem, true); // Set new item state
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
