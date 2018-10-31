import React from "react"
import { CookieNotification } from "@porsche/ui-kit-react"

const CookieNotificationExample = () => {
    return (
        <CookieNotification onClick={() => {}}>
            <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et.{" "}
                <a
                    href="https://www.porsche.com/germany/privacy/cookie-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Further information on cookies
                </a>
            </p>
        </CookieNotification>
    )
}

export default CookieNotificationExample
