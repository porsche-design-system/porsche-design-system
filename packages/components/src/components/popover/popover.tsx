import { Component, Element, forceUpdate, h, Host, type JSX, Prop, State } from '@stencil/core';
import type { PopoverAriaAttribute, PopoverDirection } from './popover-utils';
import {
  addDocumentEventListener,
  addNativeScrollListeners,
  POPOVER_ARIA_ATTRIBUTES,
  POPOVER_DIRECTIONS,
  removeDocumentEventListener,
  updateNativePopoverStyles,
  updatePopoverStyles,
} from './popover-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  isWithinComponent,
  parseAndGetAriaAttributes,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './popover-styles';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';

const propTypes: PropTypes<typeof Popover> = {
  direction: AllowedTypes.oneOf<PopoverDirection>(POPOVER_DIRECTIONS),
  description: AllowedTypes.string,
  aria: AllowedTypes.aria<PopoverAriaAttribute>(POPOVER_ARIA_ATTRIBUTES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

@Component({
  tag: 'p-popover',
  shadow: true, // delegatesFocus: true prevents text selection inside
})
export class Popover {
  @Element() public host!: HTMLElement;

  /** Preferred direction in which popover should open, given there is enough space in viewport.
   * Otherwise, it will be opened in the direction with most available space. */
  @Prop() public direction?: PopoverDirection = 'bottom';

  /** Descriptive text to show additional information when popover is open  */
  @Prop() public description?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<PopoverAriaAttribute>;

  /** Adapts the popover color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @State() private open = false;

  private spacer: HTMLDivElement;
  private popover: HTMLDivElement;
  private button: HTMLButtonElement;

  private isNative: boolean = false;
  private table: HTMLElement;

  public connectedCallback(): void {
    addDocumentEventListener(this);
    this.detectNativeCase();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    if (this.isNative && this.spacer?.matches(':popover-open')) {
      addNativeScrollListeners(this.host, this.table, this.spacer);
      // Set new popover position depending on button position
      updateNativePopoverStyles(this.spacer, this.button);
      // Update popover styles with new position
      updatePopoverStyles(this.host, this.spacer, this.popover, this.direction, this.theme, this.isNative);
    } else {
      if (this.open) {
        // calculate / update position only possible after render
        updatePopoverStyles(this.host, this.spacer, this.popover, this.direction, this.theme);
      }
    }
  }

  public disconnectedCallback(): void {
    if (!this.isNative) {
      removeDocumentEventListener(this);
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.direction, this.isNative, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.onKeydown}>
        <button
          type="button"
          {...(this.isNative ? { popoverTarget: 'spacer' } : { onClick: () => (this.open = !this.open) })}
          {...parseAndGetAriaAttributes({
            ...parseAndGetAriaAttributes(this.aria),
            'aria-expanded': this.isNative ? this.spacer?.matches(':popover-open') : this.open,
          })}
          ref={(el) => (this.button = el)}
        >
          <PrefixedTagNames.pIcon class="icon" name="information" theme={this.theme} />
          <span class="label">More information</span>
        </button>
        {(this.open || this.isNative) && (
          <div
            class="spacer"
            ref={(el) => (this.spacer = el)}
            {...(this.isNative && { popover: 'auto', id: 'spacer', onToggle: this.onToggle })}
          >
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

  private detectNativeCase = (): void => {
    const supportsNativePopover = HTMLElement.prototype.hasOwnProperty('popover');
    if (supportsNativePopover) {
      this.table = isWithinComponent(this.host, 'pTable');
      if (!!this.table) {
        this.isNative = true;
      }
    }
  };

  private onToggle = (e): void => {
    if (e.newState === 'open') {
      forceUpdate(this.host); // Necessary to update popover styles since opening of native popover doesn't trigger rerender
    }
  };
}
