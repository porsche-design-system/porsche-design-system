import { Component, Element, Host, type JSX, Prop, h } from '@stencil/core';
import type { PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
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

  @Prop({ reflect: true }) public cascade: boolean = false;

  @Prop({ reflect: true }) public primary: boolean = false;

  @Prop({ reflect: true }) public secondary: boolean = false;

  private get theme(): Theme {
    return this.host.theme || 'light'; // default as fallback (internal private prop is controlled by flyout-multilevel)
  }

  /* private get secondary(): boolean {
    return this.host.secondary || false; // default as fallback (internal private prop is controlled by flyout-multilevel)
  }*/

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, ['p-flyout-multilevel', 'p-flyout-multilevel-item']);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.primary,
      this.secondary,
      this.cascade,
      this.identifier,
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pButtonPure
          class="button"
          type="button"
          size="medium"
          alignLabel="start"
          stretch={true}
          icon="arrow-head-right"
          active={this.secondary}
          aria={{ 'aria-expanded': this.secondary }}
          theme={this.theme}
          onClick={() => this.onClickButton(this.secondary ? undefined : this.identifier)}
        >
          {this.label}
        </PrefixedTagNames.pButtonPure>
        <div class="scroller">
          <slot />
        </div>
      </Host>
    );
  }

  private onClickButton = (activeIdentifier: string | undefined): void => {
    this.host.dispatchEvent(
      new CustomEvent<FlyoutMultilevelUpdateEventDetail>(INTERNAL_UPDATE_EVENT_NAME, {
        bubbles: true,
        detail: { activeIdentifier },
      } as CustomEventInit<FlyoutMultilevelUpdateEventDetail>)
    );
  };
}
