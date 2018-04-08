import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"

export type SpacingValue = 0 | 3 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54 | 60

export interface SpacingProps {
    /** The html element type to render as. */
    as?: string

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /**
     * Set this to true if you always want to create a wrapper, even for single childs.
     * This is useful if the child element does not support className.
     */
    wrap?: boolean

    margin?: SpacingValue | "auto"
    marginBottom?: SpacingValue | "auto"
    marginLeft?: SpacingValue | "auto"
    marginRight?: SpacingValue | "auto"
    marginTop?: SpacingValue | "auto"

    padding?: SpacingValue
    paddingBottom?: SpacingValue
    paddingLeft?: SpacingValue
    paddingRight?: SpacingValue
    paddingTop?: SpacingValue
}

const _meta: ComponentMeta = {
    name: "Spacing",
    type: META.TYPES.ATOM
}

const _Spacing: React.StatelessComponent<SpacingProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        wrap,
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        padding,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        ...rest
    } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        {[prefix(`m--${margin}`)]: margin},
        {[prefix(`mt--${marginTop}`)]: marginTop},
        {[prefix(`ml--${marginLeft}`)]: marginLeft},
        {[prefix(`mb--${marginBottom}`)]: marginBottom},
        {[prefix(`mr--${marginRight}`)]: marginRight},
        {[prefix(`p--${padding}`)]: padding},
        {[prefix(`pt--${paddingTop}`)]: paddingTop},
        {[prefix(`pl--${paddingLeft}`)]: paddingLeft},
        {[prefix(`pb--${paddingBottom}`)]: paddingBottom},
        {[prefix(`pr--${paddingRight}`)]: paddingRight},
        className
    )

    if (React.Children.count(children) === 1 && !wrap) {
        // One child => append spacing classes and unhandled props to child
        return React.Children.map(children, (child: any) => {
            if (!child) {
                return child
            }

            const {
                className,
                ...childRest
            } = child.props

            return (
                React.cloneElement(child, {
                    className: cx(
                        className,
                        classes
                    ),
                    ...childRest
                })
            )
        })[0]
    } else {
        // Multiple childs => render wrapper element with spacing classes and unhandled props
        return (
            <ElementType
                className={classes}
                {...customAttributes}
                {...rest}
            >
                {children}
            </ElementType>
        )
    }
}

_Spacing._meta = _meta

/**
 * A component to add margins and paddings to components.
 * If it has only one child, those classes are added directly to the child to avoid unnecessary wrapper divs.
 */
export const Spacing = _Spacing as React.StatelessComponent<SpacingProps>
