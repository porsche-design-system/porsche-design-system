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
    type?: "common" | "cookie"

    role?: "error"
}

const defaultProps: Partial<NotificationProps> = {
    type: "common"
}

const _meta: ComponentMeta = {
    name: "Notification",
    type: META.TYPES.ORGANISM
}

const isCommonNotification = (type: string | undefined): boolean => {
    return type === "common"
}

const _Notification: React.StatelessComponent<NotificationProps> &
    Partial<Notification> &
    Partial<MetaCategorizable> = (props) => {
    const { as, className, children, type, role, ...rest } = props

    const ElementType = getElementType(as, "article")

    let notificationClasses
    let notificationItemClasses
    let notificationTextClasses

    if (isCommonNotification(type)) {
        notificationClasses = cx(prefix("notification-common"), className)

        notificationItemClasses = cx(
            prefix("notification-common__item"),
            { [prefix("notification-common__item--error")]: role === "error" },
            className
        )

        notificationTextClasses = cx(
            prefix("notification-common__text"),
            { [prefix("notification-common__text--error")]: role === "error" },
            className
        )
    } else {
        notificationClasses = cx(prefix("notification"), className)

        notificationItemClasses = cx(
            prefix("notification__item"),
            { [prefix("notification__item--error")]: role === "error" },
            { [prefix("notification__item--cookie")]: type === "cookie" },
            className
        )

        notificationTextClasses = cx(
            prefix("notification__text"),
            { [prefix("notification__text--error")]: role === "error" },
            { [prefix("notification__text--cookie")]: type === "cookie" },
            className
        )
    }

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
