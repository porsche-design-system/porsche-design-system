import { Component, h, JSX, Prop } from '@stencil/core';
import type { AnyObject } from '../../../types';

@Component({
  tag: 'p-table',
  styleUrl: 'table.scss',
  shadow: true,
})
export class Table {
  @Prop() public head?: string[] = [];
  @Prop() public data?: AnyObject[] = [];

  public componentWillRender(): void {
    const [firstItem] = this.data;
    if (firstItem && this.head.length !== Object.values(firstItem).length) {
      throw new Error('Amount of supplied head elements and data structure does not match');
    }
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
        <tbody>
          {this.data.map((x) => (
            <tr>
              {Object.values(x).map((y) => (
                <td>{y}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
