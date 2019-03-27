import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointCustomizable, mapBreakpointPropToClasses } from "../../../lib"
import { FlexItem } from "./FlexItem"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface Flex extends React.StatelessComponent<FlexProps> {
  Item: typeof FlexItem
}

export interface FlexProps extends ClassNameProp, ComponentProp {
  /**
   * Defines the flex container display as inline rather than block.
   * @default false
   */
  inline?: BreakpointCustomizable<boolean>

  /**
   * If set, overflowing elements will wrap to a new line.
   * @default true
   */
  wrap?: BreakpointCustomizable<"reverse" | boolean>

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
  direction?: BreakpointCustomizable<"column-reverse" | "column" | "row-reverse" | "row">

  /** Defines how the flex items are aligned along the main axis. */
  justifyContent?: BreakpointCustomizable<
    "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly"
  >

  /** Defines how the flex items are aligned along the cross axis. */
  alignItems?: BreakpointCustomizable<"start" | "center" | "end" | "baseline" | "stretch">

  /**
   * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis.
   * Corresponds to the "alignContent" css property.
   */
  alignContent?: BreakpointCustomizable<"start" | "center" | "end" | "space-around" | "space-between" | "stretch">

  /** Defines the gap between contained children. The value "grid" sets responsive grid spacings that should be used together with Flex.Item. */
  gap?: 3 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54 | 60 | "a" | "b" | "c" | "d" | "e" | "f"
}

const defaultProps: Partial<FlexProps> = {
  inline: false
}

const _Flex: React.StatelessComponent<FlexProps> & Partial<Flex> = (props) => {
  const {
    as,
    className,
    children,
    inline,
    wrap,
    direction,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    ...rest
  } = props

  const ElementType: any = getElementType(as, "div")

  const classes = cx(
    mapBreakpointPropToClasses("flex", inline, "--inline", ""),
    mapBreakpointPropToClasses("flex--wrap", wrap, "", "-no"),
    mapBreakpointPropToClasses("flex--direction", direction),
    mapBreakpointPropToClasses("flex--justify-content", justifyContent),
    mapBreakpointPropToClasses("flex--align-items", alignItems),
    mapBreakpointPropToClasses("flex--align-content", alignContent),
    { [prefix(`m-nl--${gap}`)]: gap },
    { [prefix(`m-nr--${gap}`)]: gap },
    className
  )

  let augmentedChildren = children

  if (gap && React.Children.count(children) > 0) {
    augmentedChildren = React.Children.map(children, (child: any) => {
      if (!child) {
        return child
      }

      const { className: childClassName, ...childRest } = child.props

      return React.cloneElement(child, {
        className: cx(childClassName, { [prefix(`pl--${gap}`)]: gap }, { [prefix(`pr--${gap}`)]: gap }),
        ...childRest
      })
    })
  }
  return (
    <ElementType className={classes} {...rest}>
      {augmentedChildren}
    </ElementType>
  )
}

_Flex.defaultProps = defaultProps

_Flex.Item = FlexItem

/**
 * A flex container component used to create flex box layouts.
 * @see Spacing
 * @see Grid
 */
export const Flex = _Flex as Flex
