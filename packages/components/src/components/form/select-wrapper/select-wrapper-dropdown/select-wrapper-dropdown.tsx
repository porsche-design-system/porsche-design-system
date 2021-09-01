import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { getPrefixedTagNames, observeChildren, observeProperties, throwIfRootNodeIsNotOfKind } from '../../../../utils';
import type { DropdownDirection, DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { DropdownInteractionType, OptionMap } from './select-wrapper-dropdown-utils';
import {
  getAriaAttributes,
  getDropdownVisibility,
  getHighlightedOptionMapIndex,
  getMatchingOptionMaps,
  getNewOptionMapIndex,
  getOptionAriaAttributes,
  getOptionMaps,
  getOptionsElements,
  getSelectedOptionMap,
  handleScroll,
  resetFilteredOptionMaps,
  resetHighlightedToSelectedOptionMaps,
  updateFirstHighlightedOptionMaps,
  updateHighlightedOptionMaps,
  updateLastHighlightedOptionMaps,
  updateSelectedOptionMaps,
} from './select-wrapper-dropdown-utils';
import type { Theme } from '../../../../types';
import { addComponentCss } from './select-wrapper-dropdown-styles';

@Component({
  tag: 'p-select-wrapper-dropdown',
  shadow: true,
})
export class SelectWrapperDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public selectRef?: HTMLSelectElement;
  @Prop() public label?: string = '';
  @Prop() public direction?: DropdownDirection = 'auto';
  @Prop() public theme?: Theme = 'light';
  @Prop() public filter?: boolean = false;

  @Prop() public onOpenChange: (isOpen: boolean) => void;
  // @Prop() public onSelect: (newIndex: number) => void;
  // @Prop() public onFocus: () => void;
  // @Prop() public onMouseDown: () => void;
  // @Prop() public open = false;

  @State() private isOpen = false;
  @State() private optionMaps: OptionMap[] = [];
  @State() private searchString = '';
  @State() private hasFilterResults?: boolean = false;

  private buttonElement: HTMLButtonElement;
  private listElement: HTMLUListElement;

  public connectedCallback(): void {
    throwIfRootNodeIsNotOfKind(this.host, 'pSelectWrapper');
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.direction, this.isOpen, this.theme);
  }

  public componentDidRender(): void {
    handleScroll(this.host, getHighlightedOptionMapIndex(this.optionMaps));
  }

  public componentWillLoad(): void {
    this.observePropertiesAndChildren();

    // if (!this.filter) {
    //   this.selectRef.addEventListener('change', this.syncSelectedIndex);
    // }

    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        {this.filter ? (
          <PrefixedTagNames.pSelectWrapperFilter
            class="filter"
            placeholder={getSelectedOptionMap(this.optionMaps)?.value}
            highlightedIndex={getHighlightedOptionMapIndex(this.optionMaps)}
            // dropdownId={dropdownId}
            // disabled={disabled}
            // isOpen={this.isOpen}
            // state={this.state}
            // theme={this.theme}
            // value={this.searchString}
            // onChange={this.onFilterChange}
            // onClick={() => this.setDropdownVisibility('toggle')}
            // onKeyDown={this.onButtonKeyboardEvents}
            // ref={(el) => (this.filterElement = el)}
          />
        ) : (
          <button
            aria-haspopup="listbox"
            aria-label={`${this.label}: ${getSelectedOptionMap(this.optionMaps)?.value}`}
            aria-controls="list"
            class="combo-button"
            type="button"
            aria-live="polite"
            onClick={this.onMouseDown}
            aria-expanded={this.isOpen ? 'true' : 'false'}
            onKeyDown={this.onButtonKeyboardEvents}
            ref={(el) => (this.buttonElement = el)}
          />
        )}
        <ul
          role="listbox"
          class="listbox"
          id="list"
          aria-label={this.label}
          tabIndex={-1}
          {...getAriaAttributes(this.optionMaps, this.filter)}
          onKeyDown={this.onListKeyboardEvents}
          ref={(el) => (this.listElement = el)}
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
                  onClick={() => (!selected && !disabled ? this.setOptionSelected(index) : this.onFocus())}
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

  private observePropertiesAndChildren(): void {
    this.setOptionMaps(); // initial
    this.observeOptions(); // initial

    observeProperties(this.selectRef, ['value', 'selectedIndex'], () => {
      console.log('observeProperties cb');
      this.syncSelectedIndex();
    });
    observeChildren(
      this.selectRef,
      () => {
        console.log('observeChildren cb');
        this.setOptionMaps();
        this.observeOptions(); // new option might have been added
      },
      // unfortunately we can't observe hidden property of option elements via observeProperties
      // therefore we do it here via attribute
      ['hidden']
    );
  }

  private observeOptions(): void {
    getOptionsElements(this.selectRef).forEach((el) =>
      observeProperties(el, ['selected', 'disabled'], () => {
        console.log('observeOptions -> observeProperties');
        this.setOptionMaps();
      })
    );
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (!e.composedPath().includes(this.host)) {
      this.setDropdownVisibility('hide');
    }
  };

  private onMouseDown = (): void => {
    // e.preventDefault();
    // e.stopPropagation();
    // this.onFocus();
    this.setDropdownVisibility('toggle');
  };

  private onFocus = (): void => {
    // if (!this.isOpen) {
    //   return;
    // } else {
    //   (this.filter ? this.filterElement : this.comboButton).focus();
    // }
  };

  private setDropdownVisibility = (type: DropdownInteractionType): void => {
    console.log('setDropdownVisibility', type);
    this.isOpen = getDropdownVisibility(this.isOpen, type, this.filter && this.resetFilter);
    this.onOpenChange(this.isOpen);

    if (this.isOpen) {
      this.listElement.focus();
    } else {
      this.buttonElement.focus();
    }
  };

  private onButtonKeyboardEvents = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'ArrowUp':
      case 'Up':
        e.preventDefault();
        this.setDropdownVisibility('show');
        this.cycleDropdown('up');
        break;
      case 'ArrowDown':
      case 'Down':
        e.preventDefault();
        this.setDropdownVisibility('show');
        this.cycleDropdown('down');
        break;
      case ' ':
      case 'Spacebar':
      case 'Enter':
        e.preventDefault();
        console.log('onButtonKeyboardEvents Space', getHighlightedOptionMapIndex(this.optionMaps));
        this.setDropdownVisibility('show');
        break;
    }
  };

  private onListKeyboardEvents = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'ArrowUp':
      case 'Up':
        e.preventDefault();
        this.cycleDropdown('up');
        break;
      case 'ArrowDown':
      case 'Down':
        e.preventDefault();
        this.cycleDropdown('down');
        break;
      case ' ':
      case 'Spacebar':
        e.preventDefault();
        console.log('onListKeyboardEvents Space', getHighlightedOptionMapIndex(this.optionMaps));
        this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
        break;
      case 'Enter':
        e.preventDefault();
        if (this.filter) {
          const matchingOptions = getMatchingOptionMaps(this.optionMaps, this.searchString);
          if (matchingOptions.length === 1) {
            this.setOptionSelected(this.optionMaps.indexOf(matchingOptions[0]));
          } else {
            this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          }
        } else {
          this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
        }
        break;
      case 'Escape':
      case 'Esc':
      case 'Tab':
        this.resetFilter();
        this.setDropdownVisibility('hide');
        this.resetHighlightedToSelectedOptionMaps();
        break;
      case 'PageUp':
        e.preventDefault();
        this.optionMaps = updateFirstHighlightedOptionMaps(this.optionMaps);
        break;
      case 'PageDown':
        e.preventDefault();
        this.optionMaps = updateLastHighlightedOptionMaps(this.optionMaps);
        break;
    }
  };

  private get selectedIndex(): number {
    return this.selectRef.selectedIndex;
  }

  private syncSelectedIndex = (): void => {
    console.log('syncSelectedIndex');
    this.optionMaps = updateSelectedOptionMaps(this.optionMaps, this.selectedIndex);
  };

  private setOptionMaps = (): void => {
    console.log('setOptionMaps');
    this.optionMaps = updateSelectedOptionMaps(getOptionMaps(getOptionsElements(this.selectRef)), this.selectedIndex);
  };

  private resetHighlightedToSelectedOptionMaps = (): void => {
    this.optionMaps = resetHighlightedToSelectedOptionMaps(this.optionMaps);
  };

  private setOptionSelected = (newIndex: number): void => {
    console.log('setOptionSelected', this.selectedIndex, '-->', newIndex);
    this.setDropdownVisibility('hide');

    if (this.selectedIndex !== newIndex) {
      this.selectRef.selectedIndex = newIndex;
      this.selectRef.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      this.resetHighlightedToSelectedOptionMaps();
    }

    this.resetFilter();
    this.onFocus();
  };

  private cycleDropdown(direction: DropdownDirectionInternal): void {
    console.log('cycleDropdown', direction);
    const newIndex = getNewOptionMapIndex(this.optionMaps, direction);
    this.optionMaps = updateHighlightedOptionMaps(this.optionMaps, newIndex);
  }

  /*
   * <START CUSTOM FILTER>
   */
  private resetFilter = (): void => {
    console.log('resetFilter');
    if (this.filter) {
      console.log('inside?');
      this.searchString = '';
      this.optionMaps = resetFilteredOptionMaps(this.optionMaps);
    }
  };

  // private onFilterChange = (e: InputEvent): void => {
  //   this.searchString = (e.target as HTMLInputElement).value;
  //   this.optionMaps = updateFilteredOptionMaps(this.optionMaps, this.searchString);
  //
  //   // in case input is focused via tab instead of click
  //   this.setDropdownVisibility('show');
  // };
}
