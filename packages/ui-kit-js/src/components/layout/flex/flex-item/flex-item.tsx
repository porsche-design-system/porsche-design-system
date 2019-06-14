import { JSX, Element, Component, Host, Prop, h } from "@stencil/core";
import cx from "classnames";
import { BreakpointCustomizable, mapBreakpointPropToClasses, prefix } from "../../../../utils";

@Component({
  tag: "p-flex-item",
  styleUrl: "flex-item.scss"
})
export class FlexItem {
  @Element() host: HTMLDivElement;
  /**
   * The width of the flex item. You can also supply values for specific breakpoints, like {base: "full", l: "one-quarter"}. You always need to provide a base value when doing this.
   */
  @Prop() width?: BreakpointCustomizable<
    "auto" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters" | "full"
  > &
    string = "auto";

  /**
   * The offset of the column. You can also supply values for specific breakpoints, like {base: "none", l: "one-quarter"}. You always need to provide a base value when doing this.
   */

  @Prop() offset?: BreakpointCustomizable<
    "none" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters"
  > &
    string = "none";
  /**
   * Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property.
   */
  @Prop() alignSelf?: BreakpointCustomizable<"auto" | "start" | "end" | "center" | "baseline" | "stretch"> & string =
    "auto";

  /**
   * The ability to allow/disallow the flex child to grow.
   */
  @Prop() grow?: BreakpointCustomizable<"0" | "1"> & string = "0";

  /**
   * The ability to allow/disallow the flex child to shrink.
   */
  @Prop() shrink?: BreakpointCustomizable<"1" | "0"> & string = "1";

  /**
   * The shorthand property for the combined definition of "shrink", "grow" and "basis"
   */
  @Prop() flex?: BreakpointCustomizable<"initial" | "auto" | "none" | "equal"> & string = "initial";

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

    const flexItemClasses = cx(
      prefix("flex__item"),
      this.width !== "auto" && mapBreakpointPropToClasses("flex__item--width", parseProp(this.width)),
      this.offset !== "none" && mapBreakpointPropToClasses("flex__item--offset", parseProp(this.offset)),
      this.alignSelf !== "auto" && mapBreakpointPropToClasses("flex__item--align-self", parseProp(this.alignSelf)),
      this.grow !== "0" && mapBreakpointPropToClasses("flex__item--grow", parseProp(this.grow)),
      this.shrink !== "1" && mapBreakpointPropToClasses("flex__item--shrink", parseProp(this.shrink)),
      this.flex !== "initial" && mapBreakpointPropToClasses("flex__item-", parseProp(this.flex))
    );

    return <Host class={flexItemClasses} />;
  }
}
