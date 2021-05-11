import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { getHTMLElement } from '../../../utils';
import type { AnyObject } from '../../../types';

@Component({
  tag: 'p-table-template',
  styleUrl: '../simple-table/table.scss',
  shadow: true,
})
export class TableTemplate {
  @Element() public host!: HTMLElement;
  @Prop() public head?: string[] = [];
  @Prop() public data?: AnyObject[] = [];

  private body: HTMLTableSectionElement;

  public componentDidRender(): void {
    this.tableContent();
  }

  public render(): JSX.Element {
    return (
      <table>
        <thead>
          <tr>
            {this.head.map((x) => (
              <th>{x}</th>
            ))}
          </tr>
        </thead>
        {/* <tbody innerHTML={this.tableContent} /> */}
        <tbody ref={(el) => (this.body = el)} />
      </table>
    );
  }

  private tableContent(): void {
    const { content } = getHTMLElement(this.host, 'template');
    return this.data.forEach((item) => {
      const clone = content.cloneNode(true);
      const trNode: HTMLTableRowElement = (clone as any).querySelector('tr');
      const tdNodes = trNode.children;
      Object.entries(item).forEach(([key, val], i) => {
        tdNodes[i].innerHTML = tdNodes[i].innerHTML.replace(`\${${key}}`, val as string);
      });
      this.body.appendChild(clone);
    });
  }
}
