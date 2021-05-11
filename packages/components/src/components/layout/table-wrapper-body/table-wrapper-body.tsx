import { Component, Element, Event, EventEmitter, h, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, insertSlottedStyles, throwIfElementHasAttribute } from '../../../utils';
import { getAriaSort, getSlottedCss, HeadItem, isDirectionAsc, toggleDirection } from '../table-generics/table-utils';

@Component({
  tag: 'p-table-wrapper-body',
  styleUrl: '../table/table.scss',
  shadow: true,
})
export class TableWrapperBody {
  @Element() public host!: HTMLElement;
  @Prop() public head?: HeadItem[] = [];
  @Prop() public query?: string = '';

  @Event({ bubbles: false }) public headClick: EventEmitter<HeadItem>;

  public connectedCallback(): void {
    this.addSlottedStyles();
  }

  public componentWillRender(): void {
    throwIfElementHasAttribute(this.host, 'head');

    // if (this.query) {
    //   Array.from(this.host.children).forEach((tr) => {
    //     tr.innerHTML = tr.innerHTML.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>');
    //   });
    // }
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <table>
        <thead>
          <tr>
            {this.head.map((item) => {
              const { name, isSortable, direction, isSorting } = item;
              return (
                <th scope="col" role="columnheader" aria-sort={getAriaSort(isSortable, isSorting, direction)}>
                  {isSortable ? (
                    <button onClick={() => this.handleHeadClick(item)}>
                      {name}
                      <PrefixedTagNames.pIcon
                        class={{
                          ['icon']: true,
                          ['icon--active']: isSorting,
                        }}
                        color="inherit"
                        name={isDirectionAsc(direction) ? 'arrow-head-down' : 'arrow-head-up'}
                      />
                    </button>
                  ) : (
                    name
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    );
  }

  private handleHeadClick = (headItem: HeadItem): void => {
    if (headItem.isSortable) {
      this.headClick.emit({
        ...headItem,
        isSorting: true,
        direction: toggleDirection(headItem.direction),
      });
    }
  };

  private addSlottedStyles(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
  }
}
