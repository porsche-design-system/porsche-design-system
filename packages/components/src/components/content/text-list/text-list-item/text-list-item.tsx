import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss, getAttribute, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import { getComponentCss } from './text-list-item-styles';

const propTypes: PropTypes<typeof TextListItem> = {};

@Component({
  tag: 'p-text-list-item',
  shadow: true,
})
export class TextListItem {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTextList');
  }

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-text-list-item');
    const list = this.host.parentElement as HTMLPTextListElement;
    if (list) {
      const { listType, orderType } = list;
      const isNestedList = getAttribute(list, 'nested') === '';
      attachComponentCss(this.host, getComponentCss, listType, orderType, isNestedList);
    }
  }

  public render(): JSX.Element {
    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
