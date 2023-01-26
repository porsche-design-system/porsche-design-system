import { JSX, Component, Prop, h, Element, Host, State } from '@stencil/core';
import {
  addDocumentEventListener,
  POPOVER_DIRECTIONS,
  removeDocumentEventListener,
  updatePopoverStyles,
} from './popover-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  parseAndGetAriaAttributes,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './popover-styles';
import type { PopoverDirection } from './popover-utils';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';

const propTypes: PropTypes<typeof Popover> = {
  direction: AllowedTypes.oneOf<PopoverDirection>(POPOVER_DIRECTIONS),
  description: AllowedTypes.string,
  aria: AllowedTypes.aria<'aria-label'>(['aria-label']),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-popover',
  shadow: { delegatesFocus: true },
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Preferred direction in which popover should open, given there is enough space in viewport.
   * Otherwise, it will be opened in the direction with most available space. */
  @Prop() public direction?: PopoverDirection = 'bottom';

  /** Descriptive text to show additional information when popover is open  */
  @Prop() public description?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<'aria-label'>;

  /** Adapts the popover color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @State() private open = false;

  private spacer: HTMLDivElement;
  private popover: HTMLDivElement;
  private button: HTMLButtonElement;

  public connectedCallback(): void {
    addDocumentEventListener(this);
  }

  public componentDidRender(): void {
    if (this.open) {
      // calculate / update position only possible after render
      updatePopoverStyles(this.host, this.spacer, this.popover, this.direction, this.theme);
    }
  }

  public disconnectedCallback(): void {
    removeDocumentEventListener(this);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.direction, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.onKeydown}>
        <button
          type="button"
          onClick={() => (this.open = !this.open)}
          aria-expanded={this.open ? 'true' : 'false'}
          {...parseAndGetAriaAttributes(this.aria)}
          ref={(el) => (this.button = el)}
        >
          <PrefixedTagNames.pIcon name="information" theme={this.theme}></PrefixedTagNames.pIcon>
          <span class="label">More information</span>
        </button>
        {this.open && (
          <div class="spacer" ref={(el) => (this.spacer = el)}>
            <div class="popover" ref={(el) => (this.popover = el)}>
              {this.description ? <p>{this.description}</p> : <slot />}
            </div>
          </div>
        )}
      </Host>
    );
  }

  private onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.button.focus();
    }
  };
}
