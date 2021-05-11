import { Component, Element, h, JSX } from '@stencil/core';
import { getTagName, insertSlottedStyles } from '../../../utils';

@Component({
  tag: 'p-table-wrapper',
  styleUrl: '../simple-table/table.scss',
  shadow: true,
})
export class TableWrapper {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    return <slot />;
  }

  private addSlottedStyles(): void {
    const tagName = getTagName(this.host);
    const style = `
    ${tagName} thead {
      border-bottom: 1px solid black;
    }
    ${tagName} tbody tr:nth-child(even) {
      background: lightgray;
    }
    ${tagName} th, ${tagName} td {
      padding: 0px;
    }
    ${tagName} th {
      text-align: left;
      font-weight: 700;
    }
    ${tagName} td {
      vertical-align: top;
      overflow: hidden;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
