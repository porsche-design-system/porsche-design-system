import type { PropTypes, Theme } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasNamedSlot,
  THEMES,
  validateProps,
} from '../../utils';
import { Component, Element, h, Host, type JSX, Prop, State } from '@stencil/core';
import { getComponentCss } from './canvas-styles';
import { type CanvasSidebarEndIcon, type CanvasSidebarStartIcon } from './canvas-utils';
import { breakpointM, breakpointS } from '@porsche-design-system/styles';

const propTypes: PropTypes<typeof Canvas> = {
  sidebarStartOpen: AllowedTypes.boolean,
  sidebarStartIcon: AllowedTypes.string,
  sidebarEndOpen: AllowedTypes.boolean,
  sidebarEndIcon: AllowedTypes.string,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "header-start", "description": "Renders a **sticky** header section above the content area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode)." }
 * @slot {"name": "header-end", "description": "Renders a **sticky** header section above the content area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode)." }
 * @slot {"name": "", "description": "Default slot for the main content" }
 * @slot {"name": "title", "description": "Application name" }
 * @slot {"name": "footer", "description": "Shows a footer section, flowing under the content area when scrollable." }
 * @slot {"name": "sidebar-start", "description": "Shows a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end", "description": "Shows a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "background", "description": "Can be used to pass a sticky media element placed over the whole main area." }
 *
 * @experimental
 */
@Component({
  tag: 'p-canvas',
  shadow: true,
})
export class Canvas {
  @Element() public host!: HTMLElement;

  /** Open Sidebar on the start side */
  @Prop({ mutable: true }) public sidebarStartOpen?: boolean = false;

  /** The icon to toggle the Sidebar on the start side */
  @Prop() public sidebarStartIcon?: CanvasSidebarStartIcon = 'menu-lines';

  /** Open Sidebar on the end side */
  @Prop() public sidebarEndOpen?: boolean = false;

  /** The icon to toggle the Sidebar on the end side */
  @Prop() public sidebarEndIcon?: CanvasSidebarEndIcon = 'menu-lines';

  /** Adapts the color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  @State() private isDesktopView = false;
  @State() private isTabletView = false;

  private mediaQueryDesktopView = window.matchMedia(`(min-width: ${breakpointM}px)`);
  private mediaQueryTabletView = window.matchMedia(`(min-width: ${breakpointS}px)`);
  private hasSidebarStart: boolean;
  private hasSidebarEnd: boolean;

  public connectedCallback(): void {
    this.handleDesktopMediaQuery(this.mediaQueryDesktopView);
    this.handleTabletMediaQuery(this.mediaQueryTabletView);

    this.mediaQueryDesktopView.addEventListener('change', this.handleDesktopMediaQuery);
    this.mediaQueryTabletView.addEventListener('change', this.handleTabletMediaQuery);

    if (this.isTabletView) {
      this.sidebarStartOpen = true;
    }
  }

  public disconnectedCallback(): void {
    this.mediaQueryDesktopView.removeEventListener('change', this.handleDesktopMediaQuery);
    this.mediaQueryTabletView.removeEventListener('change', this.handleTabletMediaQuery);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasSidebarStart = hasNamedSlot(this.host, 'sidebar-start');
    this.hasSidebarEnd = hasNamedSlot(this.host, 'sidebar-end');

    attachComponentCss(this.host, getComponentCss, this.theme, this.sidebarStartOpen, this.sidebarEndOpen);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="canvas">
          <header>
            <div class="blur-layers">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="header">
              {this.hasSidebarStart && !this.sidebarStartOpen && (
                <PrefixedTagNames.pButton
                  theme={this.theme}
                  icon={this.sidebarStartIcon}
                  variant="ghost"
                  compact={true}
                  hide-label="true"
                  aria={{ 'aria-expanded': this.sidebarStartOpen }}
                  onClick={this.toggleSidebarStart}
                >
                  {this.sidebarStartOpen ? 'Close' : 'Open'} navigation sidebar
                </PrefixedTagNames.pButton>
              )}
              {this.hasSidebarStart && !this.sidebarStartOpen && <slot name="header-start" />}
              {this.isTabletView && (
                <h2>
                  <slot name="title" />
                </h2>
              )}
            </div>
            <PrefixedTagNames.pCrest class="crest" />
            <PrefixedTagNames.pWordmark class="wordmark" size="inherit" theme={this.theme} />
            <div class="header">
              <slot name="header-end" />
              {this.hasSidebarEnd && (
                <PrefixedTagNames.pButton
                  theme={this.theme}
                  icon={this.sidebarEndIcon}
                  variant="ghost"
                  compact={true}
                  hide-label="true"
                  aria={{ 'aria-expanded': this.sidebarEndOpen }}
                  onClick={this.toggleSidebarEnd}
                >
                  {this.sidebarEndOpen ? 'Close' : 'Open'} settings sidebar
                </PrefixedTagNames.pButton>
              )}
            </div>
          </header>
          <main>
            <slot />
          </main>
          <footer>
            <slot name="footer" />
          </footer>
          {this.isTabletView && this.hasSidebarStart && (
            <aside
              class="sidebar-start"
              // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
              // eslint-disable-next-line
              /* @ts-ignore */
              inert={this.sidebarStartOpen ? null : true}
              aria-label={`Navigation sidebar ${this.sidebarStartOpen ? 'open' : 'closed'}`}
            >
              <div class="scroller">
                <div class="sidebar-header">
                  <PrefixedTagNames.pButton
                    theme={this.theme}
                    icon={this.sidebarStartIcon}
                    variant="ghost"
                    compact={true}
                    hide-label="true"
                    aria={{ 'aria-expanded': this.sidebarStartOpen }}
                    onClick={this.toggleSidebarStart}
                  >
                    {this.sidebarStartOpen ? 'Close' : 'Open'} navigation sidebar
                  </PrefixedTagNames.pButton>
                  <slot name="header-start" />
                </div>
                <slot name="sidebar-start" />
              </div>
            </aside>
          )}
          {this.isDesktopView && this.hasSidebarEnd && (
            <aside
              class="sidebar-end"
              // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
              // eslint-disable-next-line
              /* @ts-ignore */
              inert={this.sidebarEndOpen ? null : true}
              aria-label={`Settings sidebar ${this.sidebarEndOpen ? 'open' : 'closed'}`}
            >
              <div class="scroller">
                <div class="sidebar-header">
                  <PrefixedTagNames.pButton
                    theme={this.theme}
                    icon="close"
                    variant="ghost"
                    compact={true}
                    hide-label="true"
                    aria={{ 'aria-expanded': this.sidebarEndOpen }}
                    onClick={this.toggleSidebarEnd}
                  >
                    {this.sidebarStartOpen ? 'Close' : 'Open'} navigation sidebar
                  </PrefixedTagNames.pButton>
                </div>
                <slot name="sidebar-end" />
              </div>
            </aside>
          )}
          <slot name="background" />
        </div>
        {!this.isTabletView && this.hasSidebarStart && (
          <PrefixedTagNames.pFlyout
            class="flyout-start"
            theme={this.theme}
            open={this.sidebarStartOpen}
            position="start"
            onDismiss={this.onDismissSidebarStart}
          >
            <h2 slot="header">
              <slot name="title" />
            </h2>
            <slot name="sidebar-start" />
          </PrefixedTagNames.pFlyout>
        )}
        {!this.isDesktopView && this.hasSidebarEnd && (
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

  private handleDesktopMediaQuery = (e: MediaQueryList | MediaQueryListEvent): void => {
    this.isDesktopView = !!e.matches;
  };

  private handleTabletMediaQuery = (e: MediaQueryList | MediaQueryListEvent): void => {
    this.isTabletView = !!e.matches;
  };

  private toggleSidebarStart = (): void => {
    this.sidebarStartOpen = !this.sidebarStartOpen;
  };

  private toggleSidebarEnd = (): void => {
    this.sidebarEndOpen = !this.sidebarEndOpen;
  };

  private onDismissSidebarStart = (): void => {
    this.sidebarStartOpen = false;
  };

  private onDismissSidebarEnd = (): void => {
    this.sidebarEndOpen = false;
  };
}
