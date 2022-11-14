import type { TextListItemInternalHTMLProps } from './text-list-item-utils';
import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../utils';
import { getComponentCss } from './text-list-item-styles';

@Component({
  tag: 'p-text-list-item',
  shadow: true,
})
export class TextListItem {
  @Element() public host!: HTMLElement & TextListItemInternalHTMLProps;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-text-list');
  }

  public render(): JSX.Element {
    attachComponentCss(
      this.host,
      getComponentCss,
      this.host.listType || 'unordered', // default as fallback
      this.host.orderType || 'numbered', // default as fallback
      this.host.isNestedList || false
    );

    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
