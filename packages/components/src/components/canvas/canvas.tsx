import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, validateProps } from '../../utils';
import { Component, Element, EventEmitter, h, type JSX, Prop, Event, State } from '@stencil/core';
import { getComponentCss } from './canvas-styles';
import { CANVAS_SIDEBAR_WIDTHS, type CanvasSidebarWidth } from './canvas-utils';
import { breakpointM } from '@porsche-design-system/utilities-v2';

const propTypes: PropTypes<typeof Canvas> = {
  sidebarStartOpen: AllowedTypes.boolean,
  sidebarStartWidth: AllowedTypes.oneOf<CanvasSidebarWidth>(CANVAS_SIDEBAR_WIDTHS),
  sidebarEndOpen: AllowedTypes.boolean,
  sidebarEndWidth: AllowedTypes.oneOf<CanvasSidebarWidth>(CANVAS_SIDEBAR_WIDTHS),
};

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
  @Event({ bubbles: false }) public closeSidebarStart?: EventEmitter<void>;

  /** Emitted when the component requests to close the sidebar on the end side. */
  @Event({ bubbles: false }) public closeSidebarEnd?: EventEmitter<void>;

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
        {this.isDesktopView ? (
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
              onClick={this.onCloseSidebarStart}
            >
              Close Sidebar
            </PrefixedTagNames.pButtonPure>
            <slot name="sidebar-start" />
          </aside>
        ) : (
          <PrefixedTagNames.pFlyout
            class="flyout"
            open={this.sidebarStartOpen}
            position="start"
            onDismiss={this.onCloseSidebarStart}
          >
            <slot name="sidebar-start" />
          </PrefixedTagNames.pFlyout>
        )}
        {this.isDesktopView ? (
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
              onClick={this.onCloseSidebarEnd}
            >
              Close Sidebar
            </PrefixedTagNames.pButtonPure>
            <slot name="sidebar-end" />
          </aside>
        ) : (
          <PrefixedTagNames.pFlyout
            class="flyout"
            open={this.sidebarEndOpen}
            position="end"
            onDismiss={this.onCloseSidebarEnd}
          >
            <slot name="sidebar-end" />
          </PrefixedTagNames.pFlyout>
        )}
      </div>
    );
  }

  private handleMediaQuery = (e: MediaQueryList | MediaQueryListEvent): void => {
    this.isDesktopView = !!e.matches;
  };

  private onCloseSidebarStart = (): void => {
    this.closeSidebarStart.emit();
  };

  private onCloseSidebarEnd = (): void => {
    this.closeSidebarEnd.emit();
  };
}
