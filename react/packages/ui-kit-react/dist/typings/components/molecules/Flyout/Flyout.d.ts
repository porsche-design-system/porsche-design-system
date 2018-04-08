/// <reference types="react" />
import * as React from "react";
export interface FlyoutProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /**
     * The position of the flyout
     * @default left
     */
    position?: "left" | "right";
}
/**
 * A flyout that can contain arbitrary content.
 * Example usage: Container for the desktop navigation menus.
 */
export declare const Flyout: React.StatelessComponent<FlyoutProps>;
