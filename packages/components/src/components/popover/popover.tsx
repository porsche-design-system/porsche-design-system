import { Component, Element, h, Host, type JSX, Prop, State } from '@stencil/core';
import type { PopoverAriaAttribute, PopoverDirection } from './popover-utils';
import {
  addDocumentEventListener,
  addScrollAndResizeListener,
  addTableScrollListener,
  POPOVER_ARIA_ATTRIBUTES,
  POPOVER_DIRECTIONS,
  removeDocumentEventListener,
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
  private isWithinScrollContainer: boolean;

  public connectedCallback(): void {
    addDocumentEventListener(this);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    const table = isWithinComponent(this.host, 'pTable');
    const accordion = isWithinComponent(this.host, 'pAccordion');
    this.isWithinScrollContainer = !!table || !!accordion;
    if (this.isWithinScrollContainer) {
      addScrollAndResizeListener();
      if (table) {
        addTableScrollListener(this.host, table);
      }
    }
    if (this.open) {
      // calculate / update position only possible after render
      updatePopoverStyles(
        this.host,
        this.spacer,
        this.popover,
        this.direction,
        this.theme,
        this.isWithinScrollContainer
      );
    }
  }

  public disconnectedCallback(): void {
    removeDocumentEventListener(this);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.direction,
      this.theme,
      this.isWithinScrollContainer ? this.host.getBoundingClientRect() : undefined
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.onKeydown}>
        <button
          type="button"
          onClick={() => (this.open = !this.open)}
          {...parseAndGetAriaAttributes({
            ...parseAndGetAriaAttributes(this.aria),
            'aria-expanded': this.open,
          })}
          ref={(el) => (this.button = el)}
        >
          <PrefixedTagNames.pIcon class="icon" name="information" theme={this.theme} />
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
