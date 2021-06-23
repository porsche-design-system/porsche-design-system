import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import type { TableHeadCellSort } from '../table-utils';
import { getPrefixedTagNames, throwIfParentIsNotOfKind } from '../../../../utils';
import { addCss, getAriaSort, isDirectionAsc, SORT_EVENT_NAME, toggleDirection } from '../table-utils';

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
          <button class="button" onClick={this.handleButtonClick}>
            <slot />
            <PrefixedTagNames.pIcon
              class={{
                ['icon']: true,
                ['icon--active']: active,
              }}
              color="inherit"
              name={isDirectionAsc(direction) ? 'arrow-down' : 'arrow-up'}
            />
          </button>
        ) : (
          <span hidden={this.hideLabel ? true : null}>
            <slot />
          </span>
        )}
      </Host>
    );
  }

  private handleButtonClick = (): void => {
    this.host.dispatchEvent(
      // TODO: extract into utils with unit test
      new CustomEvent<TableHeadCellSort>(SORT_EVENT_NAME, {
        bubbles: true,
        detail: { ...this.sort, active: true, direction: toggleDirection(this.sort.direction) },
      })
    );
  };
}
