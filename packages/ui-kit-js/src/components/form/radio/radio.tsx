import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils";

@Component({
  tag: "p-radio",
  styleUrl: "radio.scss",
  shadow: true
})
export class Radio {
  @Prop() name?: string = "";

  @Prop() value?: string = "";

  @Prop() disabled?: boolean = false;

  @Prop() checked?: boolean = false;

  @Prop() error?: boolean = false;

  render(): JSX.Element {
    const radioClasses = cx(prefix("radio"));
    const fieldClasses = cx(prefix("radio__field"));
    const iconClasses = cx(prefix("radio__icon"), this.error && prefix("radio__icon--error"));
    const labelClasses = cx(prefix("radio__label"), this.error && prefix("radio__label--error"));

    return (
      <label class={radioClasses}>
        <input
          class={fieldClasses}
          type="radio"
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
        />
        <span class={iconClasses} />
        <p-text class={labelClasses} tag="span" color="inherit">
          <slot />
        </p-text>
      </label>
    );
  }
}
