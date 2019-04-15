import * as React from "react"
import cx from "classnames"

import { getElementType, prefix, BreakpointCustomizable, mapBreakpointPropToClasses } from "../../../lib"
import { Spacing } from "../spacing/Spacing"
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
  justifyContent?: BreakpointCustomizable<"start" | "end" | "center" | "space-between" | "space-around" | "space-evenly">

  /** Defines how the flex items are aligned along the cross axis. */
  alignItems?: BreakpointCustomizable<"stretch" | "start" | "end" | "center" | "baseline">

  /**
   * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis.
   * Corresponds to the "alignContent" css property.
   */
  alignContent?: BreakpointCustomizable<"stretch" | "start" | "end" | "center" | "space-between" | "space-around">

  /** Defines the gap between contained children. */
  gap?: 4 | 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | "a" | "b" | "c" | "d" | "e" | "f" | "g"
}

const defaultProps: Partial<FlexProps> = {
  inline: false
}

const _Flex: React.StatelessComponent<FlexProps> & Partial<Flex> = (props) => {
  const { as, className, children, inline, wrap, direction, justifyContent, alignItems, alignContent, gap, ...rest } = props

  const ElementType: any = getElementType(as, "div")

  const classes = cx(
    mapBreakpointPropToClasses("flex", inline, "--inline", ""),
    mapBreakpointPropToClasses("flex--wrap", wrap, "", "-no"),
    mapBreakpointPropToClasses("flex--direction", direction),
    mapBreakpointPropToClasses("flex--justify-content", justifyContent),
    mapBreakpointPropToClasses("flex--align-items", alignItems),
    mapBreakpointPropToClasses("flex--align-content", alignContent),
    className
  )

  let augmentedChildren = children

  if (gap && React.Children.count(children) > 0) {
    augmentedChildren = React.Children.map(children, (child: any) => {
      if (!child) {
        return child
      }

      const { className: childClassName, ...childRest } = child.props

      return (
        <Spacing paddingLeft={gap} paddingRight={gap}>
          {React.cloneElement(child, {
            className: cx(childClassName),
            ...childRest
          })}
        </Spacing>
      )
    })
  }
  return (
    <React.Fragment>
      {gap ? (
        <Spacing marginNegativeLeft={gap} marginNegativeRight={gap}>
          <ElementType className={classes} {...rest}>
            {augmentedChildren}
          </ElementType>
        </Spacing>
      ) : (
        <ElementType className={classes} {...rest}>
          {augmentedChildren}
        </ElementType>
      )}
    </React.Fragment>
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
