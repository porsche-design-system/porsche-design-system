import { Component, Element, h, JSX, Listen, Prop, Watch } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  throwIfParentIsNotOfKind,
  throwIfPropIsUndefined,
  updateParent,
} from '../../../utils';
import type { IconName } from '../../../types';
import { getComponentCss } from './segmented-control-item-styles';
import type { SegmentedControlItemInternalHTMLProps } from './segmented-control-item-utils';
import { getButtonAttributes } from './segmented-control-item-utils';

@Component({
  tag: 'p-segmented-control-item',
  shadow: { delegatesFocus: true },
})
export class SegmentedControlItem {
  @Element() public host!: HTMLElement & SegmentedControlItemInternalHTMLProps;

  /** The value of this item which is emitted by the parent element if it becomes selected. */
  @Prop() public value: string | number;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** The label text. */
  @Prop() public label?: string;

  /** The icon shown. */
  @Prop() public icon?: IconName;

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  @Watch('label')
  @Watch('icon')
  @Watch('iconSource')
  public handleLabelChange(): void {
    updateParent(this.host);
  }

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.disabled || this.host.selected) {
      e.stopPropagation();
    }
  }

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pSegmentedControl');
  }

  public componentWillRender(): void {
    throwIfPropIsUndefined(this.host, 'value', this.value);

    attachComponentCss(
      this.host,
      getComponentCss,
      this.disabled,
      this.host.selected,
      this.host.backgroundColor || 'background-default', // default as fallback
      this.host.theme || 'light' // default as fallback
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <button type="button" {...getButtonAttributes(this.host.selected, this.disabled)}>
        {this.label && <span>{this.label}</span>}
        {(this.icon || this.iconSource) && (
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
    );
  }
}
