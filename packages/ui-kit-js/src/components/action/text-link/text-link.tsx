import { JSX, Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils/prefix";
import { TextProps } from "../../../index";

@Component({
  tag: "p-text-link",
  styleUrl: "text-link.scss",
  shadow: true
})
export class TextLink {
  /** Target url to where the component should link to. */
  @Prop({ reflect: true }) href: string = "#";

  /** Target attribute where the link should be opened. */
  @Prop({ reflect: true }) target?: "self" | "blank" | "parent" | "top" = "self";

  /** Special download attribute to open native Browser download dialog if target url points to a downloadable file. */
  @Prop({ reflect: true }) download?: boolean = false;

  /** The style of the text. */
  @Prop() type?: TextProps["type"] = "copy";

  /** The icon shown next to the label. */
  @Prop() icon?: string = "arrow-right-hair";

  /** Adapts the color when used on dark background. */
  @Prop() theme?: "light" | "dark" = "light";

  /** Emitted when the link is clicked. */
  @Event() pClick!: EventEmitter<void>;

  private onClick(event): void {
    this.pClick.emit(event);
  }

  render(): JSX.Element {
    const textLinkClasses = cx(prefix("text-link"), { [prefix("text-link--theme-dark")]: this.theme === "dark" });
    const iconClasses = cx({ [prefix(`text-link__icon--${this.type}`)]: this.type });

    return (
      <a
        onClick={(e) => this.onClick(e)}
        href={this.href}
        target={"_" + this.target}
        download={this.download}
        class={textLinkClasses}
      >
        <p-icon source={this.icon} size="inherit" color="inherit" class={iconClasses} />
        <p-text type={this.type} color="inherit" tag="span">
          <slot />
        </p-text>
      </a>
    );
  }
}
