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

  /** Custom styled select data-list. */
  @Prop() public variant?: 'native' | 'custom' = 'custom';

  @State() private disabled: boolean;
  @State() private fakeOptionListHidden = true;
  @State() private optionSelected: number;
  @State() private optionHighlighted: number;

  private select: HTMLSelectElement;
  private options: NodeListOf<HTMLOptionElement>;

  public componentWillLoad(): void {
    this.initSelect();
    this.setAriaAttributes();
    this.setState();
    this.bindStateListener();
    this.addSlottedStyles();

    if(this.variant !== 'native') {
      this.setOptionList();
      this.handleSelectEvents();
      this.optionHighlighted = this.optionSelected;
      document.addEventListener('mousedown', this.handleClickOutside.bind(this), false);
    }
  }

  public componentDidUpdate(): void {
    this.setAriaAttributes();
  }

  public componentDidUnload(): void {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this), false);
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
          {this.variant === 'custom' &&
          <span
            class={fakeOptionListClasses}
            role='listbox'
            aria-activedescendant={`option${this.optionSelected}`}
            tabIndex={0}
            aria-expanded={this.fakeOptionListHidden ? 'true' : 'false'}
            aria-labelledby={this.label}
          >
            {
              this.createFakeOptionList()
            }
          </span>
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
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        this.select = this.host.querySelector('select');
        this.setOptionList();
        // this.optionHighlighted = this.optionSelected;
      });
    });
    const config = { childList: true };
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
      if(e.code  === 'ArrowUp') {
        e.preventDefault();
        this.fakeOptionListHidden = false;
        this.cycleFakeOptionList('up');
      }
      if(e.code === 'ArrowDown') {
        e.preventDefault();
        this.fakeOptionListHidden = false;
        this.cycleFakeOptionList('down');
      }
      if(e.code === 'Space') {
        e.preventDefault();
        this.fakeOptionListHidden = this.fakeOptionListHidden === false;
        if(this.fakeOptionListHidden) {
          this.setOptionSelected(this.optionHighlighted);
        }
      }
      if(e.code === 'Enter') {
        this.fakeOptionListHidden = true;
        this.setOptionSelected(this.optionHighlighted);
      }
      if(e.code === 'Escape') {
        this.fakeOptionListHidden = true;
      }
    });
  }

  private setOptionList(): void  {
    this.options = this.select.querySelectorAll('option');
    this.optionSelected = this.select.selectedIndex;
  }

  private setOptionSelected(key: number): void {
    this.options.forEach((item: HTMLOptionElement) => {
      if (item.hasAttribute('selected')) {
        item.removeAttribute('selected');
      }
    });
    this.select.options[key].setAttribute('selected', 'selected');
    this.optionSelected = key;
    this.optionHighlighted = key;
    this.fakeOptionListHidden = true;
    this.select.focus();
  }

  private createFakeOptionList(): any {
    return Array.from(this.options).map((option: HTMLOptionElement, key: any) =>
      <p-text
        id={`option${key}`}
        role='option'
        tag='span'
        color='inherit'
        class={`
          ${prefix('select-wrapper__fake-option')}
          ${(key === this.optionSelected ? prefix('select-wrapper__fake-option--selected') : '')}
          ${this.optionHighlighted === key && prefix('select-wrapper__fake-option--active')}
        `}
        onClick={() => this.setOptionSelected(key)}
      >
        <span>{option.text}</span>
        {key === this.optionSelected &&
          <p-icon class={prefix('select-wrapper__fake-option-icon')} name='check' color='inherit'/>
        }
      </p-text>
    );
  }

  private cycleFakeOptionList(direction: string): void {
    if(direction === 'down') {
      this.optionHighlighted++;
    }
    if(direction === 'up') {
      this.optionHighlighted--;
    }
    if (this.optionHighlighted < 0) {
      this.optionHighlighted = this.options.length-1;
    }
    if (this.optionHighlighted > this.options.length-1) {
      this.optionHighlighted = 0;
    }
  };

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
