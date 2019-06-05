import {JSX, Component, Prop, h} from "@stencil/core";
import cx from "classnames";
import {prefix} from "../../../utils";

@Component({
  tag: "p-input",
  styleUrl: "input.scss",
  shadow: true
})
export class Input {

  @Prop() name?: string = "";

  @Prop() value?: string = "bar";

  @Prop() label?: string = "bar";

  @Prop() type?: "text" | "number" = "text";

  @Prop() icon?: string = "";

  @Prop() disabled?: boolean = false;

  @Prop() error?: boolean = false;

  render(): JSX.Element {
    const inputClasses = cx(prefix("input"));
    const fieldClasses = cx(
      prefix("input__field"),
      { [prefix("input__field--error")]: this.error }
    );
    const iconClasses = cx(prefix("input__icon"));
    const labelClasses = cx(prefix("input__label"));

    return (
      <label class={inputClasses}>
        {
          this.icon && <p-icon class={iconClasses} source={this.icon}/>
        }
        <input class={fieldClasses}
               type={this.type}
               name={this.name}
               value={this.value}
               placeholder={this.label}
               disabled={this.disabled}/>
        <p-text class={labelClasses} type="12" color="inherit">{this.label}</p-text>
      </label>
    );
  }
}
