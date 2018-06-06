/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export declare type SpacingValue =
    | 0
    | 3
    | 6
    | 12
    | 18
    | 24
    | 30
    | 36
    | 42
    | 48
    | 54
    | 60
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
export interface SpacingProps extends ClassNameProp, ComponentProp {
    /**
     * Set this to true if you always want to create a wrapper, even for single childs.
     * This is useful if the child element does not support className.
     */
    wrap?: boolean
    margin?: SpacingValue | "auto"
    marginBottom?: SpacingValue | "auto"
    marginLeft?: SpacingValue | "auto"
    marginRight?: SpacingValue | "auto"
    marginTop?: SpacingValue | "auto"
    padding?: SpacingValue
    paddingBottom?: SpacingValue
    paddingLeft?: SpacingValue
    paddingRight?: SpacingValue
    paddingTop?: SpacingValue
}
/**
 * A component to add margins and paddings to components.
 * If it has only one child, those classes are added directly to the child to avoid unnecessary wrapper divs.
 * @see Flex
 */
export declare const Spacing: React.StatelessComponent<SpacingProps>
