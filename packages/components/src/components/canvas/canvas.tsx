import { Component, Element, Event, type EventEmitter, h, type JSX, Prop } from '@stencil/core';
import type { PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, getPrefixedTagNames, hasNamedSlot, validateProps } from '../../utils';
import { getComponentCss } from './canvas-styles';
import { CANVAS_BACKGROUNDS, type CanvasBackground, type CanvasSidebarStartUpdateEventDetail } from './canvas-utils';

const propTypes: PropTypes<typeof Canvas> = {
  sidebarStartOpen: AllowedTypes.boolean,
  sidebarEndOpen: AllowedTypes.boolean,
  background: AllowedTypes.oneOf<CanvasBackground>(CANVAS_BACKGROUNDS),
};

/**
 * @slot {"name": "title", "description": "Renders the application name in the header section of the sidebar start area." }
 * @slot {"name": "header-start", "description": "Renders a **sticky** header section above the content area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode)." }
 * @slot {"name": "header-end", "description": "Renders a **sticky** header section above the content area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode)." }
 * @slot {"name": "", "description": "Default slot for the main content." }
 * @slot {"name": "footer", "description": "Renders a **sticky** footer section underneath the main content." }
 * @slot {"name": "sidebar-start", "description": "Renders a sidebar area on the **start** side (**left** in **LTR** mode / **right** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end", "description": "Renders a sidebar area on the **end** side (**right** in **LTR** mode / **left** in **RTL** mode). On mobile view it transforms into a flyout." }
 * @slot {"name": "sidebar-end-header", "description": "Renders in the header section of the sidebar end area." }
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

  /** Defines the background color of the main section and auto adjust it for the sidebar */
  @Prop() public background?: CanvasBackground = 'canvas';

  /** Emitted when the sidebar start requests to be opened or dismissed. */
  @Event({ bubbles: false }) public sidebarStartUpdate?: EventEmitter<CanvasSidebarStartUpdateEventDetail>;

  /** Emitted when the sidebar end requests to be dismissed. */
  @Event({ bubbles: false }) public sidebarEndDismiss?: EventEmitter<void>;

  private hasTitle: boolean;
  private hasSidebarEnd: boolean;
  private hasFooter: boolean;
  private hasBackground: boolean;

  public render(): JSX.Element {
    validateProps(this, propTypes);

    this.hasTitle = hasNamedSlot(this.host, 'title');
    this.hasSidebarEnd = hasNamedSlot(this.host, 'sidebar-end');
    this.hasFooter = hasNamedSlot(this.host, 'footer');
    this.hasBackground = hasNamedSlot(this.host, 'background');

    attachComponentCss(this.host, getComponentCss, this.sidebarStartOpen, this.sidebarEndOpen, this.background);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <div class="root">
        <header class="header" tabIndex={-1}>
          <div class="blur">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div class="header__area header__area--start">
            {!this.sidebarStartOpen && (
              <PrefixedTagNames.pButton
                icon="sidebar"
                variant="secondary"
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
          <PrefixedTagNames.pWordmark class="header__wordmark" size="inherit" />
          <div class="header__area header__area--end">
            <slot name="header-end" />
          </div>
        </header>
        <aside
          class="sidebar sidebar--start"
          inert={!this.sidebarStartOpen}
          aria-label={`Navigation sidebar ${this.sidebarStartOpen ? 'open' : 'closed'}`}
          tabIndex={-1}
        >
          <div class="sidebar__header sidebar__header--start">
            <PrefixedTagNames.pButton
              icon="sidebar"
              variant="secondary"
              compact={true}
              hide-label="true"
              aria={{ 'aria-expanded': this.sidebarStartOpen }}
              onClick={this.toggleSidebarStart}
            >
              {this.sidebarStartOpen ? 'Close' : 'Open'} navigation sidebar
            </PrefixedTagNames.pButton>
            {this.hasTitle && (
              <h2>
                <slot name="title" />
              </h2>
            )}
          </div>
          <slot name="sidebar-start" />
        </aside>
        <main class="main">
          <slot />
        </main>
        {this.hasSidebarEnd && (
          <aside
            class="sidebar sidebar--end"
            inert={!this.sidebarEndOpen}
            aria-label={`Settings sidebar ${this.sidebarEndOpen ? 'open' : 'closed'}`}
            tabIndex={-1}
          >
            <div class="sidebar__header sidebar__header--end">
              <slot name="sidebar-end-header" />
              <PrefixedTagNames.pButton
                icon="close"
                variant="secondary"
                compact={true}
                hide-label="true"
                aria={{ 'aria-expanded': this.sidebarEndOpen }}
                onClick={this.onDismissSidebarEnd}
              >
                {this.sidebarEndOpen ? 'Close' : 'Open'} settings sidebar
              </PrefixedTagNames.pButton>
            </div>
            <slot name="sidebar-end" />
          </aside>
        )}
        {this.hasFooter && (
          <footer class="footer">
            <slot name="footer" />
          </footer>
        )}
        {this.hasBackground && <slot name="background" />}
      </div>
    );
  }

  private toggleSidebarStart = (): void => {
    this.sidebarStartUpdate.emit({
      open: !this.sidebarStartOpen,
    });
  };

  private onDismissSidebarEnd = (): void => {
    this.sidebarEndDismiss.emit();
  };
}
