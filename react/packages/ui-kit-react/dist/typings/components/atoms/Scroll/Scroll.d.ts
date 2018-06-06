/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export interface ScrollProps extends ClassNameProp, ComponentProp {
    /**
     * The scroll direction.
     * @default vertical
     */
    direction?: "vertical"
}
/**
 * Use this component any time you want to provide a scrolling section for long content.
 */
export declare const Scroll: React.StatelessComponent<ScrollProps>
