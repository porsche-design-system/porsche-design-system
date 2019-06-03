import { JSX, Component, Host, Prop, h } from "@stencil/core";
import cx from "classnames";
import { BreakpointCustomizable, mapBreakpointPropToClasses, prefix } from "../../../../utils";

@Component({
  tag: "p-grid-child",
  styleUrl: "grid-child.scss"
})
export class GridChild {
  /** The size of the column. Can be between 1 and 12. */
  @Prop() size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 1;

  /** The size of the column for specific breakpoints, like {"base": 6, "l": 3}. You always need to provide a base value when doing this. */
  @Prop() sizeResponsive?: BreakpointCustomizable<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | any> = undefined;

  /** The offset of the column. Can be between 0 and 11. */
  @Prop() offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 = 0;

  /** The offset of the column for specific breakpoints, like {"base": 6, "l": 3}. You always need to provide a base value when doing this. */
  @Prop() offsetResponsive?: BreakpointCustomizable<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | any> = undefined;

  render(): JSX.Element {
    const gridChildClasses = cx(
      prefix("grid-child"),
      mapBreakpointPropToClasses("grid-child--size", this.size),
      mapBreakpointPropToClasses("grid-child--size", this.sizeResponsive && JSON.parse(this.sizeResponsive)),
      mapBreakpointPropToClasses("grid-child--offset", this.offset),
      mapBreakpointPropToClasses("grid-child--offset", this.offsetResponsive && JSON.parse(this.offsetResponsive))
    );

    return <Host class={gridChildClasses} />;
  }
}
