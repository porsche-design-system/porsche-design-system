import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { NavigationMenuList } from "./NavigationMenuList"
import { NavigationMobile, NavigationMobileState } from "./NavigationMobile"
import { NavigationSection, Navigation, NavigationProps } from "./Navigation"
import { prefix } from "../../../lib"

describe("NavigationMobile component", () => {
    const createComponent = (props?: NavigationProps): ReactWrapper => {
        return mount(<NavigationMobile {...props} />)
    }

    describe("state", () => {
        it("should set open state", () => {
            // Arrange
            const props: NavigationProps = {
                sections: [
                    {
                        key: "1",
                        label: "Titel1",
                        counter: 6,
                        props: {
                            href: "#"
                        },
                        menu: (
                            <NavigationMenuList
                                submenu={[
                                    {
                                        key: "all",
                                        label: "",
                                        items: [
                                            {
                                                key: "1",
                                                label: "Item 1",
                                                component: "a",
                                                props: {
                                                    href: "#"
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        )
                    }
                ]
            }

            // Act
            const component = createComponent(props)
            component.find(`.${prefix("nav-mobile__item")}`).simulate("click")

            // Assert
            const navigationMobile = component.find(
                `.${prefix("nav-mobile__overlay")}.${prefix("nav-mobile__overlay--active")}`
            )
            expect(navigationMobile.length).toBe(1)
        })
    })

    describe("section", () => {
        it("should render section", () => {
            // Arrange
            const props: NavigationProps = {
                sections: [
                    {
                        key: "1",
                        label: "Titel1",
                        counter: 6,
                        props: {
                            href: "#"
                        },
                        menu: (
                            <NavigationMenuList
                                submenu={[
                                    {
                                        key: "all",
                                        label: "",
                                        items: [
                                            {
                                                key: "1",
                                                label: "Item 1",
                                                component: "a",
                                                props: {
                                                    href: "#"
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        )
                    }
                ]
            }

            // Act
            const component = createComponent(props)

            // Assert
            const navigationMobile = component.find(`.${prefix("nav-mobile__row")} > .${prefix("nav-mobile__overlay")}`)
            expect(navigationMobile.length).toBe(1)
        })
    })
})
