import * as React from "react"
import cx from "classnames"
import { prefix, Spacing, Icon, Text, ClassNameProp, ComponentProp, getElementType } from "../../../index"
import { ToastList } from "./ToastList"
import { ToastManager } from "./ToastManager"

export interface Toast extends React.StatelessComponent<ToastProps> {
    List: typeof ToastList
    Manager: typeof ToastManager
}

export type ToastType = "info" | "success" | "warning" | "error"

export interface ToastProps extends ClassNameProp, ComponentProp {
    /**
     * Toasts can have different urgencies, signified by different status colors.
     * @default info
     */
    type?: ToastType

    /**
     * The content of the toast.
     */
    message: string | JSX.Element

    /**
     * Callback when the close button of the toast is clicked.
     * @param {ToastProps} data All props of the component.
     */
    onClick?: (data: ToastProps) => void
}

const defaultProps: Partial<ToastProps> = {
    type: "info"
}

const _Toast: React.SFC<ToastProps> & Partial<Toast> = (props) => {
    const { onClick, message, type, className, as, ...rest } = props

    const classes = cx(
        prefix("toast"),
        { [prefix("toast--success")]: type === "success" },
        { [prefix("toast--warn")]: type === "warning" },
        { [prefix("toast--info")]: type === "info" },
        { [prefix("toast--error")]: type === "error" },
        className
    )

    const textClasses = cx(prefix("toast__text"), { [prefix("toast__text--no-close")]: !onClick })

    const closeClasses = cx(prefix("toast__close"))

    const ElementType = getElementType(as, "div")

    const closeIconClasses = cx(prefix("toast__close__icon"))

    const handleClick = (e: React.SyntheticEvent<HTMLElement>) => {
        if (!onClick) {
            return
        }

        onClick(props)
    }

    return (
        <ElementType className={classes} {...rest}>
            <Text className={textClasses} as={"p"}>
                {message}
            </Text>
            {onClick && (
                <button type="button" className={closeClasses} {...{ onClick: handleClick }}>
                    <Icon className={closeIconClasses} name={"cancel"} color={"white"} /> {/* TODO: Hover color */}
                </button>
            )}
        </ElementType>
    )
}

_Toast.defaultProps = defaultProps
_Toast.List = ToastList
_Toast.Manager = ToastManager

/**
 * A small, unintrusive, floating notification that should be closed by clicking or via a timeout.
 */
export const Toast = _Toast
