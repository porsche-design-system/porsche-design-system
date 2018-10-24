import * as React from "react"
import cx from "classnames"
import { prefix, Icon, Text, ClassNameProp, ComponentProp, getElementType, Spacing } from "../../../index"
import { ComponentMeta, MetaCategorizable } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"
import { ToastList } from "./ToastList"
import { ToastManager } from "./ToastManager"

export interface Toast extends React.StatelessComponent<ToastProps> {
    List: typeof ToastList
    Manager: typeof ToastManager
}

export type ToastType = "info" | "success" | "warning" | "error"

export interface ToastProps extends ClassNameProp, ComponentProp {
    /**
     * determines the color of the left border
     * @default info
     */
    type?: ToastType
    /**
     * message displayed in the toast
     */
    message: string
    /**
     * callback when close button is clicked
     */
    onClick?: (data: ToastProps) => void
}

const defaultProps: Partial<ToastProps> = {
    type: "info"
}

const _meta: ComponentMeta = {
    name: "Toast",
    type: META.TYPES.ORGANISM
}

const _Toast: React.SFC<ToastProps> & Partial<Toast> & Partial<MetaCategorizable> = (props) => {
    const { onClick, message, type, className, as, ...rest } = props

    const ElementType = getElementType(as, "div")

    const classes = cx(
        prefix("toast"),
        { [prefix("toast--success")]: type === "success" },
        { [prefix("toast--warning")]: type === "warning" },
        { [prefix("toast--info")]: type === "info" },
        { [prefix("toast--error")]: type === "error" },
        className
    )

    const textClasses = cx(prefix("toast__text"), { [prefix("toast__text--no-close")]: !onClick })

    const closeClasses = cx(prefix("toast__close"))

    const handleClick = (e: React.SyntheticEvent<HTMLElement>) => {
        if (!onClick) {
            return
        }

        onClick(props)
    }

    /* Bei vielen verschachtelten Divs immer kurz schauen, ob jedes Element das richtige HTML-Element hat */

    /* Immer Button bei Actions, weil sie native Browserfunktionen mitbringen (z.b. dass es fokussierbar ist und ich es antabben kann)
        React UI-KIT: 2 oder der wichtigsten Buttons mit */
    return (
        <ElementType className={classes} {...rest}>
            <Text className={textClasses} as={"p"}>
                {message}
            </Text>
            {/* TODO: html-button hier einfügen */}
            {onClick && <Icon {...{ onClick: handleClick }} className={closeClasses} name={"cancel"} color={"white"} />}
        </ElementType>
    )
}

_Toast.defaultProps = defaultProps
_Toast._meta = _meta

_Toast.List = ToastList
_Toast.Manager = ToastManager

export const Toast = _Toast
