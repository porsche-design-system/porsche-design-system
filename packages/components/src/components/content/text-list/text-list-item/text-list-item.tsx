import { JSX, Component, Host, h, Element } from '@stencil/core';
import { attachConstructedCss, getAttribute, throwIfParentIsNotOfKind } from '../../../../utils';
import { getComponentCss } from './text-list-item-styles';

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
    const list = this.host.parentElement as HTMLPTextListElement;
    const { listType, orderType } = list;
    const isNestedList = getAttribute(list, 'nested') === '';
    attachConstructedCss(this.host, getComponentCss, listType, orderType, isNestedList);
  }

  public render(): JSX.Element {
    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
