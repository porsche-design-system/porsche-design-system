/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export interface DividerProps extends ClassNameProp, ComponentProp {
    /**
     * Adds predefined top and bottom spacing for more consistent layouting.
     * If this doesn't fit your purpose you can always customize spacings using the Spacing component.
     */
    spacing?: "none" | "small" | "large"
}
/**
 * A very basic divider.
 * @see Spacing
 */
export declare const Divider: React.StatelessComponent<DividerProps>
