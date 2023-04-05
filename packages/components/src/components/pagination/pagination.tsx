import { Component, Element, Event, EventEmitter, h, JSX, Prop, State } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  parseJSONAttribute,
  THEMES,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type {
  PaginationMaxNumberOfPageLinks,
  PaginationChangeEvent,
  PaginationInternationalization,
} from './pagination-utils';
import {
  createPaginationModel,
  getCounterResetValue,
  getCurrentActivePage,
  getTotalPages,
  itemTypes,
  PAGINATION_NUMBER_OF_PAGE_LINKS,
} from './pagination-utils';
import { listenResize } from '../../utils/window-resize-listener';
import { getComponentCss } from './pagination-styles';

const propTypes: PropTypes<typeof Pagination> = {
  totalItemsCount: AllowedTypes.number,
  itemsPerPage: AllowedTypes.number,
  activePage: AllowedTypes.number,
  maxNumberOfPageLinks: AllowedTypes.breakpoint<PaginationMaxNumberOfPageLinks>(PAGINATION_NUMBER_OF_PAGE_LINKS),
  allyLabel: AllowedTypes.string,
  allyLabelPrev: AllowedTypes.string,
  allyLabelPage: AllowedTypes.string,
  allyLabelNext: AllowedTypes.string,
  intl: AllowedTypes.shape<Required<PaginationInternationalization>>({
    root: AllowedTypes.string,
    prev: AllowedTypes.string,
    next: AllowedTypes.string,
    page: AllowedTypes.string,
  }),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

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

  /** The maximum number of page links rendered */
  @Prop() public maxNumberOfPageLinks?: BreakpointCustomizable<PaginationMaxNumberOfPageLinks> = {
    base: 5,
    xs: 7,
  };

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `intl.root` instead.
   * Aria label what the pagination is used for. */
  @Prop() public allyLabel?: string;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `intl.prev` instead.
   * Aria label for previous page icon. */
  @Prop() public allyLabelPrev?: string;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `intl.page` instead.
   * Aria label for page navigation. */
  @Prop() public allyLabelPage?: string;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `intl.next` instead.
   * Aria label for next page icon. */
  @Prop() public allyLabelNext?: string;

  /** Override the default wordings that are used for aria-labels on the next/prev and page buttons. */
  @Prop() public intl?: PaginationInternationalization = {
    root: 'Pagination',
    prev: 'Previous page',
    next: 'Next page',
    page: 'Page',
  };

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when the page changes. */
  @Event({ bubbles: false }) public pageChange: EventEmitter<PaginationChangeEvent>;

  /** Emitted when the page changes. */
  @Event({ bubbles: false }) public update: EventEmitter<PaginationChangeEvent>;

  @State() private breakpointMaxNumberOfPageLinks: PaginationMaxNumberOfPageLinks = 7;

  private navigationElement: HTMLElement;
  private unlistenResize: () => void;

  public componentDidLoad(): void {
    this.unlistenResize = listenResize(this.updateMaxNumberOfPageLinks);

    this.updateMaxNumberOfPageLinks(); // TODO: this causes initial rerender
  }

  public disconnectedCallback(): void {
    if (this.unlistenResize) {
      this.unlistenResize();
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Pagination>(this, 'allyLabel', 'Please use intl prop with intl.root instead.');
    warnIfDeprecatedPropIsUsed<typeof Pagination>(
      this,
      'allyLabelNext',
      'Please use intl prop with intl.next instead.'
    );
    warnIfDeprecatedPropIsUsed<typeof Pagination>(
      this,
      'allyLabelPrev',
      'Please use intl prop with intl.prev instead.'
    );
    warnIfDeprecatedPropIsUsed<typeof Pagination>(
      this,
      'allyLabelPage',
      'Please use intl prop with intl.page instead.'
    );
    attachComponentCss(this.host, getComponentCss, this.maxNumberOfPageLinks, this.theme);

    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    const paginationModel = createPaginationModel({
      activePage: getCurrentActivePage(this.activePage, pageTotal),
      pageTotal,
      pageRange: this.breakpointMaxNumberOfPageLinks === 7 ? 1 : 0,
    });
    const parsedIntl = parseJSONAttribute(this.intl);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <nav role="navigation" aria-label={this.allyLabel || parsedIntl.root} ref={(el) => (this.navigationElement = el)}>
        <ul>
          {paginationModel.map((pageModel) => {
            const { type, isActive, value } = pageModel;
            const spanProps = {
              role: 'button',
              tabIndex: isActive ? 0 : null,
              onClick: () => this.onClick(value),
              onKeyDown: (e: KeyboardEvent) => this.onKeyDown(e, value),
            };
            const iconProps = {
              theme: this.theme,
              color: isActive ? 'primary' : 'state-disabled',
              'aria-hidden': 'true',
            };

            switch (type) {
              case itemTypes.PREVIOUS_PAGE_LINK:
                return (
                  <li key="prev">
                    <span
                      {...spanProps}
                      aria-disabled={isActive ? null : 'true'}
                      aria-label={this.allyLabelPrev || parsedIntl.prev}
                    >
                      <PrefixedTagNames.pIcon name="arrow-left" {...iconProps} />
                    </span>
                  </li>
                );

              case itemTypes.ELLIPSIS:
                return (
                  <li key="ellipsis">
                    <span class="ellipsis" />
                  </li>
                );

              case itemTypes.PAGE:
                return (
                  <li key={value}>
                    <span
                      {...spanProps}
                      tabIndex={0}
                      aria-label={`${this.allyLabelPage || parsedIntl.page} ${value}`}
                      aria-current={isActive ? 'page' : null}
                    >
                      {value}
                    </span>
                  </li>
                );

              case itemTypes.NEXT_PAGE_LINK:
                return (
                  <li key="next">
                    <span
                      {...spanProps}
                      aria-disabled={isActive ? null : 'true'}
                      aria-label={this.allyLabelNext || parsedIntl.next}
                    >
                      <PrefixedTagNames.pIcon name="arrow-right" {...iconProps} />
                    </span>
                  </li>
                );
            }
          })}
        </ul>
      </nav>
    );
  }

  private onKeyDown(event: KeyboardEvent, page: number): void {
    /**
     * from https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
     */
    const { key } = event;
    if (key === ' ' || key === 'Enter' || key === 'Spacebar') {
      /**
       * Prevent the default action to stop scrolling when space is pressed
       */
      event.preventDefault();
      this.onClick(page);
    }
  }

  private onClick(page: number): void {
    if (page !== this.activePage) {
      this.update.emit({ page, previousPage: this.activePage });
      this.pageChange.emit({ page, previousPage: this.activePage });
      this.activePage = page; // TODO: should become a controlled component
    }
  }

  private updateMaxNumberOfPageLinks = (): void => {
    this.breakpointMaxNumberOfPageLinks = getCounterResetValue(this.navigationElement);
  };
}
