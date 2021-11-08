import { JSX, Component, Prop, h, Element, Event, EventEmitter, Listen } from '@stencil/core';
import type { AlignLabel, BreakpointCustomizable, Theme } from '../../../types';
import {
  getPrefixedTagNames,
  improveButtonHandlingForCustomElement,
  improveFocusHandlingForCustomElement,
  isDisabledOrLoading,
  mapBreakpointPropToClasses,
} from '../../../utils';

export type SwitchChangeEvent = { checked: boolean };

@Component({
  tag: 'p-switch',
  styleUrl: 'switch.scss',
  shadow: true,
})
export class Switch {
  @Element() public host!: HTMLElement;

  /** Aligns the label. */
  @Prop() public alignLabel?: AlignLabel = 'right';

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
  public onClick(e: MouseEvent): void {
    if (this.isDisabledOrLoading) {
      e.stopPropagation();
    }
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    improveButtonHandlingForCustomElement(
      this.host,
      () => 'button',
      () => this.isDisabledOrLoading
    );
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      ['root--checked']: this.checked,
      ['root--disabled-loading']: this.isDisabledOrLoading,
      ['root--loading']: this.loading,
      ...mapBreakpointPropToClasses('root-', this.stretch, ['stretch-on', 'stretch-off']),
      ...mapBreakpointPropToClasses('root--label-align', this.alignLabel),
      ...mapBreakpointPropToClasses('root--label', this.hideLabel, ['hidden', 'visible']),
      ['root--theme-dark']: this.theme === 'dark',
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <label class={rootClasses}>
        <PrefixedTagNames.pText tag="span" color="inherit" class="text">
          <slot />
        </PrefixedTagNames.pText>
        <button
          type="button"
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          aria-busy={this.loading ? 'true' : null}
          disabled={this.disabled}
          tabindex={this.tabbable ? 0 : -1}
          onClick={this.onSwitchClick}
        >
          <span class="toggle">
            {this.loading && (
              <PrefixedTagNames.pSpinner
                class="spinner"
                size="inherit"
                theme={this.checked ? 'light' : 'dark'}
                aria={{ 'aria-label': 'Loading state' }}
              />
            )}
          </span>
        </button>
      </label>
    );
  }

  private onSwitchClick = (): void => {
    this.switchChange.emit({ checked: !this.checked });
  };

  private get isDisabledOrLoading(): boolean {
    return isDisabledOrLoading(this.disabled, this.loading);
  }
}
