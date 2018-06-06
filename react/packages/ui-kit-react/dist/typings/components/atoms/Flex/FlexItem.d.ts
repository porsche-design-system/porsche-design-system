/// <reference types="react" />
import * as React from "react"
import { BreakpointValues } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { FlexCrossAxis } from "./Flex"
export interface FlexItemProps extends ClassNameProp, ComponentProp {
    /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
    alignCrossAxis?: FlexCrossAxis
    /** The width of the column. Can be between 1 and 12, or "auto". You can also supply values for specific breakpoints, like {base: "6", l: "3"}. You always need to provide a base value when doing this. */
    width?: string | number | BreakpointValues<string | number>
    /** The offset of the column. Can be between 0 and 11. You can also supply values for specific breakpoints, like {base: "6", l: "3"}. You always need to provide a base value when doing this. */
    offset?: number | BreakpointValues<number>
}
/**
 * A child of a flex container.
 */
export declare const FlexItem: React.StatelessComponent<FlexItemProps>
