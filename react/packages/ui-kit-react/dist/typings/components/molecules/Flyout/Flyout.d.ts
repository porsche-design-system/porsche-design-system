/// <reference types="react" />
import * as React from "react"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
export interface FlyoutProps extends ClassNameProp, ComponentProp {
    /**
     * The position of the flyout
     * @default left
     */
    position?: "left" | "right"
}
/**
 * A flyout that can contain arbitrary content.
 * Example usage: Container for the desktop navigation menus.
 */
export declare const Flyout: React.StatelessComponent<FlyoutProps>
