import * as React from "react"
import cx from "classnames"

import { Flex, Icon } from "../../../index"
import { IconName } from "../../../components/atoms/Icon/Icon"
import { META, getElementType, prefix } from "../../../lib"
import {ComponentMeta, MetaCategorizable} from "../../../types/MetaCategorizable"

export interface ButtonCircleProps {
    /** The html element type to render as. */
    as?: any

    /** Additional CSS classes. */
    className?: string

    /** Custom dom attributes. */
    customAttributes?: {[key: string]: any}

    /**
     * Align "left" puts the icon first, align "right" puts the text first.
     * @default left
     */
    align?: "left" | "right"

    /** Disables the button. No onClick will be triggered. */
    disabled?: boolean

    /** The icon of the button. */
    icon: IconName

    /**
     * Called after a user's click.
     * @param {React.MouseEvent<HTMLButtonElement>} event React's original event.
     * @param {ButtonCircleProps} data All props of the component.
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonCircleProps) => void
}

const defaultProps: Partial<ButtonCircleProps> = {
    align: "left"
}

const _meta: ComponentMeta = {
    name: "ButtonCircle",
    type: META.TYPES.MOLECULE
}

const _ButtonCircle: React.StatelessComponent<ButtonCircleProps> & Partial<MetaCategorizable> = (props) => {
    const {
        as,
        className,
        children,
        customAttributes,
        align,
        disabled,
        icon,
        onClick,
        ...rest
    } = props

    const ElementType = getElementType(as, "button")

    const buttonClasses = cx(
        prefix("button-circle"),
        className
    )

    const iconClasses = cx(
        prefix("button-circle__icon"),
        prefix(`button-circle__icon--${align}`),
        className
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!onClick) {
            return
        }

        if (disabled) {
            e.preventDefault()
            return
        }

        onClick(e, props)
    }

    return (
        <ElementType
            type="button"
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled}
            {...customAttributes}
            {...rest}
        >
            <Flex alignMainAxis="center" className={iconClasses}>
                <Icon size={"small"} name={props.icon} />
            </Flex>
            {children &&
                <div className={`${prefix("button-circle__container")}`}>
                    <Flex
                        direction="column"
                        alignMainAxis="center"
                        alignCrossAxis="baseline"
                        className={`${prefix("button-circle__container__content")}`}
                    >
                        {children}
                    </Flex>
                </div>
            }
        </ElementType>
    )
}

_ButtonCircle.defaultProps = defaultProps

_ButtonCircle._meta = _meta

/**
 * Displays an icon inside a round outlined button. Text can optionally be displayed to the right or left of that button.
 * @see Icon
 */
export const ButtonCircle = _ButtonCircle as React.StatelessComponent<ButtonCircleProps>
