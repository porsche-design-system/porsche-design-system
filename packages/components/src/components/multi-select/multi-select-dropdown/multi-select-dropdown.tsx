import { Component, Element, Event, EventEmitter, h, Host, type JSX, Prop } from '@stencil/core';
import type { Theme } from '../../../types';
import { attachComponentCss } from '../../../utils';
import { getComponentCss } from './multi-select-dropdown-styles';
import { MultiSelectDropdownDirection, MultiSelectDropdownOpenChangeEvent } from './multi-select-dropdown-utils';
import { determineDirection } from '../../select-wrapper/select-wrapper-dropdown/select-wrapper-dropdown-utils';

@Component({
  tag: 'p-multi-select-dropdown',
  shadow: true,
})
export class MultiSelectDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public isOpen = false;

  @Prop() public direction?: MultiSelectDropdownDirection = 'auto';

  @Prop() public theme?: Theme = 'light';

  /** Emitted when the open state should change. */
  @Event({ bubbles: true }) public openChange: EventEmitter<MultiSelectDropdownOpenChangeEvent>;

  // TODO: Validation children must be options

  public componentWillLoad(): void {
    // TODO: registered only once?
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
  }

  public render(): JSX.Element {
    attachComponentCss(
      this.host,
      getComponentCss,
      this.isOpen,
      this.direction === 'auto' ? determineDirection(this.host) : this.direction,
      this.theme
    );
    return (
      <Host>
        <ul role="listbox">
          <slot />
        </ul>
      </Host>
    );
  }

  private onClickOutside = (e: MouseEvent): void => {
    // TODO: Put in multi-select
    // TODO: reuse as fn select-wrapper
    if (this.isOpen && !e.composedPath().includes(this.host && this.host.parentElement)) {
      this.openChange.emit({ isOpen: false });
    }
  };
}
