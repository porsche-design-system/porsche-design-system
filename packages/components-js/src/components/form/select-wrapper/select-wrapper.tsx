import { JSX, Host, Component, Prop, h, Element, State } from '@stencil/core';
import cx from 'classnames';
import {
  BreakpointCustomizable,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  transitionListener,
  insertSlottedStyles
} from '../../../utils';
import { FormState } from '../../../types';

@Component({
  tag: 'p-select-wrapper',
  styleUrl: 'select-wrapper.scss',
  shadow: true
})
export class SelectWrapper {

  @Element() public host!: HTMLElement;

  /** The label text. */
  @Prop() public label?: string = '';

  /** The description text. */
  @Prop() public description?: string = '';

  /** The validation state. */
  @Prop() public state?: FormState = 'none';

  /** The message styled depending on validation state. */
  @Prop() public message?: string = '';

  /** Show or hide label. For better accessibility it is recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  @State() private disabled: boolean;
  @State() private fakeOptionListHidden = true;
  @State() private optionSelected: number;
  @State() private optionHighlighted: number;
  @State() private optionDisabled: number;
  @State() private isTouch: boolean = SelectWrapper.isTouchDevice();

  private select: HTMLSelectElement;
  private options: NodeListOf<HTMLOptionElement>;
  private optgroups: NodeListOf<HTMLOptGroupElement>;
  private fakeOptionListNode: HTMLDivElement;
  private fakeOptionHighlightedNode: HTMLDivElement;

  private static isTouchDevice(): boolean {
    if (typeof window === 'undefined') {
      return;
    }
    return !!(('ontouchstart' in window) ||
      window.navigator.maxTouchPoints > 0);
  }

  public componentWillLoad(): void {
    this.initSelect();
    this.setAriaAttributes();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();

    if(!this.isTouch) {
      this.observeSelect();
      this.setOptionList();
      this.handleSelectEvents();
      this.optionHighlighted = this.optionSelected;
      if (typeof document === 'undefined') {
        return;
      }
      document.addEventListener('mousedown', this.handleClickOutside.bind(this), false);
    }
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public componentDidUnload(): void {
    if(!this.isTouch && typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClickOutside.bind(this), false);
    }
  }

  public render(): JSX.Element {
    const labelClasses = cx(prefix('select-wrapper__label'));
    const labelTextClasses = cx(
      prefix('select-wrapper__label-text'),
      mapBreakpointPropToPrefixedClasses('select-wrapper__label-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('select-wrapper__label-text--disabled')
    );
    const descriptionTextClasses = cx(
      prefix('select-wrapper__description-text'),
      mapBreakpointPropToPrefixedClasses('select-wrapper__description-text-', this.hideLabel, ['hidden', 'visible']),
      this.disabled && prefix('select-wrapper__description-text--disabled')
    );
    const fakeSelectClasses = cx(
      prefix('select-wrapper__fake-select'),
      this.disabled && prefix('select-wrapper__fake-select--disabled'),
      this.state !== 'none' && prefix(`select-wrapper__fake-select--${this.state}`)
    );
    const fakeOptionListClasses = cx(
      prefix('select-wrapper__fake-option-list'),
      this.fakeOptionListHidden && prefix('select-wrapper__fake-option-list--hidden')
    );
    const iconClasses = cx(
      prefix('select-wrapper__icon'),
      this.disabled && prefix('select-wrapper__icon--disabled'),
      !this.fakeOptionListHidden && prefix('select-wrapper__icon--opened')
    );
    const messageClasses = cx(
      prefix('select-wrapper__message'),
      this.state !== 'none' && prefix(`select-wrapper__message--${this.state}`)
    );

    return (
      <Host>
        <div class={labelClasses}>
          <label>
            {this.isLabelVisible &&
            <p-text class={labelTextClasses} tag='span' color='inherit' onClick={(): void => this.labelClick()}>
              {this.label ? this.label : <span><slot name='label'/></span>}
            </p-text>
            }
            {this.isDescriptionVisible &&
            <p-text class={descriptionTextClasses} tag='span' color='inherit' size='x-small' onClick={(): void => this.labelClick()}>
              {this.description ? this.description : <span><slot name='description'/></span>}
            </p-text>
            }
            <span class={fakeSelectClasses}>
              <p-icon class={iconClasses} name='arrow-head-down' color='inherit'/>
              <slot/>
            </span>
          </label>
          {!this.isTouch &&
          <div
            class={fakeOptionListClasses}
            role='listbox'
            aria-activedescendant={`option-${this.optionSelected}`}
            tabIndex={-1}
            aria-expanded={this.fakeOptionListHidden ? 'false' : 'true'}
            aria-labelledby={this.label}
            ref={el => this.fakeOptionListNode = el}
          >
            {
              this.createFakeOptionList()
            }
          </div>
          }
        </div>
        {this.isMessageVisible &&
        <p-text
          class={messageClasses}
          color='inherit'
          role={this.state === 'error' && 'alert'}
        >
          {this.message ? this.message : <span><slot name='message'/></span>}
        </p-text>
        }
      </Host>
    );
  }

  private get isLabelVisible(): boolean {
    return !!this.label || !!this.host.querySelector('[slot="label"]');
  }

  private get isDescriptionVisible(): boolean {
    return !!this.description || !!this.host.querySelector('[slot="description"]');
  }

  private get isMessageDefined(): boolean {
    return !!this.message || !!this.host.querySelector('[slot="message"]');
  }

  private get isMessageVisible(): boolean {
    return ['success', 'error'].includes(this.state) && this.isMessageDefined;
  }

  private initSelect(): void {
    this.select = this.host.querySelector('select');
  }

  private observeSelect(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        this.setOptionList();
      });
    });
    const config = {childList: true};
    observer.observe(this.select, config);
  }

  private handleClickOutside(e): MouseEvent {
    if(this.host.contains(e.target)) {
      return;
    }
    this.fakeOptionListHidden = true;
  }

  /*
   * This is a workaround to improve accessibility because the select and the label/description/message text are placed in different DOM.
   * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
   * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
   */
  private setAriaAttributes(): void {
    if (this.label && this.message) {
      this.select.setAttribute('aria-label', `${this.label}. ${this.message}`);
    }
    else if (this.label && this.description) {
      this.select.setAttribute('aria-label', `${this.label}. ${this.description}`);
    }
    else if (this.label) {
      this.select.setAttribute('aria-label', this.label);
    }

    if (this.state === 'error') {
      this.select.setAttribute('aria-invalid', 'true');
    } else {
      this.select.removeAttribute('aria-invalid');
    }
  }

  private handleSelectEvents(): void {
    this.select.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.select.focus();
      this.fakeOptionListHidden = this.fakeOptionListHidden === false;
    });
    this.select.addEventListener('keydown', (e: KeyboardEvent) => {
      if(e.key  === 'ArrowUp' || e.key === 'Up') {
        e.preventDefault();
        this.fakeOptionListHidden = false;
        this.cycleFakeOptionList('up');
      }
      if(e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault();
        this.fakeOptionListHidden = false;
        this.cycleFakeOptionList('down');
      }
      if(e.key === 'ArrowLeft' || e.key === 'Left') {
        e.preventDefault();
        this.cycleFakeOptionList('left');
      }
      if(e.key === 'ArrowRight' || e.key === 'Right') {
        e.preventDefault();
        this.cycleFakeOptionList('right');
      }
      if(e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        this.fakeOptionListHidden = this.fakeOptionListHidden === false;
        if(this.fakeOptionListHidden) {
          this.setOptionSelected(this.optionHighlighted);
        }
      }
      if(e.key === 'Enter') {
        e.preventDefault();
        this.fakeOptionListHidden = true;
        this.setOptionSelected(this.optionHighlighted);
      }
      if(e.key === 'Escape' || e.key === 'Esc') {
        this.fakeOptionListHidden = true;
      }
      if(e.key === 'PageUp') {
        e.preventDefault();
        this.optionHighlighted = 0;
        this.handleScroll();
      }
      if(e.key === 'PageDown') {
        e.preventDefault();
        this.optionHighlighted = this.options.length-1;
        this.handleScroll();
      }
    });
  }

  private setOptionList(): void  {
    this.options = this.select.querySelectorAll('option');
    this.optgroups = this.select.querySelectorAll('optgroup');
    this.optionSelected = this.select.selectedIndex;
    this.options.forEach((item: HTMLOptionElement, key: number) => {
      if (item.hasAttribute('disabled')) {
        this.optionDisabled = key;
      }
    });
  }

  private setOptionSelected(key: number): void {
    this.select.selectedIndex = key;
    this.optionSelected = key;
    this.optionHighlighted = key;
    this.fakeOptionListHidden = true;
    this.select.focus();
  }

  private createFakeOptionList(): any {
    return Array.from(this.options).map((option: HTMLOptionElement, key: number) =>
      [
        (this.optgroups.length > 0 && option === option.parentNode.firstChild) &&
        <span class={`${prefix('select-wrapper__fake-optgroup-label')}`}>{option.closest('optgroup').label}</span>,
        <div
          id={`option-${key}`}
          role='option'
          color='inherit'
          class={`
            ${prefix('select-wrapper__fake-option')}
            ${this.optionSelected === key ? prefix('select-wrapper__fake-option--selected') : ''}
            ${this.optionHighlighted === key ? prefix('select-wrapper__fake-option--active') : ''}
            ${this.optionDisabled === key ? prefix('select-wrapper__fake-option--disabled') : ''}
          `}
          onClick={() => this.optionDisabled !== key ? this.setOptionSelected(key) : this.select.focus()}
          aria-selected={this.optionSelected === key && 'true'}
          aria-disabled={this.optionDisabled === key && 'true'}
        >
          <span>{option.text}</span>
          {key === this.optionSelected &&
          <p-icon class={prefix('select-wrapper__fake-option-icon')} name='check' color='inherit'/>
          }
        </div>
      ]
    );
  }

  private cycleFakeOptionList(direction: string): void {
    if(direction === 'down' || direction === 'right') {
      this.optionHighlighted++;
      if (this.optionHighlighted > this.options.length-1 && this.optionDisabled === 0) {
        this.optionHighlighted = 1;
      }
      else if ((this.optionHighlighted === this.optionDisabled && this.optionDisabled === this.options.length-1) || this.optionHighlighted > this.options.length-1) {
        this.optionHighlighted = 0;
      }
      else if (this.optionHighlighted === this.optionDisabled) {
        this.optionHighlighted += 1;
      }
    }

    if(direction === 'up' || direction === 'left') {
      this.optionHighlighted--;
      if (this.optionHighlighted < 0 && this.optionDisabled === this.options.length-1) {
        this.optionHighlighted = this.options.length-2;
      }
      else if ((this.optionHighlighted === this.optionDisabled && this.optionDisabled === 0) || this.optionHighlighted < 0) {
        this.optionHighlighted = this.options.length-1;
      }
      else if (this.optionHighlighted === this.optionDisabled) {
        this.optionHighlighted -= 1;
      }
    }

    if(direction === 'left' || direction === 'right') {
      this.setOptionSelected(this.optionHighlighted);
    }

    this.handleScroll();
  }

  private handleScroll(): void {
    if (this.fakeOptionListNode.scrollHeight > this.fakeOptionListNode.clientHeight) {
      this.fakeOptionHighlightedNode = this.fakeOptionListNode.querySelectorAll('div')[this.optionHighlighted];
      const scrollBottom = this.fakeOptionListNode.clientHeight + this.fakeOptionListNode.scrollTop;
      const elementBottom = this.fakeOptionHighlightedNode.offsetTop + this.fakeOptionHighlightedNode.offsetHeight;
      if (elementBottom > scrollBottom) {
        this.fakeOptionListNode.scrollTop = elementBottom - this.fakeOptionListNode.clientHeight;
      }
      else if (this.fakeOptionHighlightedNode.offsetTop < this.fakeOptionListNode.scrollTop) {
        this.fakeOptionListNode.scrollTop = this.fakeOptionHighlightedNode.offsetTop;
      }
    }
  }

  private setState(): void {
    this.disabled = this.select.disabled;
  }

  private labelClick(): void {
    this.select.focus();
  }

  private bindStateListener(): void {
    transitionListener(this.select, 'border-top-color', () => {
      this.setState();
    });
  }

  private addSlottedStyles(): void {
    const tagName = this.host.tagName.toLowerCase();
    const style = `${tagName} a {
      outline: none transparent;
      color: inherit;
      text-decoration: underline;
      -webkit-transition: outline-color .24s ease, color .24s ease;
      transition: outline-color .24s ease, color .24s ease;
    }
    ${tagName} a:hover {
      color: #d5001c;
    }
    ${tagName} a:focus {
      outline: 2px solid #00d5b9;
      outline-offset: 1px;
    }`;

    insertSlottedStyles(this.host, style);
  }
}
