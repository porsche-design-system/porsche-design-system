import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, throwIfRootNodeIsNotOfKind } from '../../../../utils';
import type { DropdownDirection, OptionMap } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../../types';
import { getSelectedOptionMap, getHighlightedOptionMapIndex } from '../select-wrapper/select-wrapper-utils';
import { getOptionAriaAttributes, getAriaAttributes, handleScroll } from './select-wrapper-dropdown-utils';
import { addComponentCss } from './select-wrapper-dropdown-styles';

@Component({
  tag: 'p-select-wrapper-dropdown',
  shadow: true,
})
export class SelectWrapperDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public label?: string = '';
  @Prop() public optionMaps: OptionMap[] = [];
  @Prop() public direction?: DropdownDirection = 'auto';
  @Prop() public theme?: Theme = 'light';
  @Prop() public filter?: boolean = false;
  @Prop() public hasFilterResults?: boolean = false;

  @Prop() public onSelect: (newIndex: number) => void;
  @Prop() public onFocus: () => void;
  @Prop() public onMouseDown: () => void;
  @Prop() public open = false;

  public connectedCallback(): void {
    throwIfRootNodeIsNotOfKind(this.host, 'pSelectWrapper');
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
      <Host>
        {!this.filter && (
          <button
            aria-haspopup="listbox"
            aria-label={`${this.label}: ${getSelectedOptionMap(this.optionMaps).value}`}
            aria-controls="list"
            class="combo-button"
            type="button"
            aria-live="polite"
            onClick={this.onMouseDown}
            aria-expanded={this.open ? 'true' : 'false'}
          />
        )}
        <ul
          role="listbox"
          class="listbox"
          id="list"
          aria-label={this.label}
          tabIndex={-1}
          {...getAriaAttributes(this.optionMaps, this.filter)}
        >
          {this.filter && !this.hasFilterResults ? (
            <li class="option" aria-live="polite" role="status">
              <span aria-hidden="true">---</span>
              <span class="option__sr">No results found</span>
            </li>
          ) : (
            this.optionMaps.map((option, index) => {
              const { value, disabled, hidden, initiallyHidden, selected, highlighted, title } = option;
              return [
                title && (
                  <span class="optgroup" role="presentation">
                    {title}
                  </span>
                ),
                <li
                  id={`option-${index}`}
                  role="option"
                  class={{
                    ['option']: true,
                    ['option--selected']: selected,
                    ['option--highlighted']: highlighted,
                    ['option--disabled']: disabled,
                    ['option--hidden']: hidden || initiallyHidden,
                  }}
                  onClick={() => (!selected && !disabled ? this.onSelect(index) : this.onFocus())}
                  {...getOptionAriaAttributes(option)}
                >
                  {value}
                  {selected && !disabled && (
                    <PrefixedTagNames.pIcon class="icon" aria-hidden="true" name="check" color="inherit" />
                  )}
                </li>,
              ];
            })
          )}
        </ul>
      </Host>
    );
  }
}
