import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, getTagName, insertSlottedStyles } from '../../../utils';

@Component({
  tag: 'p-table-wrapper-body',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableWrapperBody {
  @Element() public host!: HTMLElement;
  @Prop() public head?: string[] = [];

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <table>
        <PrefixedTagNames.pTableHead head={this.head} />
        <tbody>
          <slot />
        </tbody>
      </table>
    );
  }

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `
    ${tagName} tr:nth-child(even) {
      background: lightgray
    }
    ${tagName} td {
      padding: 5px;
      vertical-align: top;
      overflow: hidden;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
