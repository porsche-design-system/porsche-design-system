import { arrow, autoUpdate, computePosition, flip } from '@floating-ui/dom';
import { Component, Element, Host, type JSX, Prop, State, h } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../styles';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getHasNativePopoverSupport,
  getPrefixedTagNames,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './popover-styles';
import {
  POPOVER_ARIA_ATTRIBUTES,
  POPOVER_DIRECTIONS,
  type PopoverAriaAttribute,
  type PopoverDirection,
} from './popover-utils';

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

  private popover: HTMLDivElement;
  private button: HTMLButtonElement;
  private arrow: HTMLDivElement;

  private autoUpdatePopoverPosition: () => void;

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={this.onKeydown}>
        <button
          type="button"
          popoverTarget="popover"
          onClick={() => {
            this.open = !this.open;
            getHasNativePopoverSupport && this.fallbackToggle(this.open);
          }}
          {...parseAndGetAriaAttributes({
            ...parseAndGetAriaAttributes(this.aria),
            ...{ 'aria-expanded': this.open },
          })}
          ref={(el) => (this.button = el)}
        >
          <PrefixedTagNames.pIcon class="icon" name="information" theme={this.theme} />
          <span class="label">More information</span>
        </button>
        <div class="popover" ref={(el) => (this.popover = el)} popover="auto" id="popover" onToggle={this.onToggle}>
          <div class="arrow" ref={(el) => (this.arrow = el)} />
          <div class="content">{this.description ? <p>{this.description}</p> : <slot />}</div>
        </div>
      </Host>
    );
  }

  private onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.button.focus();
    }
  };

  private onToggle = (e: ToggleEvent): void => {
    if (e.newState === 'open') {
      this.autoUpdate(false);
    } else {
      this.autoUpdate(true);
    }
  };

  private fallbackToggle = (open: boolean): void => {
    if (open) {
      this.updatePopoverPosition();
    }
  };

  private updatePopoverPosition = (): void => {
    computePosition(this.button, this.popover, {
      placement: this.direction,
      middleware: [
        flip({
          fallbackAxisSideDirection: 'end',
        }),
        arrow({ element: this.arrow }),
      ],
    }).then(({ x, y, placement }) => {
      const placementVertical = placement === 'top' || placement === 'bottom';
      const placementTopLeft = placement === 'top' || placement === 'left';
      Object.assign(this.popover.style, {
        left: `${x}px`,
        top: `${y}px`,
        flexDirection: placementVertical ? 'column' : 'row',
      });
      Object.assign(this.arrow.style, {
        clipPath: placementVertical ? 'polygon(50% 0, 100% 110%, 0 110%)' : 'polygon(0 50%, 110% 0, 110% 100%)',
        order: placementTopLeft ? '1' : '0',
        width: placementVertical ? '24px' : '12px',
        height: placementVertical ? '12px' : '24px',
        transform: `rotate(${placementTopLeft ? '180deg' : '0'}`,
      });
    });
  };

  private autoUpdate = (cleanUp: boolean) => {
    if (cleanUp) {
      this.autoUpdatePopoverPosition();
    } else {
      this.autoUpdatePopoverPosition = autoUpdate(this.button, this.popover, this.updatePopoverPosition);
    }
  };
}
