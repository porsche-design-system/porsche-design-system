import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { Component, Element, Host, type JSX, Prop, State, h } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import {
  AllowedTypes,
  THEMES,
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
  shadow: true,
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
  private cleanUp: () => void;
  private hasNativePopoverSupport = getHasNativePopoverSupport();

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public disconnectedCallback(): void {
    if (typeof this.cleanUp === 'function') {
      this.cleanUp(); // cleanup function to stop the auto updates, https://floating-ui.com/docs/autoupdate
    }
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onKeydown={(e: KeyboardEvent) => e.key === 'Escape' && this.button.focus()}>
        <button
          type="button"
          onClick={() => (this.open = !this.open)}
          {...parseAndGetAriaAttributes({
            ...parseAndGetAriaAttributes(this.aria),
            ...{ 'aria-expanded': this.open },
          })}
          ref={(el) => (this.button = el)}
        >
          <PrefixedTagNames.pIcon class="icon" name="information" theme={this.theme} />
          <span class="label">More information</span>
        </button>
        {this.open && (
          <div
            class="popover"
            popover="auto"
            onToggle={(e: ToggleEvent) => (this.open = e.newState === 'open')}
            ref={(el) => (this.popover = el)}
          >
            <div class="arrow" ref={(el) => (this.arrow = el)} />
            <div class="content">{this.description ? <p>{this.description}</p> : <slot />}</div>
          </div>
        )}
      </Host>
    );
  }

  public componentDidRender(): void {
    if (this.open) {
      if (this.hasNativePopoverSupport) {
        this.popover.showPopover(); // needs to be called after render cycle to be able to render the popover conditionally
      }
      this.cleanUp = autoUpdate(this.button, this.popover, this.updatePosition);
    } else if (typeof this.cleanUp === 'function') {
      this.cleanUp(); // cleanup function to stop the auto updates, https://floating-ui.com/docs/autoupdate
    }
  }

  private updatePosition = async (): Promise<void> => {
    const { x, y, placement } = await computePosition(this.button, this.popover, {
      placement: this.direction,
      middleware: [
        flip({
          fallbackAxisSideDirection: 'end',
        }),
        offset(4),
      ],
    });

    const placementVertical = placement === 'top' || placement === 'bottom';
    const placementTopLeft = placement === 'top' || placement === 'left';

    Object.assign(this.popover.style, {
      insetInlineStart: `${x}px`,
      insetBlockStart: `${y}px`,
      flexDirection: placementVertical ? 'column' : 'row',
    });

    Object.assign(this.arrow.style, {
      clipPath: placementVertical ? 'polygon(50% 0, 100% 110%, 0 110%)' : 'polygon(0 50%, 110% 0, 110% 100%)',
      order: placementTopLeft ? '1' : '0',
      width: placementVertical ? '24px' : '12px',
      height: placementVertical ? '12px' : '24px',
      transform: `rotate(${placementTopLeft ? '180deg' : '0'}`,
    });
  };
}
