import { Component, Element, forceUpdate, h, Host, type JSX, Prop } from '@stencil/core';
import type { PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasNamedSlot,
  isElementOfKind,
  observeChildren,
  throwIfParentIsNotOfKind,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import {
  type FlyoutMultilevelUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
} from '../flyout-multilevel/flyout-multilevel-utils';
import { getComponentCss } from './flyout-multilevel-item-styles';
import type { FlyoutMultilevelItemInternalHTMLProps } from './flyout-multilevel-item-utils';
import { getNamedSlot } from '../../../utils/getNamedSlot';

const propTypes: PropTypes<typeof FlyoutMultilevelItem> = {
  identifier: AllowedTypes.string,
  label: AllowedTypes.string,
  cascade: AllowedTypes.boolean,
  secondary: AllowedTypes.boolean,
  primary: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "button", "description": "Shows a custom button to reach a deeper level of the navigation structure." } *
 * @slot {"name": "header", "description": "Shows a custom header section on mobile view" } *
 * @experimental
 */
@Component({
  tag: 'p-flyout-multilevel-item',
  shadow: true,
})
export class FlyoutMultilevelItem {
  @Element() public host!: HTMLElement & FlyoutMultilevelItemInternalHTMLProps;

  /** Label of the item. */
  @Prop() public label?: string;

  /** Unique identifier which controls if this item should be shown when the active-identifier on the flyout-multilevel is set to this value. */
  @Prop({ reflect: true }) public identifier: string;

  /** Private property set by the component itself. */
  @Prop({ reflect: true, mutable: true }) public primary?: boolean = false;

  /** Private property set by the component itself. */
  @Prop({ reflect: true, mutable: true }) public secondary?: boolean = false;

  /** Private property set by the component itself. */
  @Prop({ reflect: true, mutable: true }) public cascade?: boolean = false;

  private scroller: HTMLDivElement;

  private hasSlottedHeader: boolean;
  private slottedHTMLButtonElement: HTMLElement;

  private get theme(): Theme {
    return this.host.theme || 'light'; // default as fallback (internal private prop is controlled by flyout-multilevel)
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-flyout-multilevel', 'p-flyout-multilevel-item']);

    // Observe dynamic slot changes
    observeChildren(
      this.host,
      () => {
        forceUpdate(this.host);
      },
      undefined,
      { subtree: false, childList: true, attributes: false }
    );
  }

  public disconnectedCallback(): void {
    unobserveChildren(this.host);
  }

  public componentWillRender() {
    this.hasSlottedHeader = hasNamedSlot(this.host, 'header');

    this.slottedHTMLButtonElement = getNamedSlot(this.host, 'button');
    this.slottedHTMLButtonElement?.removeEventListener('click', this.onClickButton);
  }

  public componentDidRender() {
    this.scroller.scrollTo(0, 0); // Reset scroll position when navigated

    this.slottedHTMLButtonElement?.addEventListener('click', this.onClickButton);
    this.slottedHTMLButtonElement?.setAttribute('aria-expanded', this.secondary ? 'true' : 'false');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.primary, this.secondary, this.cascade, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        {this.slottedHTMLButtonElement ? (
          <slot name="button" />
        ) : (
          <PrefixedTagNames.pButtonPure
            inert={this.primary || this.cascade}
            class="button"
            type="button"
            size="medium"
            alignLabel="start"
            stretch={true}
            icon="arrow-head-right"
            active={this.secondary}
            aria={{ 'aria-expanded': this.secondary }}
            theme={this.theme}
            onClick={() => this.onClickButton()}
          >
            {this.label}
          </PrefixedTagNames.pButtonPure>
        )}
        <PrefixedTagNames.pButtonPure
          class="back"
          type="button"
          size="small"
          alignLabel="end"
          stretch={true}
          icon="arrow-left"
          theme={this.theme}
          hideLabel={{ base: true, s: false }}
          onClick={() => this.emitInternalUpdateEvent(this.identifier)}
        >
          {this.label}
        </PrefixedTagNames.pButtonPure>
        {this.hasSlottedHeader ? <slot name="header" /> : <h2>{this.label}</h2>}
        <div class="drawer">
          <div class="scroller" ref={(ref) => (this.scroller = ref)}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }

  private onClickButton = (): void => {
    if (isElementOfKind(this.host.parentElement, 'p-flyout-multilevel')) {
      this.secondary ? this.emitInternalUpdateEvent(undefined) : this.emitInternalUpdateEvent(this.identifier);
    } else if (!this.secondary) {
      this.emitInternalUpdateEvent(this.identifier);
    }
  };

  private emitInternalUpdateEvent(activeIdentifier: string | undefined): void {
    this.host.dispatchEvent(
      new CustomEvent<FlyoutMultilevelUpdateEventDetail>(INTERNAL_UPDATE_EVENT_NAME, {
        bubbles: true,
        detail: { activeIdentifier },
      } as CustomEventInit<FlyoutMultilevelUpdateEventDetail>)
    );
  }
}
