import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, validateProps } from '../../utils';
import { Component, Element, EventEmitter, h, type JSX, Prop, Event, State, Host, Fragment } from '@stencil/core';
import { getComponentCss } from './canvas-styles';
import { CANVAS_SIDEBAR_WIDTHS, type CanvasSidebarWidth } from './canvas-utils';
import { breakpointM } from '@porsche-design-system/utilities-v2';

const propTypes: PropTypes<typeof Canvas> = {
  sidebarStartOpen: AllowedTypes.boolean,
  sidebarStartWidth: AllowedTypes.oneOf<CanvasSidebarWidth>(CANVAS_SIDEBAR_WIDTHS),
  sidebarEndOpen: AllowedTypes.boolean,
  sidebarEndWidth: AllowedTypes.oneOf<CanvasSidebarWidth>(CANVAS_SIDEBAR_WIDTHS),
};

/** @experimental */
@Component({
  tag: 'p-canvas',
  shadow: true,
})
export class Canvas {
  @Element() public host!: HTMLElement;

  /** Open Sidebar on the start side */
  @Prop() public sidebarStartOpen?: boolean = false;

  /** Defines the width of the sidebar on the start side */
  @Prop() public sidebarStartWidth?: CanvasSidebarWidth = 'medium';

  /** Open Sidebar on the end side */
  @Prop() public sidebarEndOpen?: boolean = false;

  /** Defines the width of the sidebar on the end side */
  @Prop() public sidebarEndWidth?: CanvasSidebarWidth = 'medium';

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
      this.sidebarStartOpen,
      this.sidebarStartWidth,
      this.sidebarEndOpen,
      this.sidebarEndWidth
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div class="canvas">
          <header part="header">
            <slot name="header" />
          </header>
          <main part="main">
            <slot />
          </main>
          <footer part="footer">
            <slot name="footer" />
          </footer>
          {this.isDesktopView && (
            <Fragment>
              <aside
                part="sidebar-start"
                // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
                // eslint-disable-next-line
                /* @ts-ignore */
                inert={this.sidebarStartOpen ? null : true}
              >
                <PrefixedTagNames.pButtonPure
                  class="close"
                  icon="close"
                  variant="secondary"
                  hideLabel
                  onClick={this.onDismissSidebarStart}
                >
                  Close Sidebar
                </PrefixedTagNames.pButtonPure>
                <slot name="sidebar-start" />
              </aside>
              <aside
                part="sidebar-end"
                // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
                // eslint-disable-next-line
                /* @ts-ignore */
                inert={this.sidebarEndOpen ? null : true}
              >
                <PrefixedTagNames.pButtonPure
                  class="close"
                  icon="close"
                  variant="secondary"
                  hideLabel
                  onClick={this.onDismissSidebarEnd}
                >
                  Close Sidebar
                </PrefixedTagNames.pButtonPure>
                <slot name="sidebar-end" />
              </aside>
            </Fragment>
          )}
        </div>
        {!this.isDesktopView && (
          <Fragment>
            <PrefixedTagNames.pFlyout
              open={this.sidebarStartOpen}
              position="start"
              onDismiss={this.onDismissSidebarStart}
            >
              <slot name="sidebar-start" />
            </PrefixedTagNames.pFlyout>
            <PrefixedTagNames.pFlyout open={this.sidebarEndOpen} position="end" onDismiss={this.onDismissSidebarEnd}>
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
