import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointCustomizable, mapBreakpointPropToClasses } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface FlexItemProps extends ClassNameProp, ComponentProp {
  /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
  alignSelf?: BreakpointCustomizable<"auto" | "start" | "end" | "center" | "baseline" | "stretch">

  /** The width of the flex item. You can also supply values for specific breakpoints, like {base: "full", l: "one-quarter"}. You always need to provide a base value when doing this. */
  width?: BreakpointCustomizable<"auto" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters" | "full">

  /** The offset of the column. You can also supply values for specific breakpoints, like {base: "none", l: "one-quarter"}. You always need to provide a base value when doing this. */
  offset?: BreakpointCustomizable<"none" | "one-quarter" | "one-third" | "half" | "two-thirds" | "three-quarters">

  /** The ability to allow/disallow the flex child to shrink. */
  shrink?: BreakpointCustomizable<0 | 1>

  /** The ability to allow/disallow the flex child to grow. */
  grow?: BreakpointCustomizable<0 | 1>

  /** The shorthand property for the combined definition of "shrink", "grow" and "basis" */
  flex?: BreakpointCustomizable<"initial" | "auto" | "none" | "equal">
}

const _FlexItem: React.StatelessComponent<FlexItemProps> = (props) => {
  const { as, className, children, alignSelf, width, offset, shrink, grow, flex, ...rest } = props

  const ElementType: any = getElementType(as, "div")

  const classes = cx(
    prefix("flex__child"),
    mapBreakpointPropToClasses("flex__child--align-self", alignSelf),
    mapBreakpointPropToClasses("flex__child--width", width),
    mapBreakpointPropToClasses("flex__child--offset", offset),
    mapBreakpointPropToClasses("flex__child--shrink", shrink),
    mapBreakpointPropToClasses("flex__child--grow", grow),
    mapBreakpointPropToClasses("flex__child-", flex),
    className
  )

  return (
    <ElementType className={classes} {...rest}>
      {children}
    </ElementType>
  )
}

/**
 * A child of a flex container.
 */
export const FlexItem = _FlexItem as React.StatelessComponent<FlexItemProps>
