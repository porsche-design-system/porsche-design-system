import { Component, Element, h, type JSX, Listen, Prop, State } from '@stencil/core';
import { getSlottedPictureImageStyles } from '../../styles';
import type {
  BreakpointCustomizable,
  ButtonAriaAttribute,
  ButtonType,
  PropTypes,
  SelectedAriaAttributes,
} from '../../types';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  BUTTON_ARIA_ATTRIBUTES,
  BUTTON_TYPES,
  getPrefixedTagNames,
  hasNamedSlot,
  hasPropValueChanged,
  type ITileProps,
  isDisabledOrLoading,
  preventAutoPlayOfSlottedVideoOnPrefersReducedMotion,
  TILE_WEIGHTS,
  validateProps,
} from '../../utils';
import { getParsedTileCompact, sharedTilePropTypes } from '../link-tile/link-tile-utils';
import { getComponentCss } from './button-tile-styles';
import type {
  ButtonTileAlign,
  ButtonTileAriaAttribute,
  ButtonTileAspectRatio,
  ButtonTileIcon,
  ButtonTileSize,
  ButtonTileType,
  ButtonTileWeight,
} from './button-tile-utils';

const propTypes: PropTypes<typeof ButtonTile> = {
  ...sharedTilePropTypes,
  weight: AllowedTypes.breakpoint<ButtonTileWeight>(TILE_WEIGHTS),
  type: AllowedTypes.oneOf<ButtonType>(BUTTON_TYPES),
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  aria: AllowedTypes.aria<ButtonAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "header", "description": "Renders a header section above the content area." }
 * @slot {"name": "", "description": "Default slot for the img or picture tag." }
 * @slot {"name": "footer", "description": "Renders a footer section below the description." }
 */
@Component({
  tag: 'p-button-tile',
  shadow: { delegatesFocus: true },
})
export class ButtonTile implements ITileProps {
  @Element() public host!: HTMLElement;

  /** Sets the font size of the description text in the tile content area. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<ButtonTileSize> = 'medium';

  /** Sets the font weight of the description text in the tile content area. Supports responsive breakpoint values. */
  @Prop() public weight?: BreakpointCustomizable<ButtonTileWeight> = 'semi-bold';

  /** Sets the width-to-height ratio of the tile media area. Supports responsive breakpoint values. */
  @Prop() public aspectRatio?: BreakpointCustomizable<ButtonTileAspectRatio> = '4/3';

  /** Sets the accessible label text of the action button rendered inside the tile. */
  @Prop() public label: string;

  /** Sets the description text displayed in the tile's content area. */
  @Prop() public description: string;

  /** Controls the vertical placement of the description and button — `top` or `bottom`. */
  @Prop() public align?: ButtonTileAlign = 'bottom';

  /** Shows a gradient overlay over the media slot to improve text legibility on bright images or videos. */
  @Prop() public gradient?: boolean = false;

  /** Renders only the icon button without the full label. Supports responsive breakpoint values. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  /** Sets the button's HTML type — `submit` sends the form, `reset` clears it, `button` performs no default action. */
  @Prop() public type?: ButtonTileType = 'submit';

  /** Disables the tile, preventing button interaction. */
  @Prop() public disabled?: boolean = false;

  /** Disables the tile and shows a loading spinner to indicate an ongoing operation. */
  @Prop() public loading?: boolean = false;

  /** Sets the icon displayed in the tile's action button. Use `none` to show no icon. */
  @Prop() public icon?: ButtonTileIcon = 'none';

  /** Sets a path to a custom SVG icon for the action button, used instead of the built-in icon set. */
  @Prop() public iconSource?: string;

  /** Sets ARIA attributes on the tile's action button to improve accessibility for screen readers. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonTileAriaAttribute>;

  @State() private hasFooterSlot: boolean = false;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedPictureImageStyles);
  }

  public componentWillLoad(): void {
    preventAutoPlayOfSlottedVideoOnPrefersReducedMotion(this.host);
    this.updateSlotObserver();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    const parsedCompact = getParsedTileCompact(this.compact);

    attachComponentCss(
      this.host,
      getComponentCss,
      isDisabledOrLoading(this.disabled, this.loading),
      this.aspectRatio,
      this.size,
      this.weight,
      this.align,
      parsedCompact,
      this.gradient,
      this.hasFooterSlot,
      this.disabled
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const buttonProps = {
      variant: 'secondary',
      iconSource: this.iconSource,
      type: this.type,
      disabled: this.disabled,
      loading: this.loading,
      aria: this.aria,
    };

    const button: JSX.Element = (
      <PrefixedTagNames.pButton {...buttonProps} icon={this.icon} key="link-or-button" class="link-or-button">
        {this.label}
      </PrefixedTagNames.pButton>
    );

    const buttonCompact: JSX.Element = (
      <PrefixedTagNames.pButton
        {...buttonProps}
        key="link-or-button-pure"
        class="link-or-button-pure"
        hideLabel={true}
        compact={true}
        icon={this.icon === 'none' ? 'arrow-right' : this.icon}
      >
        {this.label}
      </PrefixedTagNames.pButton>
    );

    return (
      <div class="root">
        <slot name="header" />
        <div class="media">
          <slot onSlotchange={() => preventAutoPlayOfSlottedVideoOnPrefersReducedMotion(this.host)} />
        </div>
        <div class="footer">
          <p>{this.description}</p>
          <slot name="footer" onSlotchange={this.updateSlotObserver} />
          {typeof parsedCompact === 'boolean' ? (parsedCompact ? buttonCompact : button) : [buttonCompact, button]}
        </div>
      </div>
    );
  }

  private updateSlotObserver = (): void => {
    this.hasFooterSlot = hasNamedSlot(this.host, 'footer');
  };
}
