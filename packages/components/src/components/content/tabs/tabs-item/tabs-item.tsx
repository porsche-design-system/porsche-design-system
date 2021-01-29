import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'p-tabs-item',
  styleUrl: 'tabs-item.scss',
  shadow: true,
})
export class TabsItem {
  /** Defines the label used in tabs. */
  @Prop() public label: string;

  public render(): JSX.Element {
    return (
      <section>
        <slot />
      </section>
    );
  }
}
