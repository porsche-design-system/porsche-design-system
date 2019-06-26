import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils/prefix";

@Component({
  tag: "p-spinner",
  styleUrl: "spinner.scss",
  shadow: true
})
export class Loader {
  /** Predefined spinner sizes. */
  @Prop() size?: "x-small" | "small" | "medium" | "large" = "small";

  /** Adapts the spinner color when used on dark background. */
  @Prop() theme?: "light" | "dark" = "light";

  render(): JSX.Element {
    const spinnerClasses = cx(
      prefix("spinner"),
      this.size && prefix(`spinner--${this.size}`),
      this.theme === "dark" && prefix("spinner--theme-dark")
    );
    const imageClasses = prefix("spinner__image");
    const bgClasses = prefix("spinner__bg");
    const fgClasses = prefix("spinner__fg");

    return (
      <span class={spinnerClasses} aria-busy="true">
        <svg class={imageClasses} viewBox="0 0 50 50" role="img">
          <circle class={bgClasses} cx="50%" cy="50%" r="20" />
          <circle class={fgClasses} cx="50%" cy="50%" r="20" />
        </svg>
      </span>
    );
  }
}
