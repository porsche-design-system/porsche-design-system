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
import { sharedTilePropTypes } from '../link-tile/link-tile-utils';
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

  /** Font size of the description. */
  @Prop() public size?: BreakpointCustomizable<ButtonTileSize> = 'medium';

  /** Font weight of the description. */
  @Prop() public weight?: BreakpointCustomizable<ButtonTileWeight> = 'semi-bold';

  /** Aspect ratio of the button-tile. */
  @Prop() public aspectRatio?: BreakpointCustomizable<ButtonTileAspectRatio> = '4/3';

  /** Label of the button. */
  @Prop() public label: string;

  /** Description text. */
  @Prop() public description: string;

  /** Alignment of button and description. */
  @Prop() public align?: ButtonTileAlign = 'bottom';

  /** Show gradient. */
  @Prop() public gradient?: boolean = true;

  /** Displays the button-tile as compact version with description and button icon only. */
  @Prop() public compact?: BreakpointCustomizable<boolean> = false;

  /** Specifies the type of the button. */
  @Prop() public type?: ButtonTileType = 'submit';

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the button-tile and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** The icon shown. By choosing 'none', no icon is displayed. */
  @Prop() public icon?: ButtonTileIcon = 'none';

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Add ARIA attributes. */
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
    attachComponentCss(
      this.host,
      getComponentCss,
      isDisabledOrLoading(this.disabled, this.loading),
      this.aspectRatio,
      this.size,
      this.weight,
      this.align,
      this.compact,
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

    const buttonPure: JSX.Element = (
      <PrefixedTagNames.pButtonPure
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
        <slot name="header" />
        <div class="media">
          <slot onSlotchange={() => preventAutoPlayOfSlottedVideoOnPrefersReducedMotion(this.host)} />
        </div>
        <div class="footer">
          <p>{this.description}</p>
          <slot name="footer" onSlotchange={this.updateSlotObserver} />
          {typeof this.compact === 'boolean' ? (this.compact ? buttonPure : button) : [buttonPure, button]}
        </div>
      </div>
    );
  }

  private updateSlotObserver = (): void => {
    this.hasFooterSlot = hasNamedSlot(this.host, 'footer');
  };
}
