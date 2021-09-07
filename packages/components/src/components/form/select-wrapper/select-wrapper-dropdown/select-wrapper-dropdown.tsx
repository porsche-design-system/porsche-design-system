import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { getPrefixedTagNames, observeChildren, observeProperties, throwIfRootNodeIsNotOfKind } from '../../../../utils';
import type { DropdownDirection, DropdownDirectionInternal } from '../select-wrapper/select-wrapper-utils';
import type { DropdownInteractionType, OptionMap } from './select-wrapper-dropdown-utils';
import {
  getListAriaAttributes,
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
  setFirstHighlightedOptionMaps,
  setHighlightedOptionMaps,
  setLastHighlightedOptionMaps,
  setSelectedOptionMaps,
  getButtonAriaAttributes,
  setHighlightedFirstMatchingOptionMaps,
  hasFilterResults,
  getFilterInputAriaAttributes,
  setFilteredOptionMaps,
} from './select-wrapper-dropdown-utils';
import type { FormState, Theme } from '../../../../types';
import { addComponentCss } from './select-wrapper-dropdown-styles';

@Component({
  tag: 'p-select-wrapper-dropdown',
  shadow: true,
})
export class SelectWrapperDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public selectRef?: HTMLSelectElement;
  @Prop() public label?: string;
  @Prop() public message?: string;
  @Prop() public state?: FormState;
  @Prop() public direction?: DropdownDirection = 'auto';
  @Prop() public theme?: Theme = 'light';
  @Prop() public filter?: boolean = false;
  @Prop() public disabled?: boolean = false;
  @Prop() public onOpenChange: (isOpen: boolean) => void; // to toggle icon--open class
  @Prop() public isOpenOverride?: boolean = false; // for vrt testing only

  @State() private isOpen = this.isOpenOverride;
  @State() private optionMaps: OptionMap[] = [];
  @State() private searchString = '';

  private buttonElement: HTMLButtonElement;
  private listElement: HTMLUListElement;

  public connectedCallback(): void {
    throwIfRootNodeIsNotOfKind(this.host, 'pSelectWrapper');
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.direction, this.isOpen, this.disabled, this.state, this.filter, this.theme);
  }

  public componentDidRender(): void {
    handleScroll(this.listElement, getHighlightedOptionMapIndex(this.optionMaps));
  }

  public componentWillLoad(): void {
    this.observePropertiesAndChildren();
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
  }

  public render(): JSX.Element {
    const dropdownId = 'list';
    const labelId = 'label';
    const buttonId = 'value';
    const messageId = 'message';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        {this.filter
          ? [
              <input
                type="text"
                role="combobox"
                disabled={this.disabled}
                placeholder={getSelectedOptionMap(this.optionMaps)?.value}
                value={this.searchString}
                {...getFilterInputAriaAttributes(
                  this.isOpen,
                  dropdownId,
                  getHighlightedOptionMapIndex(this.optionMaps)
                )}
                // onFocus={() => this.setDropdownVisibility('show')}
                // onBlur={() => {
                //   console.log('blur');
                //   this.setDropdownVisibility('hide');
                // }}
                onKeyDown={this.onListKeyDown}
                onInput={this.onFilterChange}
                onClick={() => this.setDropdownVisibility('show')}
              />,
              <span
                onClick={() => {
                  console.log('span click');
                  this.setDropdownVisibility('toggle');
                  // if (this.isOpen) {
                  //   this.setDropdownVisibility('hide');
                  // } else {
                  //   this.filterInputElement.focus();
                  // }
                }}
              />,
            ]
          : [
              <button
                type="button"
                id={buttonId}
                disabled={this.disabled}
                title={getSelectedOptionMap(this.optionMaps)?.value}
                {...getButtonAriaAttributes(this.isOpen, dropdownId, labelId, buttonId, messageId)}
                onClick={() => this.setDropdownVisibility('toggle')}
                onKeyDown={this.onButtonKeyDown}
                ref={(el) => (this.buttonElement = el)}
              >
                <span>{getSelectedOptionMap(this.optionMaps)?.value}</span>
              </button>,
              <span id={labelId}>{this.label}</span>,
              <span id={messageId}>{this.message}</span>,
            ]}
        <ul
          id={dropdownId}
          role="listbox"
          tabIndex={-1}
          {...getListAriaAttributes(this.label, this.optionMaps, this.filter)}
          onKeyDown={this.onListKeyDown}
          ref={(el) => (this.listElement = el)}
        >
          {this.filter && !hasFilterResults(this.optionMaps) ? (
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
                  onClick={!selected && !disabled ? () => this.setOptionSelected(index) : undefined}
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
    if (this.isOpen && !e.composedPath().includes(this.host)) {
      console.log('onClickOutside');
      this.setDropdownVisibility('hide');
      // this.isOpen = false;
      // this.resetFilter();
    }
  };

  private setDropdownVisibility = (type: DropdownInteractionType): void => {
    console.log('setDropdownVisibility', type);
    this.isOpen = getDropdownVisibility(this.isOpen, type, this.filter && this.resetFilter);
    this.onOpenChange(this.isOpen);

    if (!this.filter) {
      (this.isOpen ? this.listElement : this.buttonElement).focus();
    }
  };

  private onButtonKeyDown = (e: KeyboardEvent): void => {
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
      case 'Enter':
        e.preventDefault();
        console.log('onButtonKeyboardEvents Space', getHighlightedOptionMapIndex(this.optionMaps));
        this.setDropdownVisibility('show');
        break;
    }
  };

  private onListKeyDown = (e: KeyboardEvent): void => {
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
      case 'Enter':
        if (this.filter) {
          if (e.key === 'Enter') {
            e.preventDefault();
            const matchingOptions = getMatchingOptionMaps(this.optionMaps, this.searchString);
            if (matchingOptions.length === 1) {
              this.setOptionSelected(this.optionMaps.indexOf(matchingOptions[0]));
            } else {
              this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
            }
          }
        } else {
          e.preventDefault();
          this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
        }
        break;
      case 'Escape':
      case 'Esc':
      case 'Tab':
        this.setDropdownVisibility('hide');
        this.resetHighlightedToSelectedOptionMaps();
        break;
      case 'PageUp':
        if (this.isOpen) {
          e.preventDefault();
          this.optionMaps = setFirstHighlightedOptionMaps(this.optionMaps);
        }
        break;
      case 'PageDown':
        if (this.isOpen) {
          e.preventDefault();
          this.optionMaps = setLastHighlightedOptionMaps(this.optionMaps);
        }
        break;
      default:
        if (!this.filter) {
          console.log('onListKeyDown search', e);
          // TODO: seems to be difficult to combine multiple keys as native select does
          this.optionMaps = setHighlightedFirstMatchingOptionMaps(this.optionMaps, e.key);
        }
    }
  };

  private get selectedIndex(): number {
    return this.selectRef.selectedIndex;
  }

  private syncSelectedIndex = (): void => {
    console.log('syncSelectedIndex');
    this.optionMaps = setSelectedOptionMaps(this.optionMaps, this.selectedIndex);
  };

  private setOptionMaps = (): void => {
    console.log('setOptionMaps');
    this.optionMaps = setSelectedOptionMaps(getOptionMaps(getOptionsElements(this.selectRef)), this.selectedIndex);
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
      this.resetFilter();
    }
  };

  private cycleDropdown(direction: DropdownDirectionInternal): void {
    console.log('cycleDropdown', direction);
    this.setDropdownVisibility('show');
    const newIndex = getNewOptionMapIndex(this.optionMaps, direction);
    this.optionMaps = setHighlightedOptionMaps(this.optionMaps, newIndex);
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

  private onFilterChange = (e: InputEvent): void => {
    this.searchString = (e.target as HTMLInputElement).value;
    this.optionMaps = setFilteredOptionMaps(this.optionMaps, this.searchString);

    // in case input is focused via tab instead of click
    this.setDropdownVisibility('show');
  };
}
