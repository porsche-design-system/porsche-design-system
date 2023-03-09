import type {
  BreakpointCustomizable,
  SelectedAriaAttributes,
  PropTypes,
  ButtonAriaAttribute,
  ButtonType,
  LinkButtonIconName,
} from '../../types';
import type { ButtonTileSize, ButtonTileWeight, ButtonTileAspectRatio, ButtonTileAlign, TileProps } from '../../utils';
import type { ButtonTileProps } from './button-tile-utils';
import { Component, Element, h, Listen, Prop } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  BUTTON_TYPES,
  BUTTON_ARIA_ATTRIBUTES,
  getPrefixedTagNames,
  parseJSON,
  validateProps,
  throwIfAlignTopAndNotCompact,
  isDisabledOrLoading,
  LINK_BUTTON_TILE_SIZES,
  LINK_BUTTON_TILE_WEIGHTS,
  LINK_BUTTON_TILE_ASPECT_RATIOS,
  LINK_BUTTON_TILE_ALIGNS,
} from '../../utils';
import { getComponentCss } from './button-tile-styles';
import { getButtonAriaAttributes } from '../button/button-utils';

const propTypes: PropTypes<typeof ButtonTile> = {
  size: AllowedTypes.breakpoint<ButtonTileSize>(LINK_BUTTON_TILE_SIZES),
  weight: AllowedTypes.breakpoint<ButtonTileWeight>(LINK_BUTTON_TILE_WEIGHTS),
  aspectRatio: AllowedTypes.breakpoint<ButtonTileAspectRatio>(LINK_BUTTON_TILE_ASPECT_RATIOS),
  label: AllowedTypes.string,
  description: AllowedTypes.string,
  align: AllowedTypes.oneOf<ButtonTileAlign>(LINK_BUTTON_TILE_ALIGNS),
  gradient: AllowedTypes.boolean,
  compact: AllowedTypes.breakpoint('boolean'),
  type: AllowedTypes.oneOf<ButtonType>(BUTTON_TYPES),
  disabled: AllowedTypes.boolean,
  loading: AllowedTypes.boolean,
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  aria: AllowedTypes.aria<ButtonAriaAttribute>(BUTTON_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-button-tile',
  shadow: { delegatesFocus: true },
})
export class ButtonTile implements TileProps {
  @Element() public host!: HTMLElement;

  /** Font size of the description. */
  @Prop() public size?: BreakpointCustomizable<ButtonTileSize> = 'default';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<ButtonTileWeight> = 'semibold';

  /** Aspect ratio of the button-tile. */
  @Prop() public aspectRatio?: BreakpointCustomizable<ButtonTileAspectRatio> = '4:3';

  /** Label of the button. */
  @Prop() public label: string;

  /** Description text. */
  @Prop() public description: string;

  /** Alignment of button and description. */
  @Prop() public align?: ButtonTileAlign = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the button-tile as compact version with description and button icon only. */
  @Prop({ mutable: true }) public compact?: BreakpointCustomizable<boolean> = false;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonType = 'submit';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button-tile and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The icon shown. By choosing 'none', no icon is displayed. */
  @Prop() public icon?: LinkButtonIconName = 'none';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ButtonAriaAttribute>;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (isDisabledOrLoading(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public componentWillLoad(): void {
    throwIfAlignTopAndNotCompact(this.host, this.align, this.compact);
  }

  public render(): JSX.Element {
    this.compact = parseJSON(this.compact) as any; // parsing the value just once per lifecycle
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.aspectRatio,
      this.size,
      this.weight,
      this.align,
      this.compact,
      this.gradient,
      this.disabled,
      this.loading
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    const buttonProps: ButtonTileProps = {
      theme: 'dark',
      variant: 'secondary',
      icon: this.icon,
      iconSource: this.iconSource,
      ...getButtonAriaAttributes(this.disabled, this.loading, this.aria),
    };

    const sharedButtonProps = {
      type: this.type,
      disabled: this.disabled,
      loading: this.loading,
    };

    const button: JSX.Element = (
      <PrefixedTagNames.pButton {...sharedButtonProps} {...buttonProps} key="link-or-button" class="link-or-button">
        {this.label}
      </PrefixedTagNames.pButton>
    );

    const buttonPure: JSX.Element = (
      <PrefixedTagNames.pButtonPure
        {...sharedButtonProps}
        {...buttonProps}
        key="link-or-button-pure"
        class="link-or-button-pure"
        hideLabel={true}
        icon={this.icon === 'none' ? 'arrow-right' : this.icon}
      >
        {this.label}
      </PrefixedTagNames.pButtonPure>
    );

    return (
      <div class="root">
        <div class="image-container">
          <slot />
        </div>
        <div class="content">
          <p>{this.description}</p>
          {typeof this.compact === 'boolean' ? (this.compact ? buttonPure : button) : [buttonPure, button]}
        </div>
      </div>
    );
  }
}
