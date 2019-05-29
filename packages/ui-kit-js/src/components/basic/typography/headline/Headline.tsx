import { JSX, Component, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../../utils/prefix";

@Component({
  tag: "p-headline",
  styleUrl: "headline.scss",
  shadow: true
})
export class Headline {
  /** The style of the text. */
  @Prop() type?: "large-title" | "headline-1" | "headline-2" | "headline-3" | "headline-4" | "headline-5" = "headline-1";

  /** Headline level/hierarchy. */
  @Prop() level?: "1" | "2" | "3" | "4" | "5" | "6" = "1";

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
    const TagType: any = "h" + this.level;

    const headlineClasses = cx(
      { [prefix(`headline--${this.type}`)]: this.type },
      { [prefix(`headline--align-${this.align}`)]: this.align },
      { [prefix(`headline--color-${this.color}`)]: this.color },
      { [prefix("headline--inline")]: this.inline },
      { [prefix("headline--ellipsis")]: this.ellipsis },
      { [prefix("headline--wrap")]: this.wrap },
      { [prefix("headline--theme-dark")]: this.theme === "dark" }
    );

    return (
      <TagType class={headlineClasses}>
        <slot />
      </TagType>
    );
  }
}
