import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getPrefixedTagNames, isDark, SubsetTextWeight } from '../../../utils';
import { generateGUID, getTitleTag, PanelSize, PanelStateChangeEvent } from './panel-utils';
import { HeadlineTag } from '../../basic/typography/headline/headline-utils';

@Component({
  tag: 'p-panel',
  styleUrl: 'panel.scss',
  shadow: true,
})
export class Panel {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<PanelSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: SubsetTextWeight = 'semibold';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Defines the title used in panel. */
  @Prop() public panelTitle: string;

  /** Sets a headline tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: HeadlineTag;

  /** Defines if panel is open. */
  @Prop() public open?: boolean;

  /** Emitted when panel state is changed. */
  @Event({ bubbles: false }) public panelStateChange: EventEmitter<PanelStateChangeEvent>;

  // private hasAccordionParent: boolean = getHasPAccordionParent(this.host);
  private labelledId: string;
  private controlsId: string;

  public componentWillLoad(): void {
    this.labelledId = `label-${generateGUID()}`;
    this.controlsId = `controls-${generateGUID()}`;
  }

  public render(): JSX.Element {
    const TagName = getTitleTag(this.tag);

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
    };
    const dividerClasses = {
      ['divider--open']: this.open,
    };
    const headlineClasses = {
      ['headline']: true,
      ['headline--closed']: !this.open,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <span class={rootClasses}>
        <TagName class={headlineClasses} onClick={this.handlePanelClick}>
          <button aria-expanded={this.open} aria-controls={this.controlsId} id={this.labelledId}>
            <PrefixedTagNames.pText size={this.size} weight={this.weight} theme={this.theme} tag="span">
              {this.panelTitle}
              {/* TODO: slotted title? */}
            </PrefixedTagNames.pText>
            <PrefixedTagNames.pIcon
              name={this.open ? 'close' : 'plus'}
              aria-label={this.open ? 'Close Icon' : 'Plus icon'}
              class="icon"
              lazy={true}
              theme={this.theme}
            />
          </button>
        </TagName>
        <div id={this.controlsId} class="content" role="region" aria-labelledby={this.labelledId} hidden={!this.open}>
          <slot />
        </div>
        <PrefixedTagNames.pDivider class={dividerClasses} color="neutral-contrast-medium" theme={this.theme} />
      </span>
    );
  }

  private handlePanelClick = (): void => {
    this.panelStateChange.emit({ open: !this.open });
  };
}
