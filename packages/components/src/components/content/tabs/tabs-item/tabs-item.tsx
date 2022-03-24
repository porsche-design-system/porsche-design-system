import { Component, Element, h, Prop } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../../utils';
import { getComponentCss } from './tabs-item-styles';

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
    const tabs = this.host.parentElement as HTMLPTabsElement;
    if (tabs) {
      attachComponentCss(this.host, getComponentCss, tabs.theme);
    }
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
