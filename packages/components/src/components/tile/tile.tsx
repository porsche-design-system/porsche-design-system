import { Component, Element, h, type JSX, Prop, State } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  hasNamedSlot,
  hasPropValueChanged,
  preventAutoPlayOfSlottedVideoOnPrefersReducedMotion,
  TILE_ASPECT_RATIOS,
  type TileAspectRatio,
  validateProps,
} from '../../utils';
import { getComponentCss, getSlottedBackgroundPictureStyles } from './tile-styles';
import {
  anchorSlot,
  backgroundSlot,
  TILE_BACKGROUNDS,
  TILE_EDGES,
  TILE_GRADIENTS,
  type TileBackground,
  type TileGradient,
  type TileSlotState,
} from './tile-utils';

const propTypes: PropTypes<typeof Tile> = {
  background: AllowedTypes.oneOf<TileBackground>(TILE_BACKGROUNDS),
  gradient: AllowedTypes.breakpoint<TileGradient>(TILE_GRADIENTS),
  aspectRatio: AllowedTypes.breakpoint<TileAspectRatio>(TILE_ASPECT_RATIOS),
  compact: AllowedTypes.breakpoint('boolean'),
};

/**
 * @slot {"name": "", "description": "Main content area, centered by default. When no other layout slot is used, it covers the whole tile and can be used for a fully custom layout." }
 * @slot {"name": "top", "description": "Content aligned to the top of the tile, laid out as a row." }
 * @slot {"name": "bottom", "description": "Content aligned to the bottom of the tile, laid out as a row." }
 * @slot {"name": "start", "description": "Content aligned to the inline start of the tile, laid out as a column." }
 * @slot {"name": "end", "description": "Content aligned to the inline end of the tile, laid out as a column." }
 * @slot {"name": "background", "description": "Media (e.g. img, picture, video) or custom content rendered cover-fit above the background color." }
 * @slot {"name": "anchor", "description": "Anchor stretched over the whole tile to make it clickable. Its label is visually hidden but accessible. While slotted, all other content is click-through, interactive elements have to opt in via `pointer-events: auto`." }
 *
 * @experimental
 */
@Component({
  tag: 'p-tile',
  shadow: true,
})
export class Tile {
  @Element() public host!: HTMLElement;

  /** Sets the background color of the tile. Slotted background content is rendered above it. */
  @Prop() public background?: TileBackground = 'surface';

  /** Shows a gradient behind the given layout slots to improve legibility on media. It grows and shrinks with the size of the slot. */
  @Prop() public gradient?: BreakpointCustomizable<TileGradient> = 'none';

  /** Sets the preferred width-to-height ratio of the tile. The tile grows beyond it when required by its content. */
  @Prop() public aspectRatio?: BreakpointCustomizable<TileAspectRatio> = '4/3';

  /** Reduces padding and gap of the tile. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  @State() private slotState: TileSlotState = {
    top: false,
    bottom: false,
    start: false,
    end: false,
    anchor: false,
    background: false,
  };

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedBackgroundPictureStyles);
  }

  public componentWillLoad(): void {
    this.updateSlotState();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.background,
      this.gradient,
      this.aspectRatio,
      this.compact,
      this.slotState
    );

    return (
      <div class="root">
        {/* has to precede the background to scale it on hover via sibling selector */}
        <slot name={anchorSlot} onSlotchange={this.updateSlotState} />
        <div class="background">
          <slot name={backgroundSlot} onSlotchange={this.onBackgroundSlotChange} />
        </div>
        {TILE_EDGES.filter((edge) => this.slotState[edge]).map((edge) => (
          <span key={edge} class={`gradient gradient-${edge}`} />
        ))}
        <slot name="top" onSlotchange={this.updateSlotState} />
        <slot name="start" onSlotchange={this.updateSlotState} />
        <slot />
        <slot name="end" onSlotchange={this.updateSlotState} />
        <slot name="bottom" onSlotchange={this.updateSlotState} />
      </div>
    );
  }

  private updateSlotState = (): void => {
    const names = Object.keys(this.slotState) as (keyof TileSlotState)[];
    const slotState = Object.fromEntries(names.map((name) => [name, hasNamedSlot(this.host, name)])) as TileSlotState;

    if (names.some((name) => slotState[name] !== this.slotState[name])) {
      this.slotState = slotState;
    }
  };

  private onBackgroundSlotChange = (): void => {
    preventAutoPlayOfSlottedVideoOnPrefersReducedMotion(this.host);
    this.updateSlotState();
  };
}
