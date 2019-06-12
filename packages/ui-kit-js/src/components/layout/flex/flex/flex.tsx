import { JSX, Component, Host, Prop, h } from "@stencil/core";
import cx from "classnames";
import { BreakpointCustomizable, mapBreakpointPropToClasses, prefix } from "../../../../utils";

@Component({
  tag: "p-flex",
  styleUrl: "flex.scss"
})
export class Flex {
  /**
   * Defines the flex containers content flow if 2 or more containers are siblings of each other.
   */
  @Prop() flow?: BreakpointCustomizable<"block" | "inline" | any> = "block";

  /**
   * If set, overflowing elements will wrap to a new line.
   */
  @Prop() wrap?: BreakpointCustomizable<"nowrap" | "wrap" | "reverse" | any> = "nowrap";

  /**
   * Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right.
   */
  @Prop() direction?: BreakpointCustomizable<"row" | "row-reverse" | "column" | "column-reverse" | any> = "row";

  /**
   * Defines how the flex items are aligned along the main axis.
   */
  @Prop() justifyContent?: BreakpointCustomizable<
    "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly" | any
  > = "start";

  /**
   * Defines how the flex items are aligned along the cross axis.
   */
  @Prop() alignItems?: BreakpointCustomizable<"stretch" | "start" | "end" | "center" | "baseline" | any> = "stretch";

  /**
   * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis.
   * Corresponds to the "alignContent" css property.
   */
  @Prop() alignContent?: BreakpointCustomizable<
    "stretch" | "start" | "end" | "center" | "space-between" | "space-around" | any
  > = "stretch";

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

    const flexClasses = cx(
      prefix("flex"),
      this.flow !== "block" && mapBreakpointPropToClasses("flex-", parseProp(this.flow)),
      this.wrap !== "nowrap" && mapBreakpointPropToClasses("flex--wrap", parseProp(this.wrap)),
      this.direction !== "row" && mapBreakpointPropToClasses("flex--direction", parseProp(this.direction)),
      this.justifyContent !== "start" &&
        mapBreakpointPropToClasses("flex--justify-content", parseProp(this.justifyContent)),
      this.alignItems !== "stretch" && mapBreakpointPropToClasses("flex--align-items", parseProp(this.alignItems)),
      this.alignContent !== "stretch" && mapBreakpointPropToClasses("flex--align-content", parseProp(this.alignContent))
    );

    return <Host class={flexClasses} />;
  }
}
