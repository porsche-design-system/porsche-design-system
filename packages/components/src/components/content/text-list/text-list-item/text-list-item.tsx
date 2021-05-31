import { JSX, Component, Host, h, Element } from '@stencil/core';
import {
  getAttribute,
  getClosestHTMLElement,
  getPrefixedTagNames,
  getTagName,
  insertSlottedStyles,
  throwIfParentIsNotOfKind,
} from '../../../../utils';
import { addCss } from './text-list-item-utils';

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
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const list: HTMLPTextListElement = getClosestHTMLElement(this.host, PrefixedTagNames.pTextList);
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
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
      transition: color var(--p-animation-hover-duration, 0.24s) ease !important;
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
