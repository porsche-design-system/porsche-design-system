import * as React from "react"
import { FlexItem } from "./FlexItem"
import { SpacingValue } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export declare type FlexAlignLines = "start" | "center" | "end" | "space-around" | "space-between" | "stretch"
export declare type FlexCrossAxis = "start" | "center" | "end" | "baseline" | "stretch"
export declare type FlexDirection = "column-reverse" | "column" | "row-reverse" | "row"
export declare type FlexMainAxis = "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly"
export declare type FlexWrap = "reverse" | boolean
export interface Flex extends React.StatelessComponent<FlexProps> {
    Item: typeof FlexItem
}
export interface FlexProps extends ClassNameProp, ComponentProp {
    /** Defines how the flex items are aligned along the cross axis. Corresponds to the "alignItems" css property. */
    alignCrossAxis?: FlexCrossAxis
    /**
     * This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "alignMainAxis" aligns individual items along the main axis.
     * Corresponds to the "alignContent" css property.
     */
    alignLines?: FlexAlignLines
    /** Defines how the flex items are aligned along the main axis. Corresponds to the "justifyContent" css property. */
    alignMainAxis?: FlexMainAxis
    /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
    direction?: FlexDirection
    /** Defines the gap between contained children. The value "grid" sets responsive grid spacings that should be used together with Flex.Item. */
    gap?: SpacingValue | "grid"
    /** Defines the flex container display as inline rather than block. */
    inline?: boolean
    /**
     * If set, overflowing elements will wrap to a new line.
     * @default true
     */
    wrap?: FlexWrap
}
/**
 * A flex container component used to create flex box layouts.
 * @see Spacing
 */
export declare const Flex: Flex
