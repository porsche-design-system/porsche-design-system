import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils";

@Component({
  tag: "p-toggle",
  styleUrl: "toggle.scss",
  shadow: true
})
export class Toggle {
  /** Sets the input name */
  @Prop() name: string = "foo";

  @Prop() value: string = "bar";

  /** Disables the toggle button. No events will be triggered while disabled state is active. */
  @Prop() disabled?: boolean = false;

  /** Shows the toggle button checked or unchecked */
  @Prop() checked?: boolean = false;

  render(): JSX.Element {
    const toggleClasses = cx(prefix("toggle"));
    const checkboxClasses = cx(prefix("toggle__checkbox"));
    const sliderClasses = cx(prefix("toggle__slider"));
    const iconInactiveClasses = cx(prefix("toggle__icon"), prefix("toggle__icon--inactive"));
    const iconActiveClasses = cx(prefix("toggle__icon"), prefix("toggle__icon--active"));

    return (
      <label class={toggleClasses}>
        <input
          class={checkboxClasses}
          name={this.name}
          value={this.value}
          type="checkbox"
          disabled={this.disabled}
          checked={this.checked}
        />
        <span class={sliderClasses}>
          <p-icon class={iconInactiveClasses} source="minus" />
          <p-icon class={iconActiveClasses} source="check" />
        </span>
      </label>
    );
  }
}
