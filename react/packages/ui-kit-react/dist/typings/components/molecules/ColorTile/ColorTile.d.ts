/// <reference types="react" />
import * as React from "react";
export interface ColorTileProps {
    /** The html element type to render as. */
    as?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Custom dom attributes. */
    customAttributes?: {
        [key: string]: any;
    };
    /** The primary color of the tile. */
    color: string;
    /** The secondary color of the tile, displayed along the primary color. */
    secondaryColor?: string;
    /** The size of the color tile. */
    circle?: boolean;
    /** The size of the color tile. */
    size?: "default" | "huge";
}
/**
 * A tile that can display one or two colors as a rectangle or circle in various sizes.
 * Example usage: Display interior and exterior colors and color combinations.
 */
export declare const ColorTile: React.StatelessComponent<ColorTileProps>;
