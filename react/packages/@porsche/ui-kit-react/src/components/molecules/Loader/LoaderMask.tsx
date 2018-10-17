import * as React from "react"
import cx from "classnames"
import { Loader, Flex } from "../../../index"
import { getElementType, META, prefix } from "../../../lib"
import { ComponentMeta, MetaCategorizable } from "../../../types/MetaCategorizable"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface LoaderMaskProps extends ClassNameProp, ComponentProp {
    /**
     * Displays the loader and backdrop when true, plainly renders all children when false.
     * @default false
     */
    loading?: boolean
}

const _meta: ComponentMeta = {
    parent: "Loader",
    name: "LoaderMask",
    type: META.TYPES.MOLECULE
}

const _LoaderMask: React.StatelessComponent<LoaderMaskProps> & Partial<MetaCategorizable> = (props) => {
    const { as, children, className, loading, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(prefix("loader-mask"), className)
    const maskClasses = cx(prefix("loader-mask__mask"), className)

    if (!loading) {
        return <React.Fragment>{children}</React.Fragment>
    }

    return (
        <ElementType className={classes} {...rest}>
            {children}

            <Flex className={maskClasses} alignCrossAxis="center" alignMainAxis="center">
                <Loader />
            </Flex>
        </ElementType>
    )
}

_LoaderMask._meta = _meta

/**
 * Displays the loader around its children using a translucent backdrop.
 * If it is not loading, the children will be rendered without any wrapper components.
 */
export const LoaderMask = _LoaderMask as React.StatelessComponent<LoaderMaskProps>
