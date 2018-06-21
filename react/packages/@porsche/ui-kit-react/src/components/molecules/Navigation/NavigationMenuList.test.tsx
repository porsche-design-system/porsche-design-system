import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { NavigationMenuList, NavigationMenuListProps } from "./NavigationMenuList"
import { prefix } from "../../../lib"

describe("NavigationList component", () => {
    const createComponent = (props?: NavigationMenuListProps): ReactWrapper => {
        return mount(<NavigationMenuList {...props} />)
    }

    describe("default", () => {
        it("should have default flyout layout", () => {
            // Arrange
            const props: NavigationMenuListProps = {}

            // Act
            const component = createComponent(props)

            // Assert
            const navigationDefault = component.find(`.${prefix("nav-menu-list--default")}`)
            expect(navigationDefault.length).toBe(1)
            const navigationCategorized = component.find(`.${prefix("nav-menu-list--category")}`)
            expect(navigationCategorized.length).toBe(0)
        })
    })

    describe("submenu", () => {
        it("should render submenu items", () => {
            // Arrange
            const props: NavigationMenuListProps = {
                submenu: [
                    {
                        key: "all",
                        label: "",
                        items: [
                            {
                                key: "1",
                                label: "Item 1",
                                props: {
                                    onClick: () => {
                                        alert("Item 1")
                                    }
                                }
                            }
                        ]
                    }
                ]
            }

            // Act
            const component = createComponent(props)

            // Assert
            const navigationSubmenu = component.find(`li.${prefix("nav-menu-list__item")}`)
            expect(navigationSubmenu.length).toBe(1)
        })
    })

    describe("categorized", () => {
        it("should have categorized flyout layout", () => {
            // Arrange
            const props: NavigationMenuListProps = {
                type: "categorized"
            }

            // Act
            const component = createComponent(props)

            // Assert
            const navigationtype = component.find(`.${prefix("nav-menu-list--category")}`)
            expect(navigationtype.length).toBe(1)
            const navigationDefault = component.find(`.${prefix("nav-menu-list--default")}`)
            expect(navigationDefault.length).toBe(0)
        })
    })

    describe("mobile", () => {
        it("should have mobile layout", () => {
            // Arrange
            const props: NavigationMenuListProps = {
                mobile: true
            }

            // Act
            const component = createComponent(props)

            // Assert
            const navigationtype = component.find(`.${prefix("nav-menu-list--mobile")}`)
            expect(navigationtype.length).toBe(1)
        })

        it("should not have mobile layout", () => {
            // Arrange
            const props: NavigationMenuListProps = {
                mobile: false
            }

            // Act
            const component = createComponent(props)

            // Assert
            const navigationtype = component.find(`.${prefix("nav-menu-list--mobile")}`)
            expect(navigationtype.length).toBe(0)
        })
    })
})
