import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { getPrefixedTagNames, throwIfRootNodeIsNotOfKind } from '../../../../utils';
import type { DropdownDirection, OptionMap } from '../select-wrapper/select-wrapper-utils';
import type { Theme } from '../../../../types';
import { getHighlightedOptionMapIndex } from '../select-wrapper/select-wrapper-utils';
import { getOptionAriaAttributes, getAriaAttributes, handleScroll } from './select-wrapper-dropdown-utils';
import { addComponentCss } from './select-wrapper-dropdown-styles';

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
  @Prop() public filter?: boolean = false; // TODO: remove this and handle it via optionMaps

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @Prop() public onSelect: (newIndex: number) => void;
  @Prop() public onFocus: () => void;
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
      <Host role="listbox" tabIndex={-1} {...getAriaAttributes(this.optionMaps, this.open, this.filter)}>
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
                onClick={() => (!selected && !disabled ? this.onSelect(index) : this.onFocus())}
                {...getOptionAriaAttributes(option)}
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
}
