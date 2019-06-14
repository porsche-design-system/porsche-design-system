import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils";

@Component({
  tag: "p-textarea",
  styleUrl: "textarea.scss",
  shadow: true
})
export class Textarea {
  @Prop() name?: string = "";

  @Prop() value?: string = "";

  @Prop() label?: string = "";

  @Prop() disabled?: boolean = false;

  @Prop() error?: boolean = false;

  render(): JSX.Element {
    const textareaClasses = cx(prefix("textarea"));
    const fieldClasses = cx(prefix("textarea__field"), this.error && prefix("textarea__field--error"));
    const labelClasses = cx(prefix("textarea__label"));

    return (
      <label class={textareaClasses}>
        <textarea class={fieldClasses} name={this.name} placeholder={this.label} disabled={this.disabled}>
          {this.value}
        </textarea>
        <p-text class={labelClasses} type="12" color="inherit" tag="span">
          {this.label}
        </p-text>
      </label>
    );
  }
}
