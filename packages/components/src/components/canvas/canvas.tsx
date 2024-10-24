import { type PropTypes, type Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasNamedSlot,
  THEMES,
  validateProps,
} from '../../utils';
import { Component, Element, Event, type EventEmitter, h, Host, type JSX, Prop, State } from '@stencil/core';
import { getComponentCss } from './canvas-styles';
import { breakpointS, breakpointM } from '@porsche-design-system/styles';
import { type CanvasUpdateEventDetail } from './canvas-utils';

const propTypes: PropTypes<typeof Canvas> = {
  sidebarStartOpen: AllowedTypes.boolean,
  sidebarEndOpen: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "title", "description": "Renders the application name in the header section of the sidebar start area." }
 * @slot {"name": "header-start", "description": "Renders a **sticky** header section above the content area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode)." }
 * @slot {"name": "header-end", "description": "Renders a **sticky** header section above the content area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode)." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Renders a **sticky** footer section underneath the main content." }
 * @slot {"name": "sidebar-start", "description": "Renders a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end", "description": "Renders a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "background", "description": "Can be used to pass a sticky media element <img/> or <video/> placed underneath the main content." }
 *
 * @experimental
 */
@Component({
  tag: 'p-canvas',
  shadow: true,
})
export class Canvas {
  @Element() public host!: HTMLElement;

  /** Open the sidebar on the start side */
  @Prop() public sidebarStartOpen?: boolean = false;

  /** Open the sidebar on the end side */
  @Prop() public sidebarEndOpen?: boolean = false;

  /** Adapts the color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the sidebar start requests to be opened or dismissed. */
  @Event({ bubbles: false }) public sidebarStartUpdate?: EventEmitter<CanvasUpdateEventDetail>;

  /** Emitted when the sidebar end requests to be dismissed. */
  @Event({ bubbles: false }) public sidebarEndDismiss?: EventEmitter<void>;

  @State() private isMediaQueryS = false;
  @State() private isMediaQueryM = false;

  private matchMediaQueryS = window.matchMedia(`(min-width: ${breakpointS}px)`);
  private matchMediaQueryM = window.matchMedia(`(min-width: ${breakpointM}px)`);

  private hasTitle: boolean;
  private hasSidebarEnd: boolean;
  private hasFooter: boolean;
  private hasBackground: boolean;

  public connectedCallback(): void {
    this.handleMediaQueryS(this.matchMediaQueryS);
    this.handleMediaQueryM(this.matchMediaQueryM);

    this.matchMediaQueryS.addEventListener('change', this.handleMediaQueryS);
    this.matchMediaQueryM.addEventListener('change', this.handleMediaQueryM);
  }

  public disconnectedCallback(): void {
    this.matchMediaQueryS.removeEventListener('change', this.handleMediaQueryS);
    this.matchMediaQueryM.removeEventListener('change', this.handleMediaQueryM);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasTitle = hasNamedSlot(this.host, 'title');
    this.hasSidebarEnd = hasNamedSlot(this.host, 'sidebar-end');
    this.hasFooter = hasNamedSlot(this.host, 'footer');
    this.hasBackground = hasNamedSlot(this.host, 'background');

    attachComponentCss(this.host, getComponentCss, this.theme, this.sidebarStartOpen, this.sidebarEndOpen);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="root">
          <header class="header">
            <div class="blur">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="header__area header__area--start">
              {!this.sidebarStartOpen && (
                <PrefixedTagNames.pButton
                  theme={this.theme}
                  icon="sidebar"
                  variant="ghost"
                  compact={true}
                  hide-label="true"
                  aria={{ 'aria-expanded': this.sidebarStartOpen }}
                  onClick={this.toggleSidebarStart}
                >
                  {this.sidebarStartOpen ? 'Close' : 'Open'} navigation sidebar
                </PrefixedTagNames.pButton>
              )}
              <slot name="header-start" />
            </div>
            <PrefixedTagNames.pCrest class="header__crest" />
            <PrefixedTagNames.pWordmark class="header__wordmark" size="inherit" theme={this.theme} />
            <div class="header__area header__area--end">
              <slot name="header-end" />
            </div>
          </header>
          <main class="main">
            <slot />
          </main>
          {this.hasFooter && (
            <footer class="footer">
              <slot name="footer" />
            </footer>
          )}
          {this.isMediaQueryS && (
            <aside
              class="sidebar sidebar--start"
              // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
              // eslint-disable-next-line
              /* @ts-ignore */
              inert={this.sidebarStartOpen ? null : true}
              aria-label={`Navigation sidebar ${this.sidebarStartOpen ? 'open' : 'closed'}`}
            >
              <div class="sidebar__scroller">
                <header class="sidebar__header sidebar__header--start">
                  <PrefixedTagNames.pButton
                    theme={this.theme}
                    icon="sidebar"
                    variant="ghost"
                    compact={true}
                    hide-label="true"
                    aria={{ 'aria-expanded': this.sidebarStartOpen }}
                    onClick={this.toggleSidebarStart}
                  >
                    {this.sidebarStartOpen ? 'Close' : 'Open'} navigation sidebar
                  </PrefixedTagNames.pButton>
                  <h2>
                    <slot name="title" />
                  </h2>
                </header>
                <div class="sidebar__content">
                  <slot name="sidebar-start" />
                </div>
              </div>
            </aside>
          )}
          {this.hasSidebarEnd && this.isMediaQueryM && (
            <aside
              class="sidebar sidebar--end"
              // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
              // eslint-disable-next-line
              /* @ts-ignore */
              inert={this.sidebarEndOpen ? null : true}
              aria-label={`Settings sidebar ${this.sidebarEndOpen ? 'open' : 'closed'}`}
            >
              <div class="sidebar__scroller">
                <header class="sidebar__header sidebar__header--end">
                  <PrefixedTagNames.pButton
                    theme={this.theme}
                    icon="close"
                    variant="ghost"
                    compact={true}
                    hide-label="true"
                    aria={{ 'aria-expanded': this.sidebarEndOpen }}
                    onClick={this.onDismissSidebarEnd}
                  >
                    {this.sidebarStartOpen ? 'Close' : 'Open'} navigation sidebar
                  </PrefixedTagNames.pButton>
                </header>
                <div class="sidebar__content">
                  <slot name="sidebar-end" />
                </div>
              </div>
            </aside>
          )}
          {this.hasBackground && <slot name="background" />}
        </div>
        {!this.isMediaQueryS && (
          <PrefixedTagNames.pFlyout
            class="flyout-start"
            theme={this.theme}
            open={this.sidebarStartOpen}
            position="start"
            onDismiss={this.onDismissSidebarStart}
          >
            {this.hasTitle && (
              <h2 slot="header">
                <slot name="title" />
              </h2>
            )}
            <slot name="sidebar-start" />
          </PrefixedTagNames.pFlyout>
        )}
        {this.hasSidebarEnd && !this.isMediaQueryM && (
          <PrefixedTagNames.pFlyout
            class="flyout-end"
            theme={this.theme}
            open={this.sidebarEndOpen}
            position="end"
            onDismiss={this.onDismissSidebarEnd}
          >
            <slot name="sidebar-end" />
          </PrefixedTagNames.pFlyout>
        )}
      </Host>
    );
  }

  private handleMediaQueryS = (e: MediaQueryList | MediaQueryListEvent): void => {
    this.isMediaQueryS = !!e.matches;
  };

  private handleMediaQueryM = (e: MediaQueryList | MediaQueryListEvent): void => {
    this.isMediaQueryM = !!e.matches;
  };

  private toggleSidebarStart = (): void => {
    this.sidebarStartUpdate.emit({
      open: !this.sidebarStartOpen,
    });
  };

  private onDismissSidebarStart = (): void => {
    this.sidebarStartUpdate.emit({
      open: false,
    });
  };

  private onDismissSidebarEnd = (): void => {
    this.sidebarEndDismiss.emit();
  };
}
