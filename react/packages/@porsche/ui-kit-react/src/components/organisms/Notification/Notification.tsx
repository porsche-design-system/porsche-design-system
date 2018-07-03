import * as React from "react"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, getElementType, prefix } from "../../../lib"
import { Icon, ContentWrapper } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface NotificationProps extends ClassNameProp, ComponentProp {
    /**
     * The display type of the notification.
     */
    type?: "common" | "cookie"

    /**
     * A notifcation can have an error state.
     */
    error?: boolean

    /**
     * The title of the notification
     */
    title?: string

    /**
     * Close the notification
     */
    onClick?: () => void
}

const defaultProps: Partial<NotificationProps> = {
    type: "common"
}

const _meta: ComponentMeta = {
    name: "Notification",
    type: META.TYPES.ORGANISM
}

const _Notification: React.StatelessComponent<NotificationProps> & Partial<MetaCategorizable> = (props) => {
    const { as, className, title, children, type, error, onClick, ...rest } = props

    const ElementType = getElementType(as, "article")

    let notificationClasses
    let notificationItemClasses
    let notificationTitleClasses
    let notificationTextClasses

    if (type === "common") {
        notificationClasses = cx(
            prefix("notification-common"),
            { [prefix("notification-common--error")]: error },
            className
        )

        notificationItemClasses = cx(
            prefix("notification-common__item"),
            { [prefix("notification-common__item--error")]: error },
            className
        )

        notificationTextClasses = cx(
            prefix("notification-common__text"),
            { [prefix("notification-common__text--error")]: error },
            className
        )

        notificationTitleClasses = cx(
            prefix("notification-common__title"),
            { [prefix("notification-common__title--error")]: error },
            className
        )
    } else {
        notificationClasses = cx(prefix("notification"), className)

        notificationItemClasses = cx(
            prefix("notification__item"),
            { [prefix("notification__item--error")]: error },
            { [prefix("notification__item--cookie")]: type === "cookie" },
            className
        )

        notificationTitleClasses = cx(
            prefix("notification__title"),
            { [prefix("notification__title--error")]: error },
            className
        )

        notificationTextClasses = cx(
            prefix("notification__text"),
            { [prefix("notification__text--error")]: error },
            { [prefix("notification__text--cookie")]: type === "cookie" },
            className
        )
    }

    const handleOnClick = () => {
        if (props.onClick) {
            props.onClick()
        }
    }

    return (
        <ElementType className={notificationClasses} {...rest}>
            <div className={notificationItemClasses}>
                {type === "common" ? (
                    <React.Fragment>
                        <h6 className={notificationTitleClasses}>{title}</h6>
                        <div className={notificationTextClasses}>{children}</div>
                    </React.Fragment>
                ) : (
                    <ContentWrapper>
                        <div className={prefix("notification__wrapper")}>
                            {title && <h6 className={notificationTitleClasses}>{title}</h6>}
                            <div className={notificationTextClasses}>{children}</div>
                            <button
                                type="button"
                                onClick={handleOnClick}
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
