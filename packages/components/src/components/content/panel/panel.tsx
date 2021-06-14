import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { getPrefixedTagNames, isDark, mapBreakpointPropToClasses } from '../../../utils';
import { getTitleTag, PanelSize, PanelStateChangeEvent, PanelWeight } from './panel-utils';
import { HeadlineTag } from '../../basic/typography/headline/headline-utils';
import { generateGUID } from '../../../../../components-js/tests/vrt/helpers';

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
  @Prop() public weight?: PanelWeight = 'regular';

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

  // private hostObserver: MutationObserver;
  // private headlineElement: HTMLElement;
  // private panelButtonElement: HTMLElement;
  // private iconElement: HTMLElement;
  // private contentContainer: HTMLElement;
  // private hasAccordionParent: boolean = getHasPAccordionParent(this.host);

  @Watch('open')
  public openChangeHandler(open: boolean): void {
    this.open = open;
  }
  //
  // public connectedCallback(): void {
  //   this.initMutationObserver();
  // }

  // public componentDidLoad(): void {
  // this.defineHTMLElements();
  // this.addEventListeners();
  // }
  //
  // public componentDidRender(): void {
  //   this.setAccessibilityAttributes();
  // }

  // public disconnectedCallback(): void {
  // this.hostObserver.disconnect();
  // }

  public render(): JSX.Element {
    const TagName = getTitleTag(this.tag);

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ['root--weight-semibold']: this.weight !== 'regular',
      ...mapBreakpointPropToClasses('root--size', this.size),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const id = `panel-${generateGUID()}`;

    return (
      <div class={rootClasses}>
        <TagName>
          <button aria-expanded={this.open} aria-controls={this.panelTitle} id={id} onClick={this.handleToggleClick}>
            <PrefixedTagNames.pText size={this.size} weight={this.weight} color="inherit" tag="span">
              {this.panelTitle}
              {/* TODO: slotted title? */}
              <p-icon
                name={this.open ? 'close' : 'plus'}
                aria-label={this.open ? 'Close Icon' : 'Plus icon'}
                class="icon"
                lazy={true}
              ></p-icon>
            </PrefixedTagNames.pText>
          </button>
        </TagName>
        <div id={this.panelTitle} role="region" aria-labelledby={id} class="content" hidden={!this.open}>
          <slot />
        </div>
      </div>
    );
  }

  private handleToggleClick = (): void => {
    this.panelStateChange.emit({ open: !this.open });
  };

  // private defineHTMLElements = (): void => {
  // const { shadowRoot } = this.host;
  // this.headlineElement = getHTMLElement(shadowRoot, '.title');
  // this.panelButtonElement = getHTMLElement(shadowRoot, '.button');
  // this.iconElement = getHTMLElement(shadowRoot, '.icon');
  // this.contentContainer = getHTMLElement(shadowRoot, '.content');
  // };

  // private addEventListeners = (): void => {
  // this.scrollAreaElement.addEventListener('keydown', this.handleKeydown);
  // };

  // private initMutationObserver = (): void => {
  //   this.hostObserver = new MutationObserver((): void => {
  //     this.setAccessibilityAttributes();
  //   });
  //   this.hostObserver.observe(this.host, {
  //     childList: true,
  //     subtree: true,
  //     characterData: true,
  //   });
  // };

  // private handleKeydown = (e: KeyboardEvent): void => {
  //   let upcomingPanelIndex: number;
  //   switch (e.key) {
  //     case 'ArrowDown':
  //     case 'Down':
  //       upcomingPanelIndex = this.getPrevNextTabIndex('prev');
  //       break;
  //
  //     case 'ArrowUp':
  //     case 'Up':
  //       upcomingPanelIndex = this.getPrevNextTabIndex('next');
  //       break;
  //
  //     case 'Home':
  //       upcomingPanelIndex = 0;
  //       break;
  //
  //     case 'End':
  //       upcomingPanelIndex = this.tabElements.length - 1;
  //       break;
  //
  //     case 'Enter':
  //       this.handleTabClick(this.focusedTabIndex);
  //       return;
  //
  //     default:
  //       return;
  //   }
  //
  //   if (this.hasAccordionParent) {
  //     this.handleTabClick(upcomingPanelIndex);
  //   }
  //
  //   e.preventDefault();
  // };
}
