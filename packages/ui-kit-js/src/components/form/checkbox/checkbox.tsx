import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils";

@Component({
  tag: "p-checkbox",
  styleUrl: "checkbox.scss",
  shadow: true
})
export class Checkbox {
  @Prop() name?: string = "";

  @Prop() value?: string = "bar";

  @Prop() label?: string = "bar";

  @Prop() disabled?: boolean = false;

  @Prop() checked?: boolean = false;

  @Prop() error?: boolean = false;

  render(): JSX.Element {
    const checkboxClasses = cx(prefix("checkbox"));
    const fieldClasses = cx(prefix("checkbox__field"));
    const iconClasses = cx(prefix("checkbox__icon"));
    const labelClasses = cx(prefix("checkbox__label"));

    return (
      <label class={checkboxClasses}>
        <input
          class={fieldClasses}
          type="checkbox"
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
        />
        <span class={iconClasses}>
          <p-icon source="icon_check" />
        </span>
        <p-text class={labelClasses}>
          <slot />
        </p-text>
      </label>
    );
  }
}
