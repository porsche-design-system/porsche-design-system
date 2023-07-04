import { Component, Element, h, Host, type JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../utils';
import { getComponentCss } from './text-list-item-styles';

@Component({
  tag: 'p-text-list-item',
  shadow: true,
})
export class TextListItem {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-text-list');
  }

  public render(): JSX.Element {
    attachComponentCss(this.host, getComponentCss);

    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
