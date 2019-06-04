import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import {prefix} from "../../../utils";

@Component({
  tag: "p-toggle",
  styleUrl: "toggle.scss",
  shadow: true
})
export class Loader {

  /** Sets the input name */
  @Prop() name: string = "foo";

  @Prop() value: string = "bar";

  /** Disables the toggle button. No events will be triggered while disabled state is active. */
  @Prop() disabled?: boolean = false;

  /** Shows the toggle button checked or unchecked */
  @Prop() checked?: boolean = false;

  /** Adapts the loader color when used on dark background. */
  @Prop() theme?: "light" | "dark" = "light";

  render(): JSX.Element {
    const toggleClasses = cx(prefix("toggle"));
    const checkboxClasses = cx(prefix("toggle__checkbox"));
    const sliderClasses = cx(
      prefix("toggle__slider"),
      { [prefix("toggle__slider--inverted")]: this.theme === "dark" }
    );

    return (
      <label class={toggleClasses}>
        <input class={checkboxClasses}
               name={this.name}
               value={this.value}
               type="checkbox"
               disabled={this.disabled}
               checked={this.checked}/>
        <span class={sliderClasses}>
          <p-icon icon="icon_check.min.svg"/>
          <p-icon icon="icon_minus.min.svg"/>
        </span>
      </label>
    );
  }
}
