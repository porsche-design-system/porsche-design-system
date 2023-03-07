import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import type { PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  throwIfElementHasAttribute,
  throwIfParentIsNotOfKind,
  validateProps,
} from '../../../utils';
import { createSortedEventInitDictDetail, getAriaSort, getTableTheme, isSortable } from './table-head-cell-utils';
import type { Direction, SortingChangeEvent, TableHeadCellSort } from '../table/table-utils';
import { SORT_EVENT_NAME } from '../table/table-utils';
import { getComponentCss } from './table-head-cell-styles';

const propTypes: PropTypes<typeof TableHeadCell> = {
  sort: AllowedTypes.shape<TableHeadCellSort>({
    id: AllowedTypes.string,
    active: AllowedTypes.boolean,
    direction: AllowedTypes.oneOf<Direction>(['asc', 'desc', undefined]),
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

  @State() private tableTheme: Theme;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-head-row');
    throwIfElementHasAttribute(this.host, 'sort');
  }

  public componentDidLoad(): void {
    this.tableTheme = getTableTheme(this.host);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const { active, direction } = this.sort || {};
    attachComponentCss(this.host, getComponentCss, active, direction, this.hideLabel, this.multiline);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host scope="col" role="columnheader" aria-sort={getAriaSort(this.sort)}>
        {isSortable(active, direction) ? (
          <PrefixedTagNames.pButtonPure
            class="button-pure"
            icon="none"
            onClick={this.onButtonClick}
            theme={this.tableTheme}
          >
            <slot />
            <PrefixedTagNames.pIcon // we use slotted icon instead of built-in icon because we need to style it from here (for active state and for sorting)
              class="icon"
              color="primary"
              name="arrow-up"
              aria-hidden="true"
              theme={this.tableTheme}
            />
          </PrefixedTagNames.pButtonPure>
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
      new CustomEvent<SortingChangeEvent>(SORT_EVENT_NAME, createSortedEventInitDictDetail(this.sort))
    );
  };
}
