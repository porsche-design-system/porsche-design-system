import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, validateProps } from '../../utils';
import { Component, Element, EventEmitter, h, type JSX, Prop, Event } from '@stencil/core';
import { getComponentCss } from './canvas-styles';
import { CANVAS_SIDEBAR_WIDTHS, type CanvasSidebarWidth } from './canvas-utils';

const propTypes: PropTypes<typeof Canvas> = {
  sidebarLeftOpen: AllowedTypes.boolean,
  sidebarLeftWidth: AllowedTypes.oneOf<CanvasSidebarWidth>(CANVAS_SIDEBAR_WIDTHS),
  sidebarRightOpen: AllowedTypes.boolean,
  sidebarRightWidth: AllowedTypes.oneOf<CanvasSidebarWidth>(CANVAS_SIDEBAR_WIDTHS),
};

@Component({
  tag: 'p-canvas',
  shadow: true,
})
export class Canvas {
  @Element() public host!: HTMLElement;

  /** Open Sidebar on left side */
  @Prop() public sidebarLeftOpen?: boolean = false;

  /** Defines the width of the sidebar on left side */
  @Prop() public sidebarLeftWidth?: CanvasSidebarWidth = 'medium';

  /** Open Sidebar on right side */
  @Prop() public sidebarRightOpen?: boolean = false;

  /** Defines the width of the sidebar on right side */
  @Prop() public sidebarRightWidth?: CanvasSidebarWidth = 'medium';

  /** Emitted when the component requests to close the sidebar on the left side. */
  @Event({ bubbles: false }) public closeSidebarLeft?: EventEmitter<void>;

  /** Emitted when the component requests to close the sidebar on the right side. */
  @Event({ bubbles: false }) public closeSidebarRight?: EventEmitter<void>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.sidebarLeftOpen,
      this.sidebarLeftWidth,
      this.sidebarRightOpen,
      this.sidebarRightWidth
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
        <aside
          part="sidebar-left"
          // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
          // eslint-disable-next-line
          /* @ts-ignore */
          inert={this.sidebarLeftOpen ? null : true}
        >
          <PrefixedTagNames.pButtonPure
            class="close"
            icon="close"
            variant="secondary"
            hideLabel
            onClick={this.onCloseSidebarLeft}
          >
            Close Sidebar
          </PrefixedTagNames.pButtonPure>
          <slot name="sidebar-left" />
        </aside>
        <aside
          part="sidebar-right"
          // "inert" will be known from React 19 onwards, see https://github.com/facebook/react/pull/24730
          // eslint-disable-next-line
          /* @ts-ignore */
          inert={this.sidebarRightOpen ? null : true}
        >
          <PrefixedTagNames.pButtonPure
            class="close"
            icon="close"
            variant="secondary"
            hideLabel
            onClick={this.onCloseSidebarRight}
          >
            Close Sidebar
          </PrefixedTagNames.pButtonPure>
          <slot name="sidebar-right" />
        </aside>
      </div>
    );
  }

  private onCloseSidebarLeft = (): void => {
    this.closeSidebarLeft.emit();
  };

  private onCloseSidebarRight = (): void => {
    this.closeSidebarRight.emit();
  };
}
