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
  @Prop() public state?: FormState;
  @Prop() public direction?: DropdownDirection = 'auto';
  @Prop() public theme?: Theme = 'light';
  @Prop() public filter?: boolean = false;
  @Prop() public disabled?: boolean = false;
  @Prop() public onOpenChange: (isOpen: boolean) => void; // to toggle icon--open class

  @State() private isOpen = false;
  @State() private optionMaps: OptionMap[] = [];
  @State() private searchString = '';

  private buttonElement: HTMLButtonElement;
  private listElement: HTMLUListElement;
  private filterInputElement: HTMLInputElement;

  public connectedCallback(): void {
    throwIfRootNodeIsNotOfKind(this.host, 'pSelectWrapper');
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.direction, this.isOpen, this.state, this.filter, this.theme);
  }

  public componentDidRender(): void {
    handleScroll(this.host, getHighlightedOptionMapIndex(this.optionMaps));
  }

  public componentWillLoad(): void {
    this.observePropertiesAndChildren();

    if (!this.filter) {
      // input has onBlur event handler
      document.addEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public disconnectedCallback(): void {
    if (!this.filter) {
      // input has onBlur event handler
      document.removeEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public render(): JSX.Element {
    const dropdownId = 'list';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        {this.filter ? (
          [
            <input
              type="text"
              role="combobox"
              disabled={this.disabled}
              placeholder={getSelectedOptionMap(this.optionMaps)?.value}
              value={this.searchString}
              onFocus={() => this.setDropdownVisibility('show')}
              onBlur={() => this.setDropdownVisibility('hide')}
              onKeyDown={this.onListKeyDown}
              onInput={this.onFilterChange}
              {...getFilterInputAriaAttributes(this.isOpen, dropdownId, getHighlightedOptionMapIndex(this.optionMaps))}
              ref={(el) => (this.filterInputElement = el)}
            />,
            <span
              onClick={() => {
                this.setDropdownVisibility('toggle');
                this.filterInputElement.focus();
              }}
            />,
          ]
        ) : (
          <button
            type="button"
            {...getButtonAriaAttributes(this.label, this.optionMaps, this.isOpen, dropdownId, this.state)}
            {...(this.disabled && { disabled: true })}
            onClick={() => this.setDropdownVisibility('toggle')}
            onKeyDown={this.onButtonKeyDown}
            ref={(el) => (this.buttonElement = el)}
          />
        )}
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
      // default:
      //   console.log('onButtonKeyDown search', e);
      //   // TODO: seems to be difficult to combine multiple keys as native select does
      //   const newIndex = getFirstMatchingOptionMapIndex(this.optionMaps, e.key);
      //   if (newIndex) {
      //     this.setOptionSelected(newIndex);
      //   }
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
        if (!this.filter) {
          e.preventDefault();
          console.log('onListKeyboardEvents Space', getHighlightedOptionMapIndex(this.optionMaps));
          this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          break;
        }
      case 'Enter':
        e.preventDefault();
        if (this.filter) {
          const matchingOptions = getMatchingOptionMaps(this.optionMaps, this.searchString);
          if (matchingOptions.length === 1) {
            this.setOptionSelected(this.optionMaps.indexOf(matchingOptions[0]));
          } else {
            this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          }
          // this.setDropdownVisibility('hide');
          // console.log('this.searchString', this.searchString);
        } else {
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
        e.preventDefault();
        this.optionMaps = setFirstHighlightedOptionMaps(this.optionMaps);
        break;
      case 'PageDown':
        e.preventDefault();
        this.optionMaps = setLastHighlightedOptionMaps(this.optionMaps);
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
