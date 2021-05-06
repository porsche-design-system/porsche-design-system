import { Component, Element, Event, EventEmitter, h, JSX, Prop, Watch } from '@stencil/core';
import type { GenericObject } from '../../../types';
import { getClosestHTMLElement, getPrefixedTagNames, parseJSON } from '../../../utils';

export type HeadItem = {
  name: string;
  isSortable: boolean;
  direction: 'asc' | 'desc';
};

@Component({
  tag: 'p-table-generics',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableGenerics {
  @Element() public host!: HTMLElement;
  @Prop() public head?: string | HeadItem[] = [];
  @Prop() public data?: string | GenericObject[] = [];
  @Prop() public renderRow: (item: GenericObject) => string = () => '';

  @Event({ bubbles: false }) public headClick: EventEmitter<HeadItem>;
  @Event({ bubbles: false }) public rowClick: EventEmitter<GenericObject>;

  private headItems: HeadItem[] = [];
  private dataItems: GenericObject[] = [];

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
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <table>
        <thead onClick={this.onHeadClick}>
          <tr>
            {this.headItems.map(({ name, isSortable }) => (
              <th scope="col" class={isSortable ? 'sortable' : ''}>
                {name}
                {isSortable && (
                  <span class="sorting">
                    <PrefixedTagNames.pIcon color="inherit" name="arrow-up" />
                    <PrefixedTagNames.pIcon color="inherit" name="arrow-down" />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody onClick={this.onBodyClick} innerHTML={this.dataItems.map(this.renderRow).join('')} />
      </table>
    );
  }

  public onHeadClick = (e: MouseEvent): void => {
    const { cellIndex } = getClosestHTMLElement(e.target as HTMLElement, 'th');
    const headItem = this.headItems[cellIndex];
    if (headItem.isSortable) {
      this.headClick.emit(headItem);
    }
  };

  public onBodyClick = (e: MouseEvent): void => {
    const { rowIndex } = getClosestHTMLElement(e.target as HTMLElement, 'tr');
    this.rowClick.emit(this.dataItems[rowIndex - 1]); // compensate row in thead
  };
}
