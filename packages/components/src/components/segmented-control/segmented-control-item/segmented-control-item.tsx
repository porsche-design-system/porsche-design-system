import { Component, Element, Host, h, type JSX, Prop, Watch } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, ValidatorFunction } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  isElementOfKind,
  throwIfParentIsNotOfKind,
  throwIfPropIsUndefined,
  updateParent,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './segmented-control-item-styles';
import {
  getSegmentedControlItemAriaAttributes,
  SEGMENTED_CONTROL_ITEM_ARIA_ATTRIBUTES,
  type SegmentedControlItemAriaAttribute,
  type SegmentedControlItemIcon,
  type SegmentedControlItemInternalHTMLProps,
} from './segmented-control-item-utils';

const propTypes: PropTypes<typeof SegmentedControlItem> = {
  value: AllowedTypes.oneOf<ValidatorFunction>([AllowedTypes.string, AllowedTypes.number]),
  disabled: AllowedTypes.boolean,
  label: AllowedTypes.string,
  icon: AllowedTypes.string,
  iconSource: AllowedTypes.string,
  aria: AllowedTypes.aria<SegmentedControlItemAriaAttribute>(SEGMENTED_CONTROL_ITEM_ARIA_ATTRIBUTES),
};

/**
 * @slot {"name": "", "description": "Default slot for the content." }
 */
@Component({
  tag: 'p-segmented-control-item',
  shadow: { delegatesFocus: true },
})
export class SegmentedControlItem {
  @Element() public host!: HTMLElement & SegmentedControlItemInternalHTMLProps;

  /** The value of this item which is emitted by the parent element if it becomes selected. This property is **required**. */
  @Prop() public value: string | number;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** The label text. */
  @Prop() public label?: string;

  /** The icon shown. */
  @Prop() public icon?: SegmentedControlItemIcon;

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<SegmentedControlItemAriaAttribute>;

  @Watch('label')
  @Watch('icon')
  @Watch('iconSource')
  public handleLabelChange(): void {
    // when these props change, we inform the parent to recalculate the max width for all items
    updateParent(this.host);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-segmented-control');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    // this additional validation is still needed because undefined is allowed with current propTypes
    throwIfPropIsUndefined(this.host, 'value', this.value);
    const hasIcon = !!this.icon || !!this.iconSource;
    const hasSlottedContent = !!this.host.innerHTML;

    const isDisabled = this.disabled || this.host.disabledParent;

    attachComponentCss(
      this.host,
      getComponentCss,
      this.host.compact,
      isDisabled,
      this.host.selected,
      this.host.state,
      hasIcon,
      hasSlottedContent
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host onClick={!isDisabled && this.onClick} onBlur={this.onBlur}>
        <button
          type="button"
          {...getSegmentedControlItemAriaAttributes(
            this.host.selected,
            this.disabled,
            this.host.state,
            this.host.message,
            this.aria
          )}
        >
          {this.label && <span>{this.label}</span>}
          {hasIcon && (
            <PrefixedTagNames.pIcon
              class="icon"
              size="inherit"
              name={this.icon}
              source={this.iconSource}
              color="inherit"
              aria-hidden="true"
            />
          )}
          <slot />
        </button>
      </Host>
    );
  }

  private onClick = (): void => {
    if (!this.disabled && !this.host.selected) {
      this.host.dispatchEvent(
        new CustomEvent('internalSegmentedControlItemUpdate', {
          bubbles: true,
        })
      );
    }
  };

  private onBlur = (e: FocusEvent): void => {
    e.stopPropagation();
    if (!e.relatedTarget || !isElementOfKind(e.relatedTarget as HTMLElement, 'p-segmented-control-item')) {
      this.host.dispatchEvent(
        new CustomEvent('internalBlur', {
          bubbles: true,
        })
      );
    }
  };
}
