import { Component, Element, h, Host, JSX, Prop, State } from '@stencil/core';
import { getHTMLElements, getPrefixedTagNames, isDark } from '../../../utils';
import type { OptionMap } from './select-wrapper-utils';
import type { Theme } from '../../../types';
import { CHANGE_EVENT_NAME, InternalChangeEvent } from './select-wrapper-utils';
import { getOptionAriaAttributes, getRootAriaAttributes } from './select-wrapper-dropdown-utils';

@Component({
  tag: 'p-select-wrapper-dropdown',
  styleUrl: 'select-wrapper-dropdown.scss',
  shadow: true,
})
export class SelectWrapperDropdown {
  @Element() public host!: HTMLElement;

  @Prop() public optionMaps: OptionMap[] = [];

  /** Changes the direction to which the dropdown list appears. */
  @Prop() public dropdownDirection?: 'down' | 'up' | 'auto' = 'auto';

  /** Filters select options by typing a character */
  @Prop() public filter?: boolean = false;

  /** Adapts the select color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  @Prop() public hidden = true;

  @State() private filterHasResults = true;

  // private select: HTMLSelectElement;
  // private options: HTMLOptionElement[];
  private fakeOptionListNode: HTMLDivElement;
  private fakeOptionHighlightedNode: HTMLDivElement;
  // private selectObserver: MutationObserver;
  // private filterInput: HTMLInputElement;
  // private fakeFilter: HTMLSpanElement;
  // private searchString: string;
  // private dropdownDirectionInternal: 'down' | 'up' = 'down';
  // private renderCustomDropDown: boolean;

  public connectedCallback(): void {
    // this.observeSelect();
    // TODO: validate this is used within `p-select-wrapper`
  }

  public componentWillLoad(): void {
    // observeProperties(this.select, ['value', 'selectedIndex'], this.setOptionList);
    // this.options.forEach((x) => {
    //   observeProperties(x, ['selected'], this.setOptionList);
    // });
  }

  public componentDidLoad(): void {
    // if (this.filter) {
    //   this.fakeFilter.addEventListener('click', this.onFilterInputClick);
    //   this.filterInput.addEventListener('mousedown', this.onFilterInputClick);
    //   this.filterInput.addEventListener('keydown', this.onKeyboardEvents);
    //   this.filterInput.addEventListener('input', this.onFilterSearch);
    // }
  }

  public componentDidRender(): void {}

  public disconnectedCallback(): void {
    // this.selectObserver.disconnect();
    // if (this.renderCustomDropDown) {
    //   this.disconnectCustomDropDown();
    // }
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      [`root--direction-${this.dropdownDirection}`]: true,
      ['root--hidden']: this.hidden,
      ['root--theme-dark']: isDark(this.theme),
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <div
          class={rootClasses}
          role="listbox"
          id="p-listbox"
          tabIndex={-1}
          aria-labelledby="p-label"
          {...getRootAriaAttributes(this.optionMaps, this.hidden, this.filter)}
          // aria-activedescendant={!this.filter && `option-${this.getHighlightedIndex(this.optionMaps)}`}
          // aria-expanded={!this.filter && (this.hidden ? 'false' : 'true')}
          ref={(el) => (this.fakeOptionListNode = el)}
        >
          {!this.filterHasResults ? (
            <div class="option" aria-live="polite" role="status">
              <span aria-hidden="true">---</span>
              <span class="option-sr">No results found</span>
            </div>
          ) : (
            // TODO: OptionMaps should contain information about optgroup. This way we would not request dom nodes while rendering.
            this.optionMaps.map((option, index) => {
              const { value, disabled, hidden, initiallyHidden, selected, highlighted } = option;
              return [
                // getTagName(item.parentElement) === 'optgroup' && item.previousElementSibling === null && (
                //   <span class="optgroup-label" role="presentation">
                //     {getClosestHTMLElement(item, 'optgroup').label}
                //   </span>
                // ),
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
                  onClick={(e) => (!disabled && !selected ? this.setOptionSelected(index) : this.onFocus(e))}
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

  private handleDropdownDirection(): void {
    if (this.dropdownDirection === 'auto') {
      // const children = getHTMLElements(this.fakeOptionListNode, `.option:not([aria-hidden="true"])`);
      // const { top: spaceTop } = this.select.getBoundingClientRect();
      // const listNodeChildrenHeight = children[0].clientHeight;
      // const numberOfChildNodes = children.length;
      // Max number of children visible is set to 10
      // const listNodeHeight =
      //   numberOfChildNodes >= 10 ? listNodeChildrenHeight * 10 : listNodeChildrenHeight * numberOfChildNodes;
      // const spaceBottom = window.innerHeight - spaceTop - this.select.clientHeight;
      // if (spaceBottom <= listNodeHeight && spaceTop >= listNodeHeight) {
      //   this.dropdownDirectionInternal = 'up';
      // } else {
      //   this.dropdownDirectionInternal = 'down';
      // }
    }
  }

  private handleVisibilityOfFakeOptionList(type: 'show' | 'hide' | 'toggle'): void {
    if (this.hidden) {
      if (type === 'show' || type === 'toggle') {
        this.hidden = false;
        this.handleDropdownDirection();
        this.handleScroll();
      }
    } else {
      if (type === 'hide' || type === 'toggle') {
        this.hidden = true;
        // if (this.filter) {
        //   this.resetFilterInput();
        // }
      }
    }
  }

  // private setOptionList = (): void => {
  //   // this.setOptions();
  //   this.optionMaps = this.options.map((item, index) => {
  //     const initiallyHidden = item.hasAttribute('hidden');
  //     const disabled = item.hasAttribute('disabled');
  //     const selected = item.selected;
  //     const highlighted = selected;
  //     const option: OptionMap = {
  //       key: index,
  //       value: item.text,
  //       disabled,
  //       hidden: false,
  //       initiallyHidden,
  //       selected,
  //       highlighted,
  //     };
  //     return option;
  //   });
  // };

  private setOptionSelected = (newIndex: number): void => {
    // const oldSelectedValue = this.select.options[this.select.selectedIndex].text;
    // this.select.selectedIndex = newIndex;
    // const newSelectedValue = this.select.options[this.select.selectedIndex].text;
    false && this.handleVisibilityOfFakeOptionList('hide');

    if (this.filter) {
      // this.filterInput.value = '';
      // this.searchString = '';
      this.filterHasResults = true;
      // this.filterInput.focus();
    } else {
      // if (document.activeElement !== this.select) {
      //   this.select.focus();
      // }
    }

    // const { selectedIndex } = this.select;
    // this.optionMaps = this.optionMaps.map((item, index) => ({
    //   ...item,
    //   selected: index === selectedIndex,
    //   highlighted: index === selectedIndex,
    //   hidden: false,
    // }));

    const oldSelectedIndex = this.optionMaps.findIndex((item) => item.selected);
    if (oldSelectedIndex !== newIndex) {
      this.host.dispatchEvent(
        new CustomEvent<InternalChangeEvent>(CHANGE_EVENT_NAME, { bubbles: true, detail: { newIndex } })
      );
    }
  };

  private handleScroll(): void {
    const fakeOptionListNodeHeight = 200;
    if (this.fakeOptionListNode.scrollHeight > fakeOptionListNodeHeight) {
      this.fakeOptionHighlightedNode = getHTMLElements(this.fakeOptionListNode, 'div')[
        this.getHighlightedIndex(this.optionMaps)
      ];

      if (this.fakeOptionHighlightedNode) {
        const { scrollTop } = this.fakeOptionListNode;
        const { offsetTop, offsetHeight } = this.fakeOptionHighlightedNode;
        const scrollBottom = fakeOptionListNodeHeight + scrollTop;
        const elementBottom = offsetTop + offsetHeight;
        if (elementBottom > scrollBottom) {
          this.fakeOptionListNode.scrollTop = elementBottom - fakeOptionListNodeHeight;
        } else if (offsetTop < scrollTop) {
          this.fakeOptionListNode.scrollTop = offsetTop;
        }
      }
    }
  }

  private getHighlightedIndex = (arr: readonly OptionMap[]): number => arr.findIndex((item) => item.highlighted);
}
