import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Button } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface NotificationProps extends ClassNameProp, ComponentProp {
    /**
     * The display type of the notification.
     * @default default
     */
    type?: "default" | "error" | "cookie"
}

const defaultProps: Partial<NotificationProps> = {
    type: "default"
}

const _meta: ComponentMeta = {
    name: "Notification",
    type: META.TYPES.ORGANISM
}

const _Notification: React.StatelessComponent<NotificationProps> &
    Partial<Notification> &
    Partial<MetaCategorizable> = (props) => {
    const { as, className, children, type, ...rest } = props

    const ElementType = getElementType(as, "article")

    let notificationClasses
    let notificationItemClasses
    let notificationTextClasses

    notificationClasses = cx(prefix("notification"), className)

    notificationItemClasses = cx(
        prefix("notification__item"),
        { [prefix("notification__item--error")]: type === "error" },
        { [prefix("notification__item--cookie")]: type === "cookie" },
        className
    )

    notificationTextClasses = cx(
        prefix("notification__text"),
        { [prefix("notification__text--error")]: type === "error" },
        { [prefix("notification__text--cookie")]: type === "cookie" },
        className
    )

    return (
        <ElementType type={type} className={notificationClasses} {...rest}>
            <div className={notificationItemClasses}>
                <div className={prefix("notification__wrapper")}>
                    <p className={notificationTextClasses}>{children}</p>
                    <Button icon="bin" />
                </div>
            </div>
        </ElementType>
    )
}

_Notification.defaultProps = defaultProps

_Notification._meta = _meta

/**
 * The default Porsche notification message.
 */
export const Notification = _Notification as Notification
