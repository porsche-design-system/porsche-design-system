import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export type SpacingValue = 0 | 3 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54 | 60 | "a" | "b" | "c" | "d" | "e" | "f"

export interface SpacingProps extends ClassNameProp, ComponentProp {
    /**
     * Set this to true if you always want to create a wrapper, even for single childs.
     * This is useful if the child element does not support className, or for dynamic children.
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

const _Spacing: React.StatelessComponent<SpacingProps> = (props) => {
    const {
        as,
        className,
        children,
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
        { [prefix(`m--${margin}`)]: margin },
        { [prefix(`mt--${marginTop}`)]: marginTop },
        { [prefix(`ml--${marginLeft}`)]: marginLeft },
        { [prefix(`mb--${marginBottom}`)]: marginBottom },
        { [prefix(`mr--${marginRight}`)]: marginRight },
        { [prefix(`p--${padding}`)]: padding },
        { [prefix(`pt--${paddingTop}`)]: paddingTop },
        { [prefix(`pl--${paddingLeft}`)]: paddingLeft },
        { [prefix(`pb--${paddingBottom}`)]: paddingBottom },
        { [prefix(`pr--${paddingRight}`)]: paddingRight },
        className
    )

    if (React.Children.count(children) === 1 && !wrap) {
        // One child => append spacing classes and unhandled props to child
        return React.Children.map(children, (child: any) => {
            if (!child) {
                return child
            }

            if (!child.type) {
                return (
                    <ElementType className={classes} {...rest}>
                        {children}
                    </ElementType>
                )
            }

            const { className: childrenClassName, ...childRest } = child.props

            return React.cloneElement(child, {
                className: cx(childrenClassName, classes),
                ...childRest
            })
        })[0]
    } else {
        // Multiple childs => render wrapper element with spacing classes and unhandled props
        return (
            <ElementType className={classes} {...rest}>
                {children}
            </ElementType>
        )
    }
}

/**
 * A component to add margins and paddings to components.
 * If this component has only one child, those classes are added directly to the child using the className prop to avoid unnecessary wrapper divs.
 * This only works if the child component supports className (which it totally should anyway) and if the number of children isn't dynamic and doesn't change.
 * If this is not the case, set the "wrap" property to manually create a wrapper div.
 * @see Flex
 */
export const Spacing = _Spacing as React.StatelessComponent<SpacingProps>
