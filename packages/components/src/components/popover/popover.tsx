import { Component, Element, forceUpdate, h, Host, type JSX, Prop, State } from '@stencil/core';
import {
  type PopoverAriaAttribute,
  type PopoverDirection,
  addDocumentEventListener,
  POPOVER_ARIA_ATTRIBUTES,
  POPOVER_DIRECTIONS,
  removeDocumentEventListener,
  updateNativePopoverStyles,
  updatePopoverStyles,
} from './popover-utils';
import {
  addNativePopoverScrollAndResizeListeners,
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  detectNativePopoverCase,
  findClosestComponent,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  THEMES,
  validateProps,
} from '../../utils';
import { getComponentCss } from './popover-styles';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import { getSlottedAnchorStyles } from '../../styles';

const propTypes: PropTypes<typeof Popover> = {
  direction: AllowedTypes.oneOf<PopoverDirection>(POPOVER_DIRECTIONS),
  description: AllowedTypes.string,
  aria: AllowedTypes.aria<PopoverAriaAttribute>(POPOVER_ARIA_ATTRIBUTES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "", "description": "Default slot for the popover content." }
 */
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

  private isNativePopoverCase: boolean = false;
  private parentTableElement: HTMLElement;

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
    addDocumentEventListener(this);
    this.isNativePopoverCase = detectNativePopoverCase(this.host, false);
    if (this.isNativePopoverCase) {
      this.parentTableElement = findClosestComponent(this.host, 'pTable');
    }
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    if (this.isNativePopoverCase && this.spacer?.matches(':popover-open')) {
      addNativePopoverScrollAndResizeListeners(this.host, this.parentTableElement, this.spacer);
      // Set new popover position depending on button position
      updateNativePopoverStyles(this.spacer, this.button);
      // Update popover styles with new position
      updatePopoverStyles(this.host, this.spacer, this.popover, this.direction, this.isNativePopoverCase, this.theme);
    } else {
      if (this.open) {
        // calculate / update position only possible after render
        updatePopoverStyles(this.host, this.spacer, this.popover, this.direction, false, this.theme);
      }
    }
  }

  public disconnectedCallback(): void {
    removeDocumentEventListener(this);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.direction, this.isNativePopoverCase, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.onKeydown}>
        <button
          type="button"
          {...(this.isNativePopoverCase ? { popoverTarget: 'spacer' } : { onClick: () => (this.open = !this.open) })}
          {...parseAndGetAriaAttributes({
            ...parseAndGetAriaAttributes(this.aria),
            ...(!this.isNativePopoverCase && { 'aria-expanded': this.open }),
          })}
          ref={(el) => (this.button = el)}
        >
          <PrefixedTagNames.pIcon class="icon" name="information" theme={this.theme} />
          <span class="label">More information</span>
        </button>
        {(this.open || this.isNativePopoverCase) && (
          <div
            class="spacer"
            ref={(el) => (this.spacer = el)}
            {...(this.isNativePopoverCase && { popover: 'auto', id: 'spacer', onToggle: this.onToggle })}
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

  private onToggle = (e: Event & { newState: string }): void => {
    if (e.newState === 'open') {
      forceUpdate(this.host); // Necessary to update popover styles since opening of native popover doesn't trigger rerender
    }
  };
}
