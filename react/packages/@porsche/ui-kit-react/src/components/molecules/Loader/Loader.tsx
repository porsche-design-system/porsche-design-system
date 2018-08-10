import * as React from "react"
import cx from "classnames"

import { ComponentMeta, MetaCategorizable } from "../../../types/MetaCategorizable"
import { getElementType, META, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface LoaderProps extends ClassNameProp, ComponentProp {
    /**
     * Inverts the color for use on darker backgrounds.
     */
    inverted?: boolean

    /**
     * A loader can have different sizes
     */
    size?: "default" | "small"
}

const _meta: ComponentMeta = {
    name: "Loader",
    type: META.TYPES.MOLECULE
}

const Loader: React.StatelessComponent<LoaderProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, children, inverted, size, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("loader"),
        { [prefix("loader--inverted")]: inverted },
        { [prefix("loader--small")]: size === "small" },
        className
    )

    return (
        <ElementType className={classes} {...rest}>
            <svg className={prefix("loader__fg")} viewBox="25 25 50 50">
                <circle className={prefix("loader__fg__path")} cx="50" cy="50" r="20" />
            </svg>
            <svg className={prefix("loader__bg")} viewBox="25 25 50 50">
                <circle className={prefix("loader__bg__path")} cx="50" cy="50" r="20" />
            </svg>
        </ElementType>
    )
}

Loader._meta = _meta

/**
 * A loader component to show loading states inside single components or across entire modules / pages.
 */
export { Loader }
