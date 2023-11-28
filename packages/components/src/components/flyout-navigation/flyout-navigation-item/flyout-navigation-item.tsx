import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import { getComponentCss } from './flyout-navigation-item-styles';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { type PropTypes, type Theme } from '../../../types';
import {
  type FlyoutNavigationUpdateEvent,
  INTERNAL_UPDATE_EVENT_NAME,
} from '../flyout-navigation/flyout-navigation-utils';
import { type FlyoutNavigationItemInternalHTMLProps } from './flyout-navigation-item-utils';

const propTypes: PropTypes<typeof FlyoutNavigationItem> = {
  id: AllowedTypes.string,
  label: AllowedTypes.string,
};

@Component({
  tag: 'p-flyout-navigation-item',
  shadow: true,
})
export class FlyoutNavigationItem {
  @Element() public host!: HTMLElement & FlyoutNavigationItemInternalHTMLProps;

  @Prop() public label?: string;

  @Prop() public id: string;

  private get theme(): Theme {
    return this.host.theme || 'light'; // default as fallback
  }

  private get open(): boolean {
    return this.host.open || false; // default as fallback
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-flyout-navigation');
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.open, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pButtonPure
          stretch={true}
          icon="arrow-head-right"
          size="medium"
          alignLabel="start"
          class="button"
          type="button"
          theme={this.theme}
          onClick={() => this.onClickButton()}
        >
          {this.label}
        </PrefixedTagNames.pButtonPure>
        <div class="drawer">
          <slot />
        </div>
      </Host>
    );
  }

  private onClickButton = (): void => {
    const eventInitDictDetail = (): CustomEventInit<FlyoutNavigationUpdateEvent> => ({
      bubbles: true,
      detail: { activeId: this.open ? undefined : this.id },
    });
    this.host.dispatchEvent(
      new CustomEvent<FlyoutNavigationUpdateEvent>(INTERNAL_UPDATE_EVENT_NAME, eventInitDictDetail())
    );
  };
}
