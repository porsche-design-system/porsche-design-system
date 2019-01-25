import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Tab, TabProps } from "./Tab"
import { prefix } from "../../../lib"

describe("Tab component", () => {
    const createComponent = (props: TabProps): ReactWrapper => {
        return mount(<Tab {...props} />)
    }

    describe("default", () => {
        it("should have a default alignment", () => {
            // Arrange
            const props: TabProps = {
                panes: []
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const alignment = componentWrapper.prop("alignment")
            const flexAlignment = componentWrapper.find(`.${prefix("flex--main-axis-center")}`)
            expect(alignment).toEqual("center")
            expect(flexAlignment.length).toBe(1)
        })
    })

    describe("alignment", () => {
        it("should map the given alignment to flex alignment", () => {
            // Arrange
            const props: TabProps = {
                alignment: "left",
                panes: []
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const flexAlignment = componentWrapper.find(`.${prefix("flex--main-axis-start")}`)
            expect(flexAlignment.length).toBe(1)
        })
    })

    describe("mini", () => {
        it("should not have any marked appropriate menu items", () => {
            // Arrange
            const props: TabProps = {
                panes: []
            }
            // Act
            const componentWrapper = createComponent(props)
            const menuItems = componentWrapper.find(`.${prefix("tab__menu-item--mini")}`)
            expect(menuItems.length).toBe(0)
        })
        it("should mark the menu item appropriately", () => {
            // Arrange
            const props: TabProps = {
                mini: true,
                panes: [
                    { menuItem: "item1", key: "item1", active: false },
                    { menuItem: "item2", key: "item2", active: true }
                ]
            }
            // Act
            const componentWrapper = createComponent(props)
            const menuItems = componentWrapper.find(`.${prefix("tab__menu-item--mini")}`)
            expect(menuItems.length).toBe(2)
        })
    })

    describe("active state", () => {
        it("should mark the active menu item", () => {
            // Arrange
            const props: TabProps = {
                panes: [
                    { menuItem: "item1", key: "item1", active: false },
                    { menuItem: "item2", key: "item2", active: true }
                ]
            }
            // Act
            const componentWrapper = createComponent(props)
            const menuItems = componentWrapper.find(`.${prefix("tab__menu-item--active")}`)
            // Assert
            expect(menuItems.length).toBe(1)
            expect(menuItems.get(0).key).toEqual("item2")
        })

        it("should mark the active content area", () => {
            // Arrange
            const props: TabProps = {
                mini: true,
                panes: [
                    { menuItem: "item1", key: "item1", active: true, render: () => "item1" },
                    { menuItem: "item2", key: "item2", active: false, render: () => "item2" }
                ]
            }
            // Act
            const componentWrapper = createComponent(props)
            const activeContent = componentWrapper.find(`.${prefix("tab__content--active")}`)
            // Assert
            expect(activeContent.length).toBe(1)
            expect(activeContent.get(0).key).toEqual("item1")
        })
    })

    describe("onClick", () => {
        it("should call the callback", () => {
            // Arrange
            const onClickMock = jest.fn()
            const props: TabProps = {
                mini: true,
                panes: [{ menuItem: "item1", key: "item1", active: true, render: () => "item1", onClick: onClickMock }]
            }
            // Act
            const componentWrapper = createComponent(props)
            componentWrapper.find(`.${prefix("tab__menu-item")}`).simulate("click")
            // Assert
            expect(onClickMock).toHaveBeenCalled()
        })
    })

    describe("divider", () => {
        it("should be rendered by default", () => {
            // Arrange
            const props: TabProps = {
                panes: []
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const divider = componentWrapper.find(`.${prefix("divider")}`)
            expect(divider.length).toBe(1)
        })

        it("should not be rendered", () => {
            // Arrange
            const props: TabProps = {
                divider: false,
                panes: []
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const divider = componentWrapper.find(`.${prefix("divider")}`)
            expect(divider.length).toBe(0)
        })
    })
})
