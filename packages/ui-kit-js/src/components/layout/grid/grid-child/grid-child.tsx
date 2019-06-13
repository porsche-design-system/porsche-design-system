import { JSX, Component, Host, Prop, h } from "@stencil/core";
import cx from "classnames";
import { BreakpointCustomizable, mapBreakpointPropToClasses, prefix } from "../../../../utils";

@Component({
  tag: "p-grid-child",
  styleUrl: "grid-child.scss"
})
export class GridChild {
  /** The size of the column. Can be between 1 and 12. Also defines the size of the column for specific breakpoints, like {"base": 6, "l": 3}. You always need to provide a base value when doing this. */
  @Prop() size?: BreakpointCustomizable<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | any> = 1;

  /** The offset of the column. Can be between 0 and 11. Also defines the offset of the column for specific breakpoints, like {"base": 6, "l": 3}. You always need to provide a base value when doing this. */
  @Prop() offset?: BreakpointCustomizable<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | any> = 0;

  render(): JSX.Element {
    const isJsonString = (str: string) => {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    };

    const parseProp = (prop: string) => {
      return prop && isJsonString(prop) === true ? JSON.parse(prop) : prop;
    };

    const gridChildClasses = cx(
      prefix("grid-child"),
      mapBreakpointPropToClasses("grid-child--size", parseProp(this.size)),
      this.offset !== 0 && mapBreakpointPropToClasses("grid-child--offset", parseProp(this.offset))
    );

    return <Host class={gridChildClasses} />;
  }
}
