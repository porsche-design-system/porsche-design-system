import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import type { TableHeadCellSort } from '../table-utils';
import { getPrefixedTagNames, throwIfParentIsNotOfKind } from '../../../../utils';
import { addCss, createSortedEventInitDictDetail, getAriaSort, isDirectionAsc, SORT_EVENT_NAME } from '../table-utils';

@Component({
  tag: 'p-table-head-cell',
  shadow: true,
})
export class TableHeadCell {
  @Element() public host!: HTMLElement;

  /** Defines sortability properties. */
  @Prop() public sort?: TableHeadCellSort = undefined;

  /** Hides the label but stays accessible for screen readers. This property only takes effect when sort property is not defined. */
  @Prop() public hideLabel?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableHeadRow');
    addCss(this.host);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const { active, direction } = this.sort || {};

    return (
      <Host scope="col" role="columnheader" aria-sort={getAriaSort(this.sort)}>
        {active !== undefined && direction !== undefined ? (
          <button onClick={this.handleButtonClick}>
            <slot />
            <PrefixedTagNames.pIcon
              class={{
                ['icon']: true,
                ['icon--active']: active,
                ['icon--asc']: isDirectionAsc(direction), // rotate instead of loading 2nd icon
              }}
              color="inherit"
              name="arrow-up"
            />
          </button>
        ) : (
          <span class={{ hidden: this.hideLabel }}>
            <slot />
          </span>
        )}
      </Host>
    );
  }

  private handleButtonClick = (): void => {
    this.host.dispatchEvent(
      new CustomEvent<TableHeadCellSort>(SORT_EVENT_NAME, createSortedEventInitDictDetail(this.sort))
    );
  };
}
