import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Notification, NotificationProps } from "./Notification"
import { prefix } from "../../../lib"

describe("Notification component", () => {
    const createComponent = (props?: NotificationProps): ReactWrapper => {
        return mount(<Notification {...props} />)
    }

    describe("types", () => {
        it("should render notification type common", () => {
            // Arrange
            const props: NotificationProps = {
                type: "common"
            }

            // Act
            const component = createComponent(props)

            // Assert
            const componentType = component.prop("type")
            const typeCommon = component.find(`.${prefix("notification-common")}`)
            expect(componentType).toEqual("common")
            expect(typeCommon.length).toBe(1)
        })

        it("should render notification type cookie", () => {
            // Arrange
            const props: NotificationProps = {
                type: "cookie"
            }

            // Act
            const component = createComponent(props)
            const componentType = component.prop("type")
            const typeCookie = component.find(`.${prefix("notification__item--cookie")}`)

            // Assert
            expect(componentType).toEqual("cookie")
            expect(typeCookie.length).toBe(1)
        })
    })

    describe("states", () => {
        it("should render notification type common with error state", () => {
            // Arrange
            const props: NotificationProps = {
                type: "common",
                state: "error"
            }

            // Act
            const component = createComponent(props)
            const componentType = component.prop("type")
            const typeCommon = component.find(`.${prefix("notification-common")}`)
            const typeCommonError = component.find(`.${prefix("notification-common--error")}`)

            // Assert
            expect(componentType).toEqual("common")
            expect(typeCommon.length).toBe(1)
            expect(typeCommonError.length).toBe(1)
        })
    })

    describe("onClick", () => {
        it("should call the callback", () => {
            // Arrange
            const onClickMock = jest.fn()
            const props: NotificationProps = {
                type: "cookie",
                onClick: onClickMock
            }
            // Act
            const component = createComponent(props)
            component.find(`.${prefix("notification__icon--close")}`).simulate("click")
            // Assert
            expect(onClickMock).toHaveBeenCalled()
        })
    })
})
