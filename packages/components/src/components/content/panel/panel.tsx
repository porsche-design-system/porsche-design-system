import { Component, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { HeadlineVariant } from '../../../types';
import { isDark, mapBreakpointPropToClasses } from '../../../utils';
import { PanelSize, PanelStateChangeEvent } from './panel-utils';

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
  // @Prop() public weight?: TabWeight = 'regular';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Defines the title used in panel. */
  @Prop() public title: string;

  /** Predefined style of the headline. */
  @Prop() public headlineVariant?: HeadlineVariant = 'headline-1';

  /** Defines if panel is open. */
  @Prop() public open?: boolean;

  /** Emitted when panel state is changed. */
  @Event({ bubbles: false }) public stateChange: EventEmitter<PanelStateChangeEvent>;

  private hostObserver: MutationObserver;
  // private headlineElement: HTMLElement;
  // private panelButtonElement: HTMLElement;
  // private iconElement: HTMLElement;
  // private contentContainer: HTMLElement;
  // private hasAccordionParent: boolean = getHasPAccordionParent(this.host);

  @Watch('open')
  public openChangeHandler(open: boolean): void {
    this.open = open;
    this.setAccessibilityAttributes();
    if (open) {
      // this.focusableElements = getFocusableElements(this.host, this.closeBtn);
      // this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    } else {
      // this.focusedElBeforeOpen?.focus();
    }
  }

  public connectedCallback(): void {
    this.initMutationObserver();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.addEventListeners();
  }

  public componentDidRender(): void {
    this.setAccessibilityAttributes();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      // ['root--weight-semibold']: this.weight !== 'regular',
      ...mapBreakpointPropToClasses('root--size', this.size),
    };

    return (
      <div class={rootClasses}>
        <p-headline variant={this.headlineVariant}>
          <button
            aria-expanded={this.open}
            class="button"
            aria-controls={this.title}
            id="accordion1id"
            onClick={this.handleToggleClick}
          >
            <span class="title">
              {this.title}
              <p-icon
                name={this.open ? 'close' : 'plus'}
                aria-label={this.open ? 'Close Icon' : 'Plus icon'}
                class="icon"
                lazy={true}
              ></p-icon>
            </span>
          </button>
        </p-headline>
        <div id={this.title} role="region" aria-labelledby="accordion1id" class="content" hidden={!this.open}>
          <slot />
        </div>
      </div>
    );
  }

  private handleToggleClick = (): void => {
    this.stateChange.emit({ open: !this.open });
  };

  private setAccessibilityAttributes = (): void => {
    // for (const [index, tab] of Object.entries(this.tabElements)) {
    //   const tabIndex = this.activeTabIndex ?? 0;
    //   const isFocusable = tabIndex === +index;
    //   const isSelected = this.activeTabIndex === +index;
    //   const attrs = {
    //     role: 'tab',
    //     tabindex: isFocusable ? '0' : '-1',
    //     'aria-selected': isSelected ? 'true' : 'false',
    //   };
    //   for (const [key, value] of Object.entries(attrs)) {
    //     setAttribute(tab, key, value);
    //   }
    // }
  };

  private defineHTMLElements = (): void => {
    // const { shadowRoot } = this.host;
    // this.headlineElement = getHTMLElement(shadowRoot, '.title');
    // this.panelButtonElement = getHTMLElement(shadowRoot, '.button');
    // this.iconElement = getHTMLElement(shadowRoot, '.icon');
    // this.contentContainer = getHTMLElement(shadowRoot, '.content');
  };

  private addEventListeners = (): void => {
    // this.scrollAreaElement.addEventListener('keydown', this.handleKeydown);
  };

  private initMutationObserver = (): void => {
    this.hostObserver = new MutationObserver((): void => {
      this.setAccessibilityAttributes();
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  };

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
