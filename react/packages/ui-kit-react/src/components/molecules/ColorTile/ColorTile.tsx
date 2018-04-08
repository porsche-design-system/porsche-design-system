import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"

import { Flex, Spacing, Text } from "../../../index"

export interface ColorTileProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /** The primary color of the tile. */
    color: string

    /** The secondary color of the tile, displayed along the primary color. */
    secondaryColor?: string

    /** The size of the color tile. */
    circle?: boolean

    /** The size of the color tile. */
    size?: "default" | "huge"
}

const _meta: ComponentMeta = {
    name: "ColorTile",
    type: META.TYPES.MOLECULE
}

const _ColorTile: React.StatelessComponent<ColorTileProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        color,
        circle,
        secondaryColor,
        size,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        {[prefix("color-tile--huge")]: size === "huge"},
        className
    )

    const previewContainerClasses = cx(
        prefix("color-tile__preview-container"),
        {[prefix("color-tile__preview-container--circle")]: circle}
    )

    const previewClasses = cx(
        prefix("color-tile__preview"),
        {[prefix("color-tile__preview--split")]: secondaryColor},
        {[prefix("color-tile__preview--full")]: !secondaryColor}
    )

    const labelClasses = cx(
        prefix("color-tile__label")
    )

    return (
        <ElementType
            className={classes}
            {...customAttributes}
            {...rest}
        >
            <Flex alignCrossAxis="center">
                <span className={previewContainerClasses}>
                    <span className={previewClasses} style={{ backgroundColor: color }}/>
                    {secondaryColor &&
                    <span className={previewClasses} style={{ backgroundColor: secondaryColor }}/>
                    }
                </span>
                <span className={labelClasses}>
                    {children}
                </span>
            </Flex>
        </ElementType>
    )
}

_ColorTile._meta = _meta

/**
 * A tile that can display one or two colors as a rectangle or circle in various sizes.
 * Example usage: Display interior and exterior colors and color combinations.
 */
export const ColorTile = _ColorTile as React.StatelessComponent<ColorTileProps>
