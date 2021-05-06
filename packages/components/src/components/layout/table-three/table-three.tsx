import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { getHTMLElement } from '../../../utils';

@Component({
  tag: 'p-table-three',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableThree {
  @Element() public host!: HTMLElement;
  @Prop() public head?: string[] = [];
  @Prop() public data?: object[] = [];
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
        {/*<tbody innerHTML={this.tableContent} />*/}
        <tbody ref={(el) => (this.body = el)} />
      </table>
    );
  }

  private tableContent(): void {
    const { content } = getHTMLElement(this.host, 'template');
    return this.data.forEach((item) => {
      const clone = content.cloneNode(true);
      // @ts-ignore
      const trNode: HTMLTableRowElement = clone.querySelector('tr');
      const tdNodes = trNode.children;
      Object.entries(item).forEach(([key, val], i) => {
        tdNodes[i].innerHTML = tdNodes[i].innerHTML.replace(`\${${key}}`, val);
      });
      this.body.appendChild(clone);
    });
  }
}
