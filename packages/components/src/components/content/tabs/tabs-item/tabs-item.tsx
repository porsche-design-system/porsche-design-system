import { Component, Element, h, Prop } from '@stencil/core';
import { throwIfParentIsNotOfKind } from '../../../../utils';

@Component({
  tag: 'p-tabs-item',
  styleUrl: 'tabs-item.scss',
  shadow: true,
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  /** Defines the label used in tabs. */
  @Prop() public label: string;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTabs');
  }

  public render(): JSX.Element {
    return (
      <section>
        <slot />
      </section>
    );
  }
}
