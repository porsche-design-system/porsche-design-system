import {JSX, Component, Prop, h, Event, EventEmitter} from "@stencil/core";
import cx from "classnames";

@Component({
  tag: "p-button-regular",
  styleUrl: "button-regular.scss",
  shadow: true
})
export class ButtonRegular {

  /** Label */
  @Prop() label: string = '';

  /** Some optional disabled state */
  @Prop() disabled?: boolean = false;

  /** Button on dark background */
  @Prop() inverted?: boolean = false;

  /** A button can be displayed with a smaller size */
  @Prop() small?: boolean = false;

  /** Disables the button and shows a loading indicator. No onClicked event will be triggered. */
  @Prop() loading?: boolean = false;

  /** HTML tag */
  @Prop() tag?: "button" | "a" | string = "button";

  /** The display type of the button. */
  @Prop() type?: "highlight" | "ghost";

   /** Specifies the HTML Type of the button. If undefined, nothing is set. */
  @Prop() role?: "button" | "submit" | "reset" | undefined = undefined;

  /** The icon of the button. */
  @Prop() icon?: string = "icon_arrow-right-hair.min.svg";

  /** React test property */
  @Prop() ref?: any = '';

  /** Called after a user's click. */
  @Event() onClicked: EventEmitter;

  private clickHandler(): void {
    this.onClicked.emit();
  }

  private loaderNotInverted(): boolean {
    return !this.ruleTypeGhost();
  };
  private ruleTypeGhost() {
    return this.type === "ghost" && !this.inverted;
  };

  render(): JSX.Element {

    const buttonClasses = cx(
      "button-regular",
      {["button-regular--highlight"]: this.type === "highlight"},
      {["button-regular--ghost"]: this.type === "ghost"},
      {["button-regular--loading"]: this.loading},
      {["button-regular--small"]: this.small},
      {["button-regular--theme-inverted"]: this.inverted }
    );
    const iconClasses = cx("button-regular__icon");
    const loaderClasses = cx("button-regular__icon-loader");
    const labelClasses = cx("button-regular__label");

    if (this.tag === "button") {
      return (
        <button onClick={() => this.clickHandler()} type={this.role} class={buttonClasses} disabled={this.disabled || this.loading}>
          {this.loading ? (
            <p-loader size="x-small" class={loaderClasses} inverted={this.loaderNotInverted()} />
          ) : (
            <p-icon class={iconClasses} icon={this.icon} />
          )}
          <span class={labelClasses}>{this.label}</span>
        </button>
      )
    } else if (this.tag === "a") {
      return (
        <a onClick={() => this.clickHandler()} href="#" class={buttonClasses} aria-disabled={this.disabled || this.loading}>
          {this.loading ? (
            <p-loader size="x-small" class={loaderClasses} inverted={this.loaderNotInverted()} />
          ) : (
            <p-icon class={iconClasses} icon={this.icon} />
          )}
          <span class={labelClasses}>{this.label}</span>
        </a>
      )
    }
  }
}
