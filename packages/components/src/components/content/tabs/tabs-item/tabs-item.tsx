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
    attachComponentCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    return (
      <section>
        <slot />
      </section>
    );
  }
}
