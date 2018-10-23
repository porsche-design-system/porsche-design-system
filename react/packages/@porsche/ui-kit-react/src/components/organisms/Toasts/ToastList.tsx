import * as React from "react"
import { ClassNameProp, ComponentProp, Spacing } from "../../../index"
import { ToastProps, Toast } from "./Toast"
import cx from "classnames"
import { prefix, getElementType } from "../../../index"
import { CSSTransition, TransitionGroup } from "react-transition-group"

interface QueuableToast extends Pick<ToastProps, "type" | "message"> {
    id: string
}

export interface ToastListProps extends ClassNameProp, ComponentProp {
    /**
     * An array of the toasts that should be displayed.
     * Inserted or deleted toasts are automatically animated based on the provided id.
     * New toasts should be appended at the end of the array and will be displayed at the bottom.
     */
    toasts: QueuableToast[]

    /**
     * Callback when close button of a toast is clicked.
     */
    onCloseClick: (toastId: string) => void
}

const _ToastList: React.SFC<ToastListProps> = (props) => {
    const { as, children, toasts, className, onCloseClick, ...rest } = props

    if (toasts === []) {
        return null
    }

    const ElementType = getElementType(as, "div")

    const transitionClasses = cx(prefix("toast-list--fade"))

    const classes = cx(prefix("toast-list"), className)

    const handleToastCancel = (data: ToastProps) => {
        // tslint:disable-next-line
        const toastId = (data as any)["id"]
        onCloseClick(toastId)
    }

    const elements = toasts.map((item) => {
        return (
            <CSSTransition timeout={500} classNames={transitionClasses} key={item.id}>
                <Spacing marginTop={6}>
                    <Toast message={item.message} type={item.type} {...{ id: item.id }} onClick={handleToastCancel} />
                </Spacing>
            </CSSTransition>
        )
    })

    return (
        <TransitionGroup component={ElementType} className={classes} {...rest}>
            {elements}
        </TransitionGroup>
    )
}

export const ToastList = _ToastList as React.StatelessComponent<ToastListProps>
