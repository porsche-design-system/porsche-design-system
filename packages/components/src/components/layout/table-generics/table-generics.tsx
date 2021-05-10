import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import type { GenericObject } from '../../../types';
import { getClosestHTMLElement, throwIfElementHasAttribute } from '../../../utils';
import type { HeadItem } from './table-utils';
import { TableHead } from '../table-wrapper-body/table-head';

@Component({
  tag: 'p-table-generics',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableGenerics {
  @Element() public host!: HTMLElement;

  @Prop() public head?: HeadItem[] = [];
  @Prop() public data?: GenericObject[] = [];
  @Prop() public renderRow?: (item: GenericObject) => string = () => '';

  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Event({ bubbles: false }) public headClick: EventEmitter<HeadItem>;
  /* eslint-disable-next-line @typescript-eslint/member-ordering */
  @Event({ bubbles: false }) public rowClick: EventEmitter<GenericObject>;

  public componentWillRender(): void {
    throwIfElementHasAttribute(this.host, 'head');
    throwIfElementHasAttribute(this.host, 'data');
  }

  public render(): JSX.Element {
    return (
      <table>
        <TableHead head={this.head} onHeadClick={this.headClick.emit} />
        <tbody onClick={this.onBodyClick} innerHTML={this.data.map(this.renderRow).join('')} />
      </table>
    );
  }

  private onBodyClick = (e: MouseEvent): void => {
    const { rowIndex } = getClosestHTMLElement(e.target as HTMLElement, 'tr');
    this.rowClick.emit(this.data[rowIndex - 1]); // compensate row in thead
  };
}
