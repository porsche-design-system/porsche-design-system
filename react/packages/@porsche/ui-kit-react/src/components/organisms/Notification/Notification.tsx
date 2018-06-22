import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Icon, ContentWrapper } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface NotificationProps extends ClassNameProp, ComponentProp {
    /**
     * The display type of the notification.
     * @default default
     */
    type?: "common" | "cookie"

    /**
     * Defines the state of the notification
     */
    state?: "error"

    /**
     * The title of the notification
     */
    title?: string

    /**
     * close the notification
     */
    onClose?: () => void
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

const _Notification: React.StatelessComponent<NotificationProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, title, children, type, state, onClose, ...rest } = props

    const ElementType = getElementType(as, "article")

    let notificationClasses
    let notificationItemClasses
    let notificationTitleClasses
    let notificationTextClasses

    if (isCommonNotification(type)) {
        notificationClasses = cx(
            prefix("notification-common"),
            { [prefix("notification-common--error")]: state === "error" },
            className
        )

        notificationItemClasses = cx(
            prefix("notification-common__item"),
            { [prefix("notification-common__item--error")]: state === "error" },
            className
        )

        notificationTextClasses = cx(
            prefix("notification-common__text"),
            { [prefix("notification-common__text--error")]: state === "error" },
            className
        )

        notificationTitleClasses = cx(
            prefix("notification-common__title"),
            { [prefix("notification-common__title--error")]: state === "error" },
            className
        )
    } else {
        notificationClasses = cx(prefix("notification"), className)

        notificationItemClasses = cx(
            prefix("notification__item"),
            { [prefix("notification__item--error")]: state === "error" },
            { [prefix("notification__item--cookie")]: type === "cookie" },
            className
        )

        notificationTitleClasses = cx(
            prefix("notification__title"),
            { [prefix("notification__title--error")]: state === "error" },
            className
        )

        notificationTextClasses = cx(
            prefix("notification__text"),
            { [prefix("notification__text--error")]: state === "error" },
            { [prefix("notification__text--cookie")]: type === "cookie" },
            className
        )
    }

    const handleCloseClick = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    return (
        <ElementType className={notificationClasses} {...rest}>
            <div className={notificationItemClasses}>
                {type === "common" ? (
                    <React.Fragment>
                        <h6 className={notificationTitleClasses}>{title}</h6>
                        <p className={notificationTextClasses}>{children}</p>
                    </React.Fragment>
                ) : (
                    <ContentWrapper>
                        <div className={prefix("notification__wrapper")}>
                            {title && <h6 className={notificationTitleClasses}>{title}</h6>}
                            <p className={notificationTextClasses}>{children}</p>
                            <button
                                type="button"
                                onClick={handleCloseClick}
                                className={cx(
                                    prefix("notification__icon--close"),
                                    prefix("icon-close"),
                                    prefix("icon-close--notification")
                                )}
                            >
                                <Icon name="cancel" />
                            </button>
                        </div>
                    </ContentWrapper>
                )}
            </div>
        </ElementType>
    )
}

_Notification.defaultProps = defaultProps

_Notification._meta = _meta

/**
 * The default Porsche notification message.
 */
export const Notification = _Notification as React.StatelessComponent<NotificationProps>
