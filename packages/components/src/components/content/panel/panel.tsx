import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getPrefixedTagNames, isDark, mapBreakpointPropToClasses, SubsetTextWeight } from '../../../utils';
import { PanelSize, PanelChangeEvent } from './panel-utils';
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
  @Prop() public tag?: HeadlineTag = 'h2';

  /** Defines if panel is open. */
  @Prop() public open?: boolean;

  /** Emitted when panel state is changed. */
  @Event({ bubbles: false }) public panelChange: EventEmitter<PanelChangeEvent>;

  public render(): JSX.Element {
    const labelledId = 'labelled';
    const controlsId = 'controls';

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--open']: this.open,
      ['root--weight-regular']: this.weight !== 'semibold',
      ...mapBreakpointPropToClasses('root--size', this.size),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class={rootClasses}>
        <PrefixedTagNames.pHeadline
          tag={this.tag}
          theme={this.theme}
          class="heading-wrapper"
          variant="inherit"
          onClick={this.handlePanelClick}
        >
          <button aria-expanded={this.open} aria-controls={controlsId} id={labelledId}>
            <span class="heading">{this.heading || <slot name="heading" />}</span>
            <PrefixedTagNames.pIcon
              name="arrowHeadDown"
              aria-label={this.open ? 'Close icon' : 'Open icon'}
              class="icon"
              theme={this.theme}
            />
          </button>
        </PrefixedTagNames.pHeadline>
        <div id={controlsId} class="content" role="region" aria-labelledby={labelledId}>
          <slot />
        </div>
      </div>
    );
  }

  private handlePanelClick = (): void => {
    this.panelChange.emit({ open: !this.open });
  };
}
