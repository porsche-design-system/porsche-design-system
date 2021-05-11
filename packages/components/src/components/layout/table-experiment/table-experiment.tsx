import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import type { GenericObject } from '../../../types';
import { getClosestHTMLElement, throwIfElementHasAttribute } from '../../../utils';
import type { TableHeadItem } from '../table/table-utils';
import { TableHeadFunctional } from '../table/table-head/table-head-functional';

@Component({
  tag: 'p-table-experiment',
  styleUrl: '../simple-table/table.scss',
  shadow: true,
})
export class TableExperiment {
  @Element() public host!: HTMLElement;

  @Prop() public head?: TableHeadItem[] = [];
  @Prop() public data?: GenericObject[] = [];
  @Prop() public renderRow?: (item: GenericObject) => string = () => '';

  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Event({ bubbles: false }) public headClick: EventEmitter<TableHeadItem>;
  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Event({ bubbles: false }) public rowClick: EventEmitter<GenericObject>;

  public componentWillRender(): void {
    throwIfElementHasAttribute(this.host, 'head');
    throwIfElementHasAttribute(this.host, 'data');
  }

  public render(): JSX.Element {
    return (
      <table>
        <TableHeadFunctional head={this.head} onHeadClick={this.headClick.emit} />
        <tbody onClick={this.onBodyClick} innerHTML={this.data.map(this.renderRow).join('')} />
      </table>
    );
  }

  private onBodyClick = (e: MouseEvent): void => {
    const { rowIndex } = getClosestHTMLElement(e.target as HTMLElement, 'tr');
    this.rowClick.emit(this.data[rowIndex - 1]); // compensate row in thead
  };
}
