import { JSX, Component, Prop, h, Element, Event, EventEmitter, Listen } from '@stencil/core';
import type { BreakpointCustomizable } from '../../../types';
import {
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  improveFocusHandlingForCustomElement,
  mapBreakpointPropToPrefixedClasses,
} from '../../../utils';
import { Theme } from '../../../types';
import { isDisabled, SwitchChangeEvent } from './switch-utils';

@Component({
  tag: 'p-switch',
  styleUrl: 'switch.scss',
  shadow: true,
})
export class Switch {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: BreakpointCustomizable<'left' | 'right'> = 'right';

  /** Show or hide label. For better accessibility it's recommended to show the label. */
  @Prop() public hideLabel?: BreakpointCustomizable<boolean> = false;

  /** Stretches the contents to max available space. */
  @Prop() public stretch?: BreakpointCustomizable<boolean> = false;

  /** Visualize the switch with on/off status. */
  @Prop() public checked?: boolean = false;

  /** Disables the switch. No events will be triggered while disabled state is active. */
  @Prop() public disabled?: boolean = false;

  /** Disables the switch and shows a loading indicator. No events will be triggered while loading state is active. */
  @Prop() public loading?: boolean = false;

  /** To remove the element from tab order. */
  @Prop() public tabbable?: boolean = true;

  /** Adapts the switch color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when checked status is changed. */
  @Event({ bubbles: false }) public switchChange: EventEmitter<SwitchChangeEvent>;

  @Listen('click', { capture: true })
  public handleOnClick(e: MouseEvent): void {
    if (isDisabled(this.disabled, this.loading)) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    improveButtonHandlingForCustomElement(
      this.host,
      () => 'button',
      () => isDisabled(this.disabled, this.loading)
    );
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['label']: true,
      ['checked']: this.checked,
      ['disabled']: this.disabled || this.loading,
      ...mapBreakpointPropToPrefixedClasses('stretch', this.stretch, {
        classSuffixes: ['on', 'off'],
        disablePrefixP: true,
      }),
      ...mapBreakpointPropToPrefixedClasses('label-align', this.alignLabel, { disablePrefixP: true }),
      ...mapBreakpointPropToPrefixedClasses('label', this.hideLabel, {
        classSuffixes: ['hidden', 'visible'],
        disablePrefixP: true,
      }),
      ['theme-dark']: this.theme === 'dark',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <label class={rootClasses}>
        <PrefixedTagNames.pText tag="span" color="inherit" class="text">
          <slot />
        </PrefixedTagNames.pText>
        <button
          type="button"
          class="button"
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          disabled={isDisabled(this.disabled, this.loading)}
          tabindex={this.tabbable ? 0 : -1}
          aria-busy={this.loading ? 'true' : null}
          onClick={this.handleSwitchClick}
        >
          <span class="toggle">
            {this.loading && (
              <PrefixedTagNames.pSpinner class="spinner" size="inherit" theme={this.checked ? 'light' : 'dark'} />
            )}
          </span>
        </button>
      </label>
    );
  }

  private handleSwitchClick = (): void => {
    this.switchChange.emit({ checked: !this.checked });
  };
}
