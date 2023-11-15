import { Component, Element, h, Host, type JSX, Prop, State } from '@stencil/core';
import {
  addNativePopoverScrollAndResizeListeners,
  attachComponentCss,
  determineDropdownDirection,
  findClosestComponent,
  getFilterInputAriaAttributes,
  getHasNativePopoverSupport,
  getListAriaAttributes,
  getOptionAriaAttributes,
  getPrefixedTagNames,
  getSelectDropdownButtonAriaAttributes,
  isClickOutside,
  isSsrHydration,
  observeChildren,
  observeProperties,
  throwIfRootNodeIsNotOneOfKind,
  unobserveChildren,
} from '../../../utils';
import type {
  DropdownDirectionInternal,
  SelectWrapperDropdownDirection,
  SelectWrapperState,
} from '../select-wrapper/select-wrapper-utils';
import type { DropdownInteractionType, OptionMap } from './select-wrapper-dropdown-utils';
import {
  getAmountOfVisibleOptionsAndOptgroups,
  getDropdownVisibility,
  getHighlightedOptionMapIndex,
  getMatchingOptionMaps,
  getNewOptionMapIndex,
  getOptionMaps,
  getOptionsElements,
  getSelectedOptionMap,
  handleScroll,
  hasFilterResults,
  resetFilteredOptionMaps,
  resetHighlightedToSelectedOptionMaps,
  setFilteredOptionMaps,
  setFirstHighlightedOptionMaps,
  setHighlightedFirstMatchingOptionMaps,
  setHighlightedOptionMaps,
  setLastHighlightedOptionMaps,
  setSelectedOptionMaps,
  updateNativePopoverSelectStyles,
} from './select-wrapper-dropdown-utils';
import type { Theme } from '../../../types';
import { getComponentCss } from './select-wrapper-dropdown-styles';

@Component({
  tag: 'p-select-wrapper-dropdown',
  shadow: true,
})
export class SelectWrapperDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public selectRef?: HTMLSelectElement;
  @Prop() public label?: string;
  @Prop() public description?: string;
  @Prop() public message?: string;
  @Prop() public state?: SelectWrapperState;
  @Prop() public direction?: SelectWrapperDropdownDirection = 'auto';
  @Prop() public theme?: Theme = 'light';
  @Prop() public filter?: boolean = false;
  @Prop() public required?: boolean = false;
  @Prop() public disabled?: boolean = false;
  @Prop() public onOpenChange: (isOpen: boolean) => void; // to toggle icon--open class
  @Prop() public isOpenOverride?: boolean = false; // for vrt testing only

  @State() private isOpen = this.isOpenOverride;
  @State() private optionMaps: OptionMap[] = [];
  @State() private searchString = '';

  private inputElement: HTMLInputElement;
  private buttonElement: HTMLButtonElement;
  private listElement: HTMLUListElement;
  private isNativePopover: boolean = false;
  private parentTableElement: HTMLElement;
  private popoverElement: HTMLElement;

  private get selectedIndex(): number {
    return this.selectRef.selectedIndex;
  }

  public connectedCallback(): void {
    throwIfRootNodeIsNotOneOfKind(this.host, ['p-select-wrapper']);
    observeChildren(
      this.selectRef,
      () => {
        this.setOptionMaps();
        this.observeOptions(); // new option might have been added
      },
      // unfortunately we can't observe hidden property of option elements via observeProperties
      // therefore we do it here via attribute
      ['hidden', 'disabled', 'selected']
    );
    this.detectNativePopoverCase();
  }

  public componentDidRender(): void {
    if (this.isOpen) {
      handleScroll(this.listElement, getHighlightedOptionMapIndex(this.optionMaps));

      if (this.isNativePopover) {
        this.popoverElement.showPopover();
        updateNativePopoverSelectStyles(
          this.host,
          this.optionMaps,
          this.popoverElement,
          this.buttonElement,
          this.direction
        );
        addNativePopoverScrollAndResizeListeners(this.host, this.parentTableElement, this.popoverElement);
      }
    } else if (this.isNativePopover) {
      this.popoverElement.hidePopover();
    }
  }

  public componentWillLoad(): void {
    if (!isSsrHydration(this.host)) {
      // when ssr rendered component is partially hydrated before being rerendered by its parent select-wrapper
      // it has no select ref and options can't be accessed
      this.observeProperties();
      document.addEventListener('mousedown', this.onClickOutside, true);
    }
  }

  public disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    attachComponentCss(
      this.host,
      getComponentCss,
      this.direction === 'auto'
        ? determineDropdownDirection(this.host, getAmountOfVisibleOptionsAndOptgroups(this.optionMaps))
        : this.direction,
      this.isOpen,
      this.state,
      this.disabled,
      this.filter,
      this.theme,
      this.isNativePopover
    );

    const dropdownId = 'list';
    const labelId = 'label';
    const descriptionId = this.description && 'description';
    const buttonId = 'value';
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        {this.filter ? (
          [
            <input
              key="input"
              type="text"
              role="combobox"
              disabled={this.disabled}
              placeholder={getSelectedOptionMap(this.optionMaps)?.value || null}
              autoComplete="off"
              value={this.searchString}
              {...getFilterInputAriaAttributes(
                this.isOpen,
                this.required,
                labelId,
                descriptionId,
                dropdownId,
                getHighlightedOptionMapIndex(this.optionMaps)
              )}
              onKeyDown={this.onComboboxKeyDown}
              onInput={this.onFilterChange}
              onClick={() => this.setDropdownVisibility('show')}
              ref={(el) => (this.inputElement = el)}
            />,
            <span key="span" onClick={this.disabled ? undefined : () => this.setDropdownVisibility('toggle')} />,
          ]
        ) : (
          <button
            type="button"
            role="combobox"
            id={buttonId}
            disabled={this.disabled}
            {...getSelectDropdownButtonAriaAttributes(
              this.isOpen,
              labelId,
              descriptionId,
              dropdownId,
              getHighlightedOptionMapIndex(this.optionMaps)
            )}
            onClick={() => this.setDropdownVisibility('toggle')}
            onKeyDown={this.onComboboxKeyDown}
            ref={(el) => (this.buttonElement = el)}
          />
        )}
        {[
          <div class="sr-text" id={labelId}>
            {getSelectedOptionMap(this.optionMaps)?.value}, {this.label}
            {!!this.message && `. ${this.message}`}
          </div>,
          this.description && (
            <div class="sr-text" id={descriptionId}>
              {this.description}
            </div>
          ),
          <div
            {...(this.isNativePopover && {
              popover: 'auto',
              class: 'popover',
              ...(this.popoverElement?.matches(':popover-open') && {
                'popover-open': true,
              }),
            })}
            ref={(el) => (this.popoverElement = el)}
          >
            {this.isOpen && (
              <ul
                id={dropdownId}
                role="listbox"
                tabIndex={-1}
                {...getListAriaAttributes(this.label, this.required, this.filter, this.isOpen)}
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
                          option: true,
                          'option--selected': selected,
                          'option--highlighted': highlighted,
                          'option--disabled': disabled,
                          'option--hidden': hidden || initiallyHidden,
                        }}
                        onClick={!selected && !disabled ? () => this.setOptionSelected(index) : undefined}
                        {...getOptionAriaAttributes(selected, disabled, hidden, !!value)}
                      >
                        {value}
                        {selected && !disabled && (
                          <PrefixedTagNames.pIcon
                            aria-hidden="true"
                            name="check"
                            color={disabled ? 'state-disabled' : 'primary'}
                            theme={this.theme}
                          />
                        )}
                      </li>,
                    ];
                  })
                )}
              </ul>
            )}
          </div>,
        ]}
      </Host>
    );
  }

  private observeProperties(): void {
    this.setOptionMaps(); // initial
    this.observeOptions(); // initial

    observeProperties(this.selectRef, ['value', 'selectedIndex'], this.syncSelectedIndex);
  }

  private observeOptions(): void {
    getOptionsElements(this.selectRef).forEach((el) =>
      observeProperties(el, ['selected', 'disabled'], this.setOptionMaps)
    );
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (this.isOpen && isClickOutside(e, this.host)) {
      this.setDropdownVisibility('hide');
    }
  };

  private setDropdownVisibility = (type: DropdownInteractionType): void => {
    this.isOpen = getDropdownVisibility(this.isOpen, type, this.filter && this.resetFilter);
    this.onOpenChange(this.isOpen);
  };

  private onComboboxKeyDown = (e: KeyboardEvent): void => {
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
          if (this.isOpen) {
            this.setOptionSelected(getHighlightedOptionMapIndex(this.optionMaps));
          } else {
            this.setDropdownVisibility('show');
          }
        }
        break;
      case 'Escape':
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
          // TODO: seems to be difficult to combine multiple keys as native select does
          this.optionMaps = setHighlightedFirstMatchingOptionMaps(this.optionMaps, e.key);
        }
    }
  };

  private syncSelectedIndex = (): void => {
    this.optionMaps = setSelectedOptionMaps(this.optionMaps, this.selectedIndex);
  };

  private setOptionMaps = (): void => {
    this.optionMaps = setSelectedOptionMaps(getOptionMaps(getOptionsElements(this.selectRef)), this.selectedIndex);
  };

  private resetHighlightedToSelectedOptionMaps = (): void => {
    this.optionMaps = resetHighlightedToSelectedOptionMaps(this.optionMaps);
  };

  private setOptionSelected = (newIndex: number): void => {
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
    if (this.isOpen) {
      const newIndex = getNewOptionMapIndex(this.optionMaps, direction);
      this.optionMaps = setHighlightedOptionMaps(this.optionMaps, newIndex);
    }
    this.setDropdownVisibility('show');
  }

  private resetFilter = (): void => {
    if (this.filter) {
      this.searchString = '';
      this.optionMaps = resetFilteredOptionMaps(this.optionMaps);
      this.inputElement.value = '';
    }
  };

  private onFilterChange = (e: InputEvent): void => {
    this.searchString = (e.target as HTMLInputElement).value;
    if (this.searchString.startsWith(' ')) {
      this.resetFilter();
    } else {
      this.optionMaps = setFilteredOptionMaps(this.optionMaps, this.searchString);
    }

    // in case input is focused via tab instead of click
    this.setDropdownVisibility('show');
  };

  private detectNativePopoverCase = (): void => {
    if (getHasNativePopoverSupport()) {
      this.parentTableElement = findClosestComponent(
        (this.host.getRootNode() as ShadowRoot).host as HTMLElement,
        'pTable'
      );
      if (!!this.parentTableElement) {
        this.isNativePopover = true;
      }
    }
  };
}
