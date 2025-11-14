import { Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseJSONAttribute,
  unobserveBreakpointChange,
  validateProps,
} from '../../utils';
import { getComponentCss } from './pagination-styles';
import {
  createPaginationItems,
  getCurrentActivePage,
  getTotalPages,
  ItemType,
  type PaginationInternationalization,
  type PaginationUpdateEventDetail,
} from './pagination-utils';

const propTypes: Omit<PropTypes<typeof Pagination>, 'maxNumberOfPageLinks'> = {
  totalItemsCount: AllowedTypes.number,
  itemsPerPage: AllowedTypes.number,
  activePage: AllowedTypes.number,
  showLastPage: AllowedTypes.boolean,
  intl: AllowedTypes.shape<Required<PaginationInternationalization>>({
    root: AllowedTypes.string,
    prev: AllowedTypes.string,
    next: AllowedTypes.string,
    page: AllowedTypes.string,
  }),
};

/**
 * @controlled { "props": ["activePage"], "event": "update", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-pagination',
  shadow: { delegatesFocus: true },
})
export class Pagination {
  @Element() public host!: HTMLElement;

  /** The total count of items. */
  @Prop() public totalItemsCount: number = 1; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** The total count of items which should be shown per page.  */
  @Prop() public itemsPerPage: number = 1; // eslint-disable-line @typescript-eslint/no-inferrable-types

  /** Index of the currently active page. */
  @Prop({ mutable: true }) public activePage?: number = 1;

  /** Show or hide the button to jump to the last page. */
  @Prop() public showLastPage?: boolean = true;

  /** Override the default wordings that are used for aria-labels on the next/prev and page buttons. */
  @Prop() public intl?: PaginationInternationalization = {
    root: 'Pagination',
    prev: 'Previous page',
    next: 'Next page',
    page: 'Page',
  };

  /** Emitted when the page changes. */
  @Event({ bubbles: false }) public update: EventEmitter<PaginationUpdateEventDetail>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public disconnectedCallback(): void {
    unobserveBreakpointChange(this.host);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    attachComponentCss(this.host, getComponentCss, this.activePage, pageTotal, this.showLastPage);
    const paginationItems = createPaginationItems({
      activePage: getCurrentActivePage(this.activePage, pageTotal),
      pageTotal,
      showLastPage: this.showLastPage,
    });
    const parsedIntl = parseJSONAttribute(this.intl);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <nav aria-label={parsedIntl.root}>
        <ul>
          {paginationItems.map((pageModel, index) => {
            const {
              type,
              isActive,
              value,
              isBeforeCurrent,
              isAfterCurrent,
              isBeforeBeforeCurrent,
              isAfterAfterCurrent,
            } = pageModel;
            const spanProps = {
              role: 'button',
              tabIndex: isActive ? 0 : null,
              onClick: () => this.onClick(value),
              onKeyDown: (e: KeyboardEvent) => this.onKeyDown(e, value),
            };
            const iconProps = {
              color: 'primary',
              'aria-hidden': 'true',
            };

            switch (type) {
              case ItemType.PREVIOUS:
                return (
                  <li key="prev" class="prev">
                    {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: ok */}
                    <span {...spanProps} aria-label={parsedIntl.prev} aria-disabled={isActive ? null : 'true'}>
                      <PrefixedTagNames.pIcon {...iconProps} name="arrow-left" />
                    </span>
                  </li>
                );

              case ItemType.ELLIPSIS:
                return (
                  <li key="ellip" class={{ ellip: true, [`ellip-${index === 2 ? 'start' : 'end'}`]: true }}>
                    <span class="ellipsis" />
                  </li>
                );

              case ItemType.PAGE:
                return (
                  <li
                    key={value}
                    class={{
                      current: isActive,
                      'current-1': isBeforeCurrent,
                      'current+1': isAfterCurrent,
                      'current-2': isBeforeBeforeCurrent,
                      'current+2': isAfterAfterCurrent,
                    }}
                  >
                    {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: ok */}
                    <span
                      {...spanProps}
                      tabIndex={0}
                      aria-label={`${parsedIntl.page} ${value}`}
                      aria-current={isActive ? 'page' : null}
                    >
                      {value}
                    </span>
                  </li>
                );

              case ItemType.NEXT:
                return (
                  <li key="next" class="next">
                    {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: ok */}
                    <span {...spanProps} aria-label={parsedIntl.next} aria-disabled={isActive ? null : 'true'}>
                      <PrefixedTagNames.pIcon {...iconProps} name="arrow-right" />
                    </span>
                  </li>
                );
              default:
                return null;
            }
          })}
        </ul>
      </nav>
    );
  }

  private onKeyDown(event: KeyboardEvent, page: number): void {
    // from https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
    const { key } = event;
    if (key === ' ' || key === 'Enter' || key === 'Spacebar') {
      event.preventDefault(); // prevent the default action to stop scrolling when space is pressed
      this.onClick(page);
    }
  }

  private onClick(page: number): void {
    if (page !== this.activePage) {
      this.update.emit({ page, previousPage: this.activePage });
      this.activePage = page; // TODO: should become a controlled component
    }
  }
}
