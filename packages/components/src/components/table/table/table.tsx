import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../../styles';
import type { PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  hasNamedSlot,
  THEMES,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './table-styles';
import {
  SORT_EVENT_NAME,
  TABLE_LAYOUTS,
  type TableLayout,
  type TableUpdateEventDetail,
  warnIfCaptionIsMissing,
} from './table-utils';

const propTypes: PropTypes<typeof Table> = {
  caption: AllowedTypes.string,
  compact: AllowedTypes.boolean,
  layout: AllowedTypes.oneOf<TableLayout>(TABLE_LAYOUTS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "caption", "description": "Shows a caption that describes the content of the table." }
 * @slot {"name": "", "description": "Default slot for the table content." }
 */
@Component({
  tag: 'p-table',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  /** A caption describing the contents of the table for accessibility only. This won't be visible in the browser.
   * Use an element with an attribute of `slot="caption"` for a visible caption. */
  @Prop() public caption?: string;

  /** Displays as compact version. */
  @Prop() public compact?: boolean = false;

  /** Controls the layout behavior of the table. */
  @Prop() public layout?: TableLayout = 'auto';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when sorting is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TableUpdateEventDetail>;

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentWillLoad(): void {
    warnIfCaptionIsMissing(this.host, this.caption);
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e: CustomEvent<TableUpdateEventDetail>) => {
      e.stopPropagation();
      this.update.emit(e.detail);
    });
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.compact, this.layout, this.theme);

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

        <PrefixedTagNames.pScroller scrollbar={true} theme={this.theme}>
          <div class="table" role="table" {...tableAttr}>
            <slot />
          </div>
        </PrefixedTagNames.pScroller>
      </Host>
    );
  }
}
