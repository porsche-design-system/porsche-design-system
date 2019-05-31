import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../../utils/prefix";

@Component({
  tag: "p-text",
  styleUrl: "text.scss",
  shadow: true
})
export class Text {
  /** The style of the text. */
  @Prop() type?:
    | "copy"
    | "small"
    | "12"
    | "16"
    | "20"
    | "24"
    | "28"
    | "30"
    | "32"
    | "36"
    | "42"
    | "44"
    | "48"
    | "52"
    | "60"
    | "60-thin"
    | "62"
    | "62-thin"
    | "72"
    | "72-thin"
    | "84"
    | "84-thin" = "copy";

  /** Set a custom HTML tag depending of the usage of the text component. */
  @Prop() tag?:
    | "p"
    | "span"
    | "div"
    | "address"
    | "blockquote"
    | "figcaption"
    | "a"
    | "cite"
    | "time"
    | "sup"
    | "sub"
    | "legend" = "p";

  /** The text alignment of the component. */
  @Prop() align?: "left" | "center" | "right" = "left";

  /** Basic text color variations. */
  @Prop() color?: "black" | "light" = "black";

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() ellipsis?: boolean = false;

  /** Sets the text as display: inline. */
  @Prop() inline?: boolean = false;

  /** Wraps the text, even when it has to break a word. */
  @Prop() wrap?: boolean = false;

  /** Adapts the loader color when used on dark background. */
  @Prop() theme?: "light" | "dark" = "light";

  render(): JSX.Element {
    const TagType: any = this.tag;

    const textClasses = cx(
      prefix("text"),
      { [prefix(`text--${this.type}`)]: this.type },
      { [prefix(`text--align-${this.align}`)]: this.align },
      { [prefix(`text--color-${this.color}`)]: this.color },
      { [prefix("text--inline")]: this.inline },
      { [prefix("text--ellipsis")]: this.ellipsis },
      { [prefix("text--wrap")]: this.wrap },
      { [prefix("text--theme-dark")]: this.theme === "dark" }
    );

    return (
      <TagType class={textClasses}>
        <slot />
      </TagType>
    );
  }
}
