import { Component, Element, h, Host, type JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../utils';
import { getComponentCss } from './text-list-item-styles';

/**
 * @slot {"name": "", "description": "Default slot for the content." }
 */
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
        <span>
          <slot />
        </span>
      </Host>
    );
  }
}
