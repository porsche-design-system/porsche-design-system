import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import { getComponentCss } from './flyout-multilevel-item-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { type PropTypes, type Theme } from '../../../types';
import {
  type FlyoutMultilevelUpdateEventDetail,
  INTERNAL_UPDATE_EVENT_NAME,
} from '../flyout-multilevel/flyout-multilevel-utils';
import { type FlyoutMultilevelItemInternalHTMLProps } from './flyout-multilevel-item-utils';

const propTypes: PropTypes<typeof FlyoutMultilevelItem> = {
  identifier: AllowedTypes.string,
  label: AllowedTypes.string,
};

/** @experimental */
@Component({
  tag: 'p-flyout-multilevel-item',
  shadow: true,
})
export class FlyoutMultilevelItem {
  @Element() public host!: HTMLElement & FlyoutMultilevelItemInternalHTMLProps;

  /** Label of the item. */
  @Prop() public label?: string;

  /** Unique identifier which controls if this item should be shown when the active-identifier on the flyout-multilevel is set to this value. */
  @Prop() public identifier: string;

  private get theme(): Theme {
    return this.host.theme || 'light'; // default as fallback (internal private prop is controlled by flyout-multilevel)
  }

  private get open(): boolean {
    return this.host.open || false; // default as fallback (internal private prop is controlled by flyout-multilevel)
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-flyout-multilevel');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.open, this.theme);

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
          active={this.open}
          aria={{ 'aria-expanded': this.open }}
          theme={this.theme}
          onClick={() => this.onClickButton(this.open ? undefined : this.identifier)}
        >
          {this.label}
        </PrefixedTagNames.pButtonPure>
        <div
          class="scroller"
          // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
          // eslint-disable-next-line
          /* @ts-ignore */
          inert={this.open ? null : true} // prevents focusable elements during fade-out transition
        >
          <div class="header">
            <PrefixedTagNames.pButtonPure
              class="back"
              type="button"
              size="medium"
              icon="arrow-head-left"
              hideLabel={true}
              theme={this.theme}
              onClick={() => this.onClickButton(undefined)}
            >
              Back
            </PrefixedTagNames.pButtonPure>
            <h2 class="heading">{this.label}</h2>
          </div>
          <div class="content">
            <slot />
          </div>
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
