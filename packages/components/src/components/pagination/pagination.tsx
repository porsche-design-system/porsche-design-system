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
  type PaginationHrefBuilder,
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

  /** A callback function that returns the href for a given page number. When provided, pagination items are rendered as `<a>` tags instead of `<span>` elements, enabling native link behavior, SEO indexing, and framework router integration. */
  @Prop() public hrefBuilder?: PaginationHrefBuilder;

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
            const useAnchor = !!this.hrefBuilder;
            const iconProps = {
              color: 'primary',
              'aria-hidden': 'true',
            };

            switch (type) {
              case ItemType.PREVIOUS: {
                if (useAnchor && isActive) {
                  return (
                    <li key="prev" class="prev">
                      <a
                        href={this.hrefBuilder(value)}
                        aria-label={parsedIntl.prev}
                        onClick={(e: MouseEvent) => this.onAnchorClick(e, value)}
                      >
                        <PrefixedTagNames.pIcon {...iconProps} name="arrow-left" />
                      </a>
                    </li>
                  );
                }
                const spanProps = this.getSpanProps(isActive, value);
                return (
                  <li key="prev" class="prev">
                    {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: ok */}
                    <span {...spanProps} aria-label={parsedIntl.prev} aria-disabled={isActive ? null : 'true'}>
                      <PrefixedTagNames.pIcon {...iconProps} name="arrow-left" />
                    </span>
                  </li>
                );
              }

              case ItemType.ELLIPSIS:
                return (
                  <li key="ellip" class={{ ellip: true, [`ellip-${index === 2 ? 'start' : 'end'}`]: true }}>
                    <span class="ellipsis" />
                  </li>
                );

              case ItemType.PAGE: {
                const liClasses = {
                  current: isActive,
                  'current-1': isBeforeCurrent,
                  'current+1': isAfterCurrent,
                  'current-2': isBeforeBeforeCurrent,
                  'current+2': isAfterAfterCurrent,
                };
                if (useAnchor) {
                  return (
                    <li key={value} class={liClasses}>
                      <a
                        href={this.hrefBuilder(value)}
                        tabIndex={0}
                        aria-label={`${parsedIntl.page} ${value}`}
                        aria-current={isActive ? 'page' : null}
                        onClick={(e: MouseEvent) => this.onAnchorClick(e, value)}
                      >
                        {value}
                      </a>
                    </li>
                  );
                }
                const spanProps = this.getSpanProps(isActive, value);
                return (
                  <li key={value} class={liClasses}>
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
              }

              case ItemType.NEXT: {
                if (useAnchor && isActive) {
                  return (
                    <li key="next" class="next">
                      <a
                        href={this.hrefBuilder(value)}
                        aria-label={parsedIntl.next}
                        onClick={(e: MouseEvent) => this.onAnchorClick(e, value)}
                      >
                        <PrefixedTagNames.pIcon {...iconProps} name="arrow-right" />
                      </a>
                    </li>
                  );
                }
                const spanProps = this.getSpanProps(isActive, value);
                return (
                  <li key="next" class="next">
                    {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: ok */}
                    <span {...spanProps} aria-label={parsedIntl.next} aria-disabled={isActive ? null : 'true'}>
                      <PrefixedTagNames.pIcon {...iconProps} name="arrow-right" />
                    </span>
                  </li>
                );
              }
              default:
                return null;
            }
          })}
        </ul>
      </nav>
    );
  }

  private getSpanProps(isActive: boolean, value: number): Record<string, unknown> {
    return {
      role: 'button',
      tabIndex: isActive ? 0 : null,
      onClick: () => this.onClick(value),
      onKeyDown: (e: KeyboardEvent) => this.onKeyDown(e, value),
    };
  }

  private onKeyDown(event: KeyboardEvent, page: number): void {
    // from https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
    const { key } = event;
    if (key === ' ' || key === 'Enter' || key === 'Spacebar') {
      event.preventDefault(); // prevent the default action to stop scrolling when space is pressed
      this.onClick(page);
    }
  }

  private onAnchorClick(event: MouseEvent, page: number): void {
    event.preventDefault(); // prevent native navigation, let consumer handle via update event
    this.onClick(page);
  }

  private onClick(page: number): void {
    if (page !== this.activePage) {
      this.update.emit({ page, previousPage: this.activePage });
      this.activePage = page; // TODO: should become a controlled component
    }
  }
}
