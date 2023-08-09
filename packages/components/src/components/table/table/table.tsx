import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasNamedSlot,
  THEMES,
  validateProps,
} from '../../../utils';
import type { PropTypes, Theme } from '../../../types';
import { getComponentCss } from './table-styles';
import type { TableUpdateEvent } from './table-utils';
import { SORT_EVENT_NAME, warnIfCaptionIsMissing } from './table-utils';

const propTypes: PropTypes<typeof Table> = {
  caption: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  sticky: AllowedTypes.boolean,
  stickyHeight: AllowedTypes.string,
};

@Component({
  tag: 'p-table',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  /** A caption describing the contents of the table for accessibility only. This won't be visible in the browser.
   * Use an element with an attribute of `slot="caption"` for a visible caption. */
  @Prop() public caption?: string;

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Should this table have sticky column headers. */
  @Prop() public sticky?: boolean = false;

  /** If the table is sticky it must have a fixed height. */
  @Prop() public stickyHeight?: string = '';

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when sorting is changed. */
  @Event({ bubbles: false }) public sortingChange: EventEmitter<TableUpdateEvent>;

  /** Emitted when sorting is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TableUpdateEvent>;

  public componentWillLoad(): void {
    warnIfCaptionIsMissing(this.host, this.caption);
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e: CustomEvent<TableUpdateEvent>) => {
      e.stopPropagation();
      this.update.emit(e.detail);
      this.sortingChange.emit(e.detail);
    });
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme, this.sticky);

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const hasSlottedCaption = hasNamedSlot(this.host, 'caption');
    const captionId = 'caption';
    const tableAttr = this.caption
      ? { 'aria-label': this.caption }
      : hasSlottedCaption && { 'aria-labelledby': captionId };

    return (
      <Host>
        {hasSlottedCaption && (
          <div id={captionId} class="caption">
            <slot name="caption" />
          </div>
        )}

        <PrefixedTagNames.pScroller
          scrollbar={true}
          theme={this.theme}
          maxHeight={this.sticky ? this.stickyHeight : undefined}
        >
          <div class="table" role="table" {...tableAttr}>
            <slot />
          </div>
        </PrefixedTagNames.pScroller>
      </Host>
    );
  }
}
