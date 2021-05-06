import { Component, Event, EventEmitter, h, JSX, Prop, State, Watch } from '@stencil/core';
import type { GenericObject } from '../../../types';
import { getClosestHTMLElement, parseJSON } from '../../../utils';

@Component({
  tag: 'p-table-generics',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableGenerics {
  @Prop() public head?: string | string[] = [];
  @Prop() public data?: string | GenericObject[] = [];
  @Prop() public renderRow: (item: GenericObject) => string = () => '';

  @Event({ bubbles: false }) public headClick: EventEmitter<string>;
  @Event({ bubbles: false }) public rowClick: EventEmitter<GenericObject>;

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
    console.log('set dataItems', newValue, '>>', this.dataItems);
  }

  public componentWillLoad(): void {
    this.watchHead(this.head as string);
    this.watchData(this.data as string);
  }

  public render(): JSX.Element {
    return (
      <table>
        <thead onClick={this.onHeadClick}>
          <tr>
            {this.headItems.map((x) => (
              <th scope="col">{x}</th>
            ))}
          </tr>
        </thead>
        <tbody onClick={this.onBodyClick} innerHTML={this.dataItems.map(this.renderRow).join('')} />
      </table>
    );
  }

  public onHeadClick = (e: MouseEvent): void => {
    const { cellIndex } = getClosestHTMLElement(e.target as HTMLElement, 'th');
    this.headClick.emit(this.headItems[cellIndex]);
  };

  public onBodyClick = (e: MouseEvent): void => {
    const { rowIndex } = getClosestHTMLElement(e.target as HTMLElement, 'tr');
    this.rowClick.emit(this.dataItems[rowIndex - 1]);
  };
}
