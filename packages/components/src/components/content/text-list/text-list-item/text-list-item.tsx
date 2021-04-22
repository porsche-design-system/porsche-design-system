import { JSX, Component, Host, h, Element } from '@stencil/core';
import {
  getAttribute,
  getClosestHTMLElement,
  getPrefixedTagNames,
  getTagName,
  insertSlottedStyles,
  throwIfParentIsNotOfKind,
} from '../../../../utils';

@Component({
  tag: 'p-text-list-item',
  styleUrl: 'text-list-item.scss',
  shadow: true,
})
export class TextListItem {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTextList');
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const list: HTMLPTextListElement = getClosestHTMLElement(this.host, PrefixedTagNames.pTextList);
    const { listType, orderType } = list;
    const isNestedList = getAttribute(list, 'nested') === '';
    const isOrderedList = listType === 'ordered';

    const rootClasses = {
      ['root']: true,
      ['root--ordered']: isOrderedList,
      [`root--ordered-${orderType}`]: isOrderedList,
      ['root--nested']: isNestedList,
    };

    return (
      <Host role="listitem">
        <li class={rootClasses}>
          <slot />
        </li>
      </Host>
    );
  }

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `${tagName} a {
      outline: none transparent !important;
      color: inherit !important;
      text-decoration: underline !important;
      transition: color .24s ease !important;
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
