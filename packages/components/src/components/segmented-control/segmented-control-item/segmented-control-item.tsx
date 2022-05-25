import { Component, Element, h, JSX, Listen, Prop } from '@stencil/core';
import { attachComponentCss, getPrefixedTagNames } from '../../../utils';
import type { IconName } from '../../../types';
import { getComponentCss } from './segmented-control-item-styles';

@Component({
  tag: 'p-segmented-control-item',
  shadow: { delegatesFocus: true },
})
export class SegmentedControl {
  @Element() public host!: HTMLElement;

  // TODO: active? checked? selected?
  @Prop() public selected?: boolean = false;

  /** Disables the button. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** The icon shown. */
  @Prop() public icon?: IconName;

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.disabled) {
      e.stopPropagation();
    }
  }

  // public connectedCallback(): void {
  // NOTE: conflicts with cloneNode
  //   throwIfParentIsNotOfKind(this.host, 'pSegmentedControl');
  // }

  public componentWillRender(): void {
    attachComponentCss(
      this.host,
      getComponentCss,
      this.selected,
      this.disabled,
      (this.host as any).backgroundColor,
      (this.host as any).theme || 'light'
    );
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <button type="button" disabled={this.disabled}>
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
