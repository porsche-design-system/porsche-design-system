import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"
import { LoaderMask } from "./LoaderMask"

export interface Loader extends React.StatelessComponent<LoaderProps> {
    Mask: typeof LoaderMask
}

export interface LoaderProps extends ClassNameProp, ComponentProp {
    /**
     * Inverts the color for use on darker backgrounds.
     */
    inverted?: boolean

    /**
     * A loader can have different sizes
     */
    size?: "x-small" | "small" | "medium" | "large" | "x-large"
}

const _Loader: React.StatelessComponent<LoaderProps> & Partial<Loader> = (props) => {
    const { as, className, children, inverted, size, ...rest } = props

    const ElementType = getElementType(as, "span")

    const classes = cx(
        prefix("loader"),
        { [prefix(`loader--${size}`)]: size },
        { [prefix("loader--theme-inverted")]: inverted },
        className
    )

    return (
        <ElementType className={classes} {...rest} aria-busy="true">
            <svg className={prefix("loader__image")} viewBox="0 0 50 50" role="img">
                <circle className={prefix("loader__bg")} cx="50%" cy="50%" r="20" />
                <circle className={prefix("loader__fg")} cx="50%" cy="50%" r="20" />
            </svg>
        </ElementType>
    )
}

_Loader.Mask = LoaderMask

/**
 * A loader component to show loading states inside single components or across entire modules / pages.
 * @see Button
 */
export const Loader = _Loader as Loader
