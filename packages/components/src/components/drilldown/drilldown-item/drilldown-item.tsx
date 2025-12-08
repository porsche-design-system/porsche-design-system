import { Component, Element, forceUpdate, Host, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getNamedSlot,
  getPrefixedTagNames,
  hasNamedSlot,
  isElementOfKind,
  observeChildren,
  throwIfParentIsNotOfKind,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import { type DrilldownUpdateEventDetail, INTERNAL_UPDATE_EVENT_NAME } from '../drilldown/drilldown-utils';
import { getComponentCss } from './drilldown-item-styles';

const propTypes: PropTypes<typeof DrilldownItem> = {
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
  tag: 'p-drilldown-item',
  shadow: true,
})
export class DrilldownItem {
  @Element() public host!: HTMLElement;

  /** Renders back button, header section on mobile view and cascade button to reach a deeper level of the navigation structure. */
  @Prop() public label?: string;

  /** Unique identifier which controls if this item should be shown when the active-identifier on the drilldown is set to this value. */
  @Prop({ reflect: true }) public identifier: string;

  /** Private property set by the component itself. */
  @Prop({ reflect: true, mutable: true }) public primary?: boolean = false;

  /** Private property set by the component itself. */
  @Prop({ reflect: true, mutable: true }) public secondary?: boolean = false;

  /** Private property set by the component itself. */
  @Prop({ reflect: true, mutable: true }) public cascade?: boolean = false;

  private scroller: HTMLDivElement;

  private hasSlottedHeader: boolean;
  private hasSlottedButton: boolean;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-drilldown', 'p-drilldown-item']);

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

  public componentDidRender(): void {
    this.scroller.scrollTo(0, 0); // Reset scroll position when navigated
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.primary, this.secondary, this.cascade);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    this.hasSlottedHeader = hasNamedSlot(this.host, 'header');
    this.hasSlottedButton = hasNamedSlot(this.host, 'button');

    if (this.hasSlottedButton) {
      const slottedButtonHTMLElement = getNamedSlot(this.host, 'button');
      slottedButtonHTMLElement.removeEventListener('click', this.onClickButton);
      slottedButtonHTMLElement.addEventListener('click', this.onClickButton);
      slottedButtonHTMLElement.setAttribute('aria-expanded', this.secondary ? 'true' : 'false');
    }

    return (
      <Host>
        {this.hasSlottedButton ? (
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
    if (isElementOfKind(this.host.parentElement, 'p-drilldown')) {
      this.secondary ? this.emitInternalUpdateEvent(undefined) : this.emitInternalUpdateEvent(this.identifier);
    } else if (!this.secondary) {
      this.emitInternalUpdateEvent(this.identifier);
    }
  };

  private emitInternalUpdateEvent(activeIdentifier: string | undefined): void {
    this.host.dispatchEvent(
      new CustomEvent<DrilldownUpdateEventDetail>(INTERNAL_UPDATE_EVENT_NAME, {
        bubbles: true,
        detail: { activeIdentifier },
      } as CustomEventInit<DrilldownUpdateEventDetail>)
    );
  }
}
