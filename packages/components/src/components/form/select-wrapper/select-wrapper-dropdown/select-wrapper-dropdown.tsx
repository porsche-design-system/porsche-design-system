import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames } from '../../../../utils';
import type { DropdownDirection, OptionMap } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../../types';
import { getHighlightedOptionMapIndex, getSelectedOptionMapIndex } from '../select-wrapper/select-wrapper-utils';
import {
  addComponentCss,
  getOptionAriaAttributes,
  getRootAriaAttributes,
  handleScroll,
} from './select-wrapper-dropdown-utils';

@Component({
  tag: 'p-select-wrapper-dropdown',
  shadow: true,
})
export class SelectWrapperDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public optionMaps: OptionMap[] = [];

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public direction?: DropdownDirection = 'auto';

  /** Filters select options by typing a character */
  @Prop() public filter?: boolean = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @Prop() public onSelect: (newIndex: number) => void;
  @Prop() public onFocus: () => void;
  @Prop() public open = false;

  public connectedCallback(): void {
    // TODO: validate this is used within `p-select-wrapper`
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.direction, this.open, this.theme);
  }

  public componentDidRender(): void {
    handleScroll(this.host, getHighlightedOptionMapIndex(this.optionMaps));
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host
        role="listbox"
        tabIndex={-1}
        {...getRootAriaAttributes(this.optionMaps, this.open, this.filter)}
        // aria-activedescendant={!this.filter && `option-${this.getHighlightedIndex(this.optionMaps)}`}
        // aria-expanded={!this.filter && (this.hidden ? 'false' : 'true')}
      >
        {this.filter && !this.optionMaps.length ? (
          <div class="option" aria-live="polite" role="status">
            <span aria-hidden="true">---</span>
            <span class="option__sr">No results found</span>
          </div>
        ) : (
          this.optionMaps.map((option, index) => {
            const { value, disabled, hidden, initiallyHidden, selected, highlighted, title } = option;
            return [
              title && (
                <span class="optgroup" role="presentation">
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
                onClick={() => (!disabled && !selected ? this.onClick(index) : this.onFocus())}
                {...getOptionAriaAttributes(option)}
                // aria-selected={highlighted ? 'true' : null}
                // aria-disabled={disabled ? 'true' : null}
                // aria-hidden={hidden || initiallyHidden ? 'true' : null}
                // aria-label={!value ? 'Empty value' : null}
              >
                {value}
                {selected && !disabled && (
                  <PrefixedTagNames.pIcon class="icon" aria-hidden="true" name="check" color="inherit" />
                )}
              </div>,
            ];
          })
        )}
      </Host>
    );
  }

  private onClick = (newIndex: number): void => {
    if (getSelectedOptionMapIndex(this.optionMaps) !== newIndex) {
      this.onSelect(newIndex);
    }
  };
}
