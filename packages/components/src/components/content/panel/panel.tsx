import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getPrefixedTagNames, isDark, SubsetTextWeight } from '../../../utils';
import { getTitleTag, PanelSize, PanelStateChangeEvent } from './panel-utils';
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

  /** Defines the heading used in panel. */
  @Prop() public heading?: string;

  /** Sets a headline tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: HeadlineTag;

  /** Defines if panel is open. */
  @Prop() public open?: boolean;

  /** Emitted when panel state is changed. */
  @Event({ bubbles: false }) public panelStateChange: EventEmitter<PanelStateChangeEvent>;

  // private hasAccordionParent: boolean = getHasPAccordionParent(this.host);

  public render(): JSX.Element {
    const TagName = getTitleTag(this.tag);

    const labelledId = 'labelled';
    const controlsId = 'controls';

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--open']: this.open,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class={rootClasses}>
        <TagName class="headline" onClick={this.handlePanelClick}>
          <button aria-expanded={this.open} aria-controls={controlsId} id={labelledId}>
            <PrefixedTagNames.pText size={this.size} weight={this.weight} theme={this.theme} tag="span">
              {this.heading}
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
        <div id={controlsId} class="content" role="region" aria-labelledby={labelledId} >
          <slot />
        </div>
      </div>
    );
  }

  private handlePanelClick = (): void => {
    this.panelStateChange.emit({ open: !this.open });
  };
}
