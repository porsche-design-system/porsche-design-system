import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../../utils/prefix";
import { Components } from "../../../../index";

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
    | "18"
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
    | "label"
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
  @Prop() color?: Components.PColor["text"] = "porsche-black";

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() ellipsis?: boolean = false;

  /** Wraps the text, even when it has to break a word. */
  @Prop() wrap?: boolean = false;

  /** Sets the text as display: inline. */
  @Prop() inline?: boolean = false;

  render(): JSX.Element {
    const TagType: any = this.tag;

    const textClasses = cx(
      prefix("text"),
      this.type && prefix(`text--${this.type}`),
      this.align !== "left" && prefix(`text--align-${this.align}`),
      this.color && prefix(`text--color-${this.color}`),
      this.inline && prefix("text--inline"),
      this.ellipsis && prefix("text--ellipsis"),
      this.wrap && prefix("text--wrap")
    );

    return (
      <TagType class={textClasses}>
        <slot />
      </TagType>
    );
  }
}
