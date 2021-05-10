import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import type { GenericObject } from '../../../types';
import { getClosestHTMLElement, parseJSON } from '../../../utils';
import type { HeadItem } from './table-utils';
import { TableHead } from '../table-wrapper-body/table-head';

@Component({
  tag: 'p-table-generics',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableGenerics {
  @Element() public host!: HTMLElement;

  @Prop() public head?: string | HeadItem[] = [];
  @Prop() public data?: string | GenericObject[] = [];
  @Prop() public renderRow?: (item: GenericObject) => string = () => '';

  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Event({ bubbles: false }) public headClick: EventEmitter<HeadItem>;
  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Event({ bubbles: false }) public rowClick: EventEmitter<GenericObject>;
  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  private dataItems: GenericObject[] = [];

  public render(): JSX.Element {
    this.dataItems = parseJSON(this.data as string) as any;

    return (
      <table>
        <TableHead head={(parseJSON(this.head as string) as unknown) as HeadItem[]} onHeadClick={this.headClick.emit} />
        <tbody onClick={this.onBodyClick} innerHTML={this.dataItems.map(this.renderRow).join('')} />
      </table>
    );
  }

  private onBodyClick = (e: MouseEvent): void => {
    const { rowIndex } = getClosestHTMLElement(e.target as HTMLElement, 'tr');
    this.rowClick.emit(this.dataItems[rowIndex - 1]); // compensate row in thead
  };
}
