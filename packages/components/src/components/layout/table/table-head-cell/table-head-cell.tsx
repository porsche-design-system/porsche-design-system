import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import type { TableHeadItem } from '../table-utils';
import { getPrefixedTagNames, throwIfParentIsNotOfKind } from '../../../../utils';
import { addCss, getAriaSort, isDirectionAsc, SORT_EVENT_NAME, toggleDirection } from '../table-utils';

@Component({
  tag: 'p-table-head-cell',
  shadow: true,
})
export class TableHeadCell {
  @Element() public host!: HTMLElement;

  /** Defines sortability properties. */
  @Prop() public item?: TableHeadItem;

  /** Hides the label but stays accessible for screen readers. */
  @Prop() public hideLabel?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableHeadRow');
    addCss(this.host);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const { isSortable, direction, isSorting } = this.item || {};

    return (
      <Host scope="col" role="columnheader" aria-sort={getAriaSort(this.item)}>
        {isSortable ? (
          <button class="button" onClick={this.handleButtonClick}>
            <slot />
            <PrefixedTagNames.pIcon
              class={{
                ['icon']: true,
                ['icon--active']: isSorting,
              }}
              color="inherit"
              name={isDirectionAsc(direction) ? 'arrow-down' : 'arrow-up'}
            />
          </button>
        ) : (
          <slot data-hidden={this.hideLabel} />
        )}
      </Host>
    );
  }

  private handleButtonClick = (): void => {
    this.host.dispatchEvent(
      new CustomEvent<TableHeadItem>(SORT_EVENT_NAME, {
        bubbles: true,
        detail: { ...this.item, isSorting: true, direction: toggleDirection(this.item.direction) },
      })
    );
  };
}
