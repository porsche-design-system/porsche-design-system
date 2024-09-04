import type { PropTypes, Theme } from '../../types';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, THEMES, validateProps } from '../../utils';
import { Component, Element, h, type JSX, Prop, Event, State, Host, Fragment, type EventEmitter } from '@stencil/core';
import { getComponentCss } from './canvas-styles';
import { CANVAS_SIDEBAR_WIDTHS, type CanvasSidebarEndWidth, type CanvasSidebarStartWidth } from './canvas-utils';
import { breakpointM } from '@porsche-design-system/styles';

const propTypes: PropTypes<typeof Canvas> = {
  sidebarStartOpen: AllowedTypes.boolean,
  sidebarStartWidth: AllowedTypes.oneOf<CanvasSidebarStartWidth>(CANVAS_SIDEBAR_WIDTHS),
  sidebarEndOpen: AllowedTypes.boolean,
  sidebarEndWidth: AllowedTypes.oneOf<CanvasSidebarEndWidth>(CANVAS_SIDEBAR_WIDTHS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "header", "description": "Renders a **sticky** header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the main content" }
 * @slot {"name": "footer", "description": "Shows a footer section, flowing under the content area when scrollable." }
 * @slot {"name": "sidebar-start", "description": "Shows a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end", "description": "Shows a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). On mobile view it transforms into a flyout." }
 *
 * @controlled {"props": ["sidebarStartOpen"], "event": "dismissSidebarStart"}
 * @controlled {"props": ["sidebarEndOpen"], "event": "dismissSidebarEnd"}
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
  @Prop() public sidebarStartOpen?: boolean = false;

  /** Defines the width of the sidebar on the start side */
  @Prop() public sidebarStartWidth?: CanvasSidebarStartWidth = 'medium';

  /** Open Sidebar on the end side */
  @Prop() public sidebarEndOpen?: boolean = false;

  /** Defines the width of the sidebar on the end side */
  @Prop() public sidebarEndWidth?: CanvasSidebarEndWidth = 'medium';

  /** Adapts the color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the component requests to close the sidebar on the start side. */
  @Event({ bubbles: false }) public dismissSidebarStart?: EventEmitter<void>;

  /** Emitted when the component requests to close the sidebar on the end side. */
  @Event({ bubbles: false }) public dismissSidebarEnd?: EventEmitter<void>;

  @State() private isDesktopView = false;

  private mediaQueryDesktopView = window.matchMedia(`(min-width: ${breakpointM}px)`);

  public connectedCallback(): void {
    this.handleMediaQuery(this.mediaQueryDesktopView);
    this.mediaQueryDesktopView.addEventListener('change', this.handleMediaQuery);
  }

  public disconnectedCallback(): void {
    this.mediaQueryDesktopView.removeEventListener('change', this.handleMediaQuery);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.theme,
      this.sidebarStartOpen,
      this.sidebarStartWidth,
      this.sidebarEndOpen,
      this.sidebarEndWidth
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="canvas">
          {/* "part" is not valid in TS */}
          {/* eslint-disable-next-line */}
          {/* @ts-ignore */}
          <header part="header">
            <slot name="header-start" />
            <PrefixedTagNames.pCrest class="crest" />
            <PrefixedTagNames.pWordmark class="wordmark" theme={this.theme} />
            <slot name="header-end" />
          </header>
          {/* "part" is not valid in TS */}
          {/* eslint-disable-next-line */}
          {/* @ts-ignore */}
          <main part="main">
            <slot />
          </main>
          {/* "part" is not valid in TS */}
          {/* eslint-disable-next-line */}
          {/* @ts-ignore */}
          <footer part="footer">
            <slot name="footer" />
          </footer>
          {this.isDesktopView && (
            <Fragment>
              <aside
                // "part" is not valid in TS
                // eslint-disable-next-line
                /* @ts-ignore */
                part="sidebar-start"
                // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
                // eslint-disable-next-line
                /* @ts-ignore */
                inert={this.sidebarStartOpen ? null : true}
              >
                <slot name="sidebar-start" />
              </aside>
              <aside
                // "part" is not valid in TS
                // eslint-disable-next-line
                /* @ts-ignore */
                part="sidebar-end"
                // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
                // eslint-disable-next-line
                /* @ts-ignore */
                inert={this.sidebarEndOpen ? null : true}
              >
                <slot name="sidebar-end" />
              </aside>
            </Fragment>
          )}
        </div>
        {!this.isDesktopView && (
          <Fragment>
            <PrefixedTagNames.pFlyout
              theme={this.theme}
              open={this.sidebarStartOpen}
              position="start"
              onDismiss={this.onDismissSidebarStart}
            >
              <slot name="sidebar-start" />
            </PrefixedTagNames.pFlyout>
            <PrefixedTagNames.pFlyout
              theme={this.theme}
              open={this.sidebarEndOpen}
              position="end"
              onDismiss={this.onDismissSidebarEnd}
            >
              <slot name="sidebar-end" />
            </PrefixedTagNames.pFlyout>
          </Fragment>
        )}
      </Host>
    );
  }

  private handleMediaQuery = (e: MediaQueryList | MediaQueryListEvent): void => {
    this.isDesktopView = !!e.matches;
  };

  private onDismissSidebarStart = (): void => {
    this.dismissSidebarStart.emit();
  };

  private onDismissSidebarEnd = (): void => {
    this.dismissSidebarEnd.emit();
  };
}
