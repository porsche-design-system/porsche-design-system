import { Component, h, JSX, Prop } from '@stencil/core';
import type { AnyObject } from '../../../types';

@Component({
  tag: 'p-table-renderfunc',
  styleUrl: '../simple-table/table.scss',
  shadow: true,
})
export class TableRenderfunc {
  @Prop() public head?: string[] = [];
  @Prop() public data?: AnyObject[] = [];

  @Prop() public renderRow?: (item: AnyObject) => string = () => '';

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
