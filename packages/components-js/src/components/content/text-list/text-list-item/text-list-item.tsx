import { JSX, Component, Host, h, Element } from '@stencil/core';
import cx from 'classnames';
import { insertSlottedStyles, prefix } from '../../../../utils';

@Component({
  tag: 'p-text-list-item',
  styleUrl: 'text-list-item.scss',
  shadow: true
})
export class TextListItem {

  @Element() public host!: HTMLElement;

  public componentDidLoad() {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    const textListItemClasses = cx(
      prefix('text-list-item'),
      prefix(`text-list-item--${this.typeOfList}`),
      {
        [prefix(`text-list-item--ordered-${this.typeOfOrderedList}`)]: this.typeOfList === 'ordered',
        [prefix('text-list-item--nested')]: this.isNestedList
      }
    );

    return (
      <Host role='listitem' class={textListItemClasses}>
        <slot />
      </Host>
    );
  }

  private get typeOfList():string {
    const list = this.host.closest(prefix('text-list'));
    return list.getAttribute('list-type');
  }

  private get typeOfOrderedList():string {
    const list = this.host.closest(prefix('text-list'));
    return list.getAttribute('order-type');
  }

  private get isNestedList():boolean {
    return !!this.host.closest(prefix('text-list[nested]'));
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }

    ${tagName} a:hover {
      color: #d5001c;
    }

    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }
    `;

    insertSlottedStyles(this.host, style);
  }

}
