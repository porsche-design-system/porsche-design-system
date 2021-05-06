import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import type { GenericObject } from '../../../types';
import { parseJSON } from '../../../utils';

@Component({
  tag: 'p-table-generics',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableGenerics {
  @Prop() public head?: string | string[] = [];
  @Prop() public data?: string | GenericObject[] = [];
  @Prop() renderRow: (item: GenericObject) => string = () => '';

  @State() private headItems: string[] = [];
  @State() private dataItems: GenericObject[] = [];

  @Watch('head')
  watchHead(newValue: string) {
    this.headItems = parseJSON(newValue) as any;
    console.log('set headItems', newValue, this.headItems);
  }

  @Watch('data')
  watchData(newValue: string) {
    this.dataItems = parseJSON(newValue) as any;
    console.log('set dataItems', newValue, this.dataItems);
  }

  public componentWillLoad(): void {
    this.watchHead(this.head as string);
    this.watchData(this.data as string);
  }

  public render(): JSX.Element {
    return (
      <table>
        <thead>
          <tr>
            {this.headItems.map((x) => (
              <th scope="col">{x}</th>
            ))}
          </tr>
        </thead>
        <tbody innerHTML={this.dataItems.map(this.renderRow).join('')} />
      </table>
    );
  }
}
