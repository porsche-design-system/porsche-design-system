import { Component, Element, Host, type JSX, Prop, h } from '@stencil/core';
import type { PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  isElementOfKind,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import {
  type FlyoutMultilevelUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
} from '../flyout-multilevel/flyout-multilevel-utils';
import { getComponentCss } from './flyout-multilevel-item-styles';
import type { FlyoutMultilevelItemInternalHTMLProps } from './flyout-multilevel-item-utils';

const propTypes: PropTypes<typeof FlyoutMultilevelItem> = {
  identifier: AllowedTypes.string,
  label: AllowedTypes.string,
  cascade: AllowedTypes.boolean,
  secondary: AllowedTypes.boolean,
  primary: AllowedTypes.boolean,
};

/**
 * @slot {"name": "", "description": "Default slot for the main content." }
 *
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

  private get theme(): Theme {
    return this.host.theme || 'light'; // default as fallback (internal private prop is controlled by flyout-multilevel)
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-flyout-multilevel', 'p-flyout-multilevel-item']);
  }

  public componentDidRender() {
    this.scroller.scrollTo(0, 0); // Reset scroll position when navigated
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.primary, this.secondary, this.cascade, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
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
        <h2>{this.label}</h2>
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
