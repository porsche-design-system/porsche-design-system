import { JSX, Component, Host, h, Element } from '@stencil/core';
import { getAttribute, getTagName, insertSlottedStyles, throwIfParentIsNotOfKind } from '../../../../utils';
import { addCss } from './text-list-item-utils';
import { P_ANIMATION_HOVER_DURATION } from '../../../../styles';

@Component({
  tag: 'p-text-list-item',
  shadow: true,
})
export class TextListItem {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTextList');
    this.addSlottedStyles();
  }

  public componentWillRender(): void {
    const list = this.host.parentElement as HTMLPTextListElement;
    const { listType, orderType } = list;
    const isNestedList = getAttribute(list, 'nested') === '';
    addCss(this.host, listType, orderType, isNestedList);
  }

  public render(): JSX.Element {
    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      color: inherit !important;
      text-decoration: underline !important;
      transition: color ${P_ANIMATION_HOVER_DURATION} ease !important;
      outline: transparent solid 1px !important;
      outline-offset: 1px !important;
    }

    ${tagName} a:hover {
      color: #d5001c !important;
    }

    ${tagName} a:focus {
      outline-color: currentColor !important;
    }

    ${tagName} a:focus:not(:focus-visible) {
      outline-color: transparent !important;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
