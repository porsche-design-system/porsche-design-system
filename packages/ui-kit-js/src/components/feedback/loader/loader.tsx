import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils/prefix";

@Component({
  tag: "p-loader",
  styleUrl: "loader.scss",
  shadow: true
})
export class Loader {
  /** Predefined loader sizes. */
  @Prop() size?: "x-small" | "small" | "medium" | "large" = "small";

  /** Adapts the loader color when used on dark background. */
  @Prop() theme?: "light" | "dark" = "light";

  render(): JSX.Element {
    const loaderClasses = cx(
      prefix("loader"),
      { [prefix(`loader--${this.size}`)]: this.size },
      { [prefix("loader--theme-dark")]: this.theme === "dark" }
    );
    const imageClasses = prefix("loader__image");
    const bgClasses = prefix("loader__bg");
    const fgClasses = prefix("loader__fg");

    return (
      <span class={loaderClasses} aria-busy="true">
        <svg class={imageClasses} viewBox="0 0 50 50" role="img">
          <circle class={bgClasses} cx="50%" cy="50%" r="20" />
          <circle class={fgClasses} cx="50%" cy="50%" r="20" />
        </svg>
      </span>
    );
  }
}
