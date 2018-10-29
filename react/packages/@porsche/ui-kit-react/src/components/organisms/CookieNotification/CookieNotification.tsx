import * as React from "react"
import cx from "classnames"

import { getElementType, prefix } from "../../../lib"
import { Icon, ContentWrapper, Text } from "../../../index"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

export interface CookieNotificationProps extends ClassNameProp, ComponentProp {
    /**
     * Called when the user clicks the close button of the notification
     */
    onClick: () => void
}

/**
 * The default Porsche notification message.
 */
export const CookieNotification: React.StatelessComponent<CookieNotificationProps> = (props) => {
    const { as, className, children, onClick, ...rest } = props

    const ElementType = getElementType(as, "article")

    const classes = cx(prefix("cookie-notification"), className)
    const containerClasses = cx(prefix("cookie-notification__container"))
    const textClasses = cx(prefix("cookie-notification__text"))
    const closeClasses = cx(prefix("cookie-notification__close"))
    const closeIconClasses = cx(prefix("cookie-notification__close__icon"))

    return (
        <ElementType className={classes} {...rest}>
            <ContentWrapper>
                <div className={containerClasses}>
                    <Text className={textClasses} as={"h6"}>
                        {children}
                    </Text>
                    <button type="button" className={closeClasses} {...{ onClick }}>
                        <Icon className={closeIconClasses} name={"cancel"} color={"white"} /> {/* TODO: Hover color */}
                    </button>
                </div>
            </ContentWrapper>
        </ElementType>
    )
}
