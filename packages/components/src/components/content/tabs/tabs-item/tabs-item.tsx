import { Component, Element, h, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import { getComponentCss } from './tabs-item-styles';

const propTypes: PropTypes<typeof TabsItem> = {
  label: AllowedTypes.string,
};

@Component({
  tag: 'p-tabs-item',
  shadow: true,
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  /** Defines the label used in tabs. */
  @Prop() public label: string;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTabs');
  }

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-tabs-item');
    const tabs = this.host.parentElement as HTMLPTabsElement;
    if (tabs) {
      attachComponentCss(this.host, getComponentCss, tabs.theme || 'light');
    }
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
