import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  throwIfElementHasAttribute,
  throwIfParentIsNotOfKind,
} from '../../../../utils';
import { createSortedEventInitDictDetail, getAriaSort, isDirectionAsc } from './table-head-cell-utils';
import type { TableHeadCellSort, SortingChangeEvent } from '../table/table-utils';
import { getComponentCss } from './table-head-cell-styles';
import { SORT_EVENT_NAME } from '../table/table-utils';

@Component({
  tag: 'p-table-head-cell',
  shadow: true,
})
export class TableHeadCell {
  @Element() public host!: HTMLElement;

  /** Defines sortability properties. */
  @Prop() public sort?: TableHeadCellSort;

  /** Hides the label but stays accessible for screen readers. This property only takes effect when sort property is not defined. */
  @Prop() public hideLabel?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pTableHeadRow');
    throwIfElementHasAttribute(this.host, 'sort');
    attachComponentCss(this.host, getComponentCss);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const { active, direction } = this.sort || {};

    return (
      <Host scope="col" role="columnheader" aria-sort={getAriaSort(this.sort)}>
        {active !== undefined && direction !== undefined ? (
          <button type="button" onClick={this.onButtonClick}>
            <slot />
            <PrefixedTagNames.pIcon
              class={{
                ['icon']: true,
                ['icon--active']: active,
                ['icon--asc']: isDirectionAsc(direction), // rotate instead of loading 2nd icon
              }}
              color="inherit"
              name="arrow-up"
              aria-hidden="true"
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

  private onButtonClick = (): void => {
    this.host.dispatchEvent(
      new CustomEvent<SortingChangeEvent>(SORT_EVENT_NAME, createSortedEventInitDictDetail(this.sort))
    );
  };
}
