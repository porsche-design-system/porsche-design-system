import React from "react"
import { Notification, Spacing } from "@porsche/ui-kit-react"

const NotificationExampleCookie = () => {
    return (
        <Notification type="cookie">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et.{" "}
            <a href="https://www.porsche.com/germany/privacy/cookie-policy/" target="_blank">
                Further information on cookies
            </a>
        </Notification>
    )
}

export default NotificationExampleCookie
