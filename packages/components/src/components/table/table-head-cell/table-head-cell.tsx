import { Component, Element, h, Host, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  throwIfElementHasAttribute,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { createSortedEventInitDictDetail, getAriaSort, isSortable } from './table-head-cell-utils';
import type { Direction, TableUpdateEventDetail, TableHeadCellSort } from '../table/table-utils';
import { SORT_EVENT_NAME } from '../table/table-utils';
import { getComponentCss } from './table-head-cell-styles';

const propTypes: PropTypes<typeof TableHeadCell> = {
  sort: AllowedTypes.shape<TableHeadCellSort>({
    id: AllowedTypes.string,
    active: AllowedTypes.boolean,
    direction: AllowedTypes.oneOf<Direction>([undefined, 'asc', 'desc']),
  }),
  hideLabel: AllowedTypes.breakpoint('boolean'),
  multiline: AllowedTypes.boolean,
};

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

  /** Displays slotted text multiline or forced into a single line. */
  @Prop() public multiline?: boolean = false;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-head-row');
    throwIfElementHasAttribute(this.host, 'sort');
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { active, direction } = this.sort || {};
    attachComponentCss(this.host, getComponentCss, active, direction, this.hideLabel, this.multiline);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host scope="col" role="columnheader" aria-sort={getAriaSort(this.sort)}>
        {isSortable(active, direction) ? (
          <button type="button" onClick={this.onButtonClick}>
            <slot />
            <PrefixedTagNames.pIcon class="icon" color="inherit" size="x-small" name="arrow-up" aria-hidden="true" />
          </button>
        ) : (
          <span>
            <slot />
          </span>
        )}
      </Host>
    );
  }

  private onButtonClick = (): void => {
    this.host.dispatchEvent(
      new CustomEvent<TableUpdateEventDetail>(SORT_EVENT_NAME, createSortedEventInitDictDetail(this.sort))
    );
  };
}
