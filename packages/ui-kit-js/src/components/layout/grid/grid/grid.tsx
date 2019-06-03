import { JSX, Component, Host, Prop, h } from "@stencil/core";
import cx from "classnames";
import { BreakpointCustomizable, mapBreakpointPropToClasses, prefix } from "../../../../utils";

@Component({
  tag: "p-grid",
  styleUrl: "grid.scss"
})
export class Grid {
  /** Defines the direction of the main and cross axis. The default "row" (default) defines the main axis as horizontal left to right. */
  @Prop() direction?: "row" | "row-reverse" | "column" | "column-reverse" = "row";

  /** Defines the direction of the main and cross axis for specific breakpoints, like {"base": "column", "l": "row"}. You always need to provide a base value when doing this. */
  @Prop() directionResponsive?: BreakpointCustomizable<
    "row" | "row-reverse" | "column" | "column-reverse" | any
  > = undefined;

  /** Defines the gap between contained children. The value "normal" (default) sets responsive grid spacings that should be used together with Grid.Child. */
  @Prop() gap?: "normal" | "zero" = "normal";

  /** The gap for specific breakpoints, like {"base": "zero", "l": "normal"}. You always need to provide a base value when doing this. */
  @Prop() gapResponsive?: BreakpointCustomizable<"normal" | "zero" | any> = undefined;

  render(): JSX.Element {
    const gridClasses = cx(
      prefix("grid"),
      mapBreakpointPropToClasses("grid--direction", this.direction),
      mapBreakpointPropToClasses("grid--direction", this.directionResponsive && JSON.parse(this.directionResponsive)),
      mapBreakpointPropToClasses("grid--gap", this.gap),
      mapBreakpointPropToClasses("grid--gap", this.gapResponsive && JSON.parse(this.gapResponsive))
    );

    return <Host class={gridClasses} />;
  }
}
