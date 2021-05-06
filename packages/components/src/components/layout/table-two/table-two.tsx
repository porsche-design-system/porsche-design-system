import { Component, h, JSX, Prop } from '@stencil/core';

@Component({
  tag: 'p-table-two',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableTwo {
  @Prop() public head?: string[] = [];
  @Prop() public data?: object[] = [];
  @Prop() renderRow: (item: object) => string = () => '';

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
        <tbody innerHTML={this.data.map(this.renderRow).join('')} />
      </table>
    );
  }
}
