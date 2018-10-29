import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { CookieNotification, CookieNotificationProps } from "./CookieNotification"
import { prefix } from "../../../lib"

describe("Notification component", () => {
    const createComponent = (props?: CookieNotificationProps): ReactWrapper => {
        return mount(<CookieNotification {...props} />)
    }

    describe("rendering", () => {
        it("should render the cookie notification", () => {
            // Arrange
            const props: CookieNotificationProps = {
                message: "cookie disclaimer"
            }

            // Act
            const component = createComponent(props)
            const cookieNotification = component.find(`.${prefix("cookie-notification")}`)

            // Assert
            expect(cookieNotification.length).toBe(1)
        })
    })

    describe("onClick", () => {
        it("should call the callback", () => {
            // Arrange
            const onClickMock = jest.fn()
            const props: CookieNotificationProps = {
                message: "cookie disclaimer",
                onClick: onClickMock
            }

            // Act
            const component = createComponent(props)
            component.find(`.${prefix("cookie-notification__icon--close")}`).simulate("click")

            // Assert
            expect(onClickMock).toHaveBeenCalled()
        })
    })
})
