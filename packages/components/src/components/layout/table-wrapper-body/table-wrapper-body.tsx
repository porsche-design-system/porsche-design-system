import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { getTagName, insertSlottedStyles } from '../../../utils';
import { TableHeadFunctional } from './table-head-functional';
import { HeadItem } from '../table-generics/table-utils';

@Component({
  tag: 'p-table-wrapper-body',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableWrapperBody {
  @Element() public host!: HTMLElement;
  @Prop() public head?: string | HeadItem[] = [];

  @Event({ bubbles: false }) public headClick: EventEmitter<HeadItem>;

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public render(): JSX.Element {
    return (
      <table>
        <TableHeadFunctional head={this.head as HeadItem[]} onHeadClick={this.headClick.emit} />
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
