import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, isDark } from '../../../utils';
import type { DropdownDirection, OptionMap } from './select-wrapper-utils';
import type { Theme } from '../../../types';
import type { InternalChangeEvent } from './select-wrapper-utils';
import { CHANGE_EVENT_NAME, getHighlightedOptionMapIndex, getSelectedOptionMapIndex } from './select-wrapper-utils';
import {
  determineDropdownDirection,
  getOptionAriaAttributes,
  getRootAriaAttributes,
  handleScroll,
} from './select-wrapper-dropdown-utils';

@Component({
  tag: 'p-select-wrapper-dropdown',
  styleUrl: 'select-wrapper-dropdown.scss',
  shadow: true,
})
export class SelectWrapperDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public optionMaps: OptionMap[] = [];

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: DropdownDirection = 'auto';

  /** Filters select options by typing a character */
  @Prop() public filter?: boolean = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @Prop() public hidden = true;

  private rootElement: HTMLDivElement;

  public connectedCallback(): void {
    // TODO: validate this is used within `p-select-wrapper`
  }

  public componentDidRender(): void {
    handleScroll(this.rootElement, getHighlightedOptionMapIndex(this.optionMaps));
  }

  public render(): JSX.Element {
    const direction =
      this.dropdownDirection === 'auto' ? determineDropdownDirection(this.host) : this.dropdownDirection;

    const rootClasses = {
      ['root']: true,
      [`root--direction-${direction}`]: true,
      ['root--hidden']: this.hidden,
      ['root--theme-dark']: isDark(this.theme),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div
          ref={(el) => (this.rootElement = el)}
          class={rootClasses}
          role="listbox"
          id="p-listbox"
          tabIndex={-1}
          aria-labelledby="p-label"
          {...getRootAriaAttributes(this.optionMaps, this.hidden, this.filter)}
          // aria-activedescendant={!this.filter && `option-${this.getHighlightedIndex(this.optionMaps)}`}
          // aria-expanded={!this.filter && (this.hidden ? 'false' : 'true')}
        >
          {this.filter && !this.optionMaps.length ? (
            <div class="option" aria-live="polite" role="status">
              <span aria-hidden="true">---</span>
              <span class="option-sr">No results found</span>
            </div>
          ) : (
            this.optionMaps.map((option, index) => {
              const { value, disabled, hidden, initiallyHidden, selected, highlighted, title } = option;
              return [
                title && (
                  <span class="optgroup-label" role="presentation">
                    {title}
                  </span>
                ),
                <div
                  id={`option-${index}`}
                  role="option"
                  class={{
                    ['option']: true,
                    ['option--selected']: selected,
                    ['option--highlighted']: highlighted,
                    ['option--disabled']: disabled,
                    ['option--hidden']: hidden || initiallyHidden,
                  }}
                  onClick={(e) => (!(disabled && selected) ? this.onClick(index) : this.onFocus(e))}
                  {...getOptionAriaAttributes(option)}
                  // aria-selected={highlighted ? 'true' : null}
                  // aria-disabled={disabled ? 'true' : null}
                  // aria-hidden={hidden || initiallyHidden ? 'true' : null}
                  // aria-label={!value ? 'Empty value' : null}
                >
                  {value && <span>{value}</span>}
                  {selected && !disabled && (
                    <PrefixedTagNames.pIcon class="icon" aria-hidden="true" name="check" color="inherit" />
                  )}
                </div>,
              ];
            })
          )}
        </div>
      </Host>
    );
  }

  private onFocus(_: MouseEvent): void {
    // if (!this.filter) {
    //   this.select.focus();
    // } else {
    //   e.preventDefault();
    //   this.filterInput.focus();
    // }
  }

  private onClick = (newIndex: number): void => {
    const oldSelectedIndex = getSelectedOptionMapIndex(this.optionMaps);
    if (oldSelectedIndex !== newIndex) {
      this.host.dispatchEvent(
        new CustomEvent<InternalChangeEvent>(CHANGE_EVENT_NAME, { bubbles: true, detail: { newIndex } })
      );
    }
  };
}
