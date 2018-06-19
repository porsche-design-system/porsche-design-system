import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Header, HeaderProps } from "./Header"
import { prefix } from "../../../lib"

describe("Header component", () => {
    const createComponent = (props?: HeaderProps): ReactWrapper => {
        return mount(<Header {...props} />)
    }

    describe("sections", () => {
        it("should not render navigation", () => {
            // Arrange
            const props: HeaderProps = { sections: [] }

            // Act
            const component = createComponent(props)

            // Assert
            const navigation = component.find("_Navigation")
            expect(navigation.length).toBe(0)
        })

        it("should render navigation", () => {
            // Arrange
            const props: HeaderProps = { sections: [{ key: "item1", label: "item1" }] }

            // Act
            const component = createComponent(props)

            // Assert
            const navigation = component.find("_Navigation")
            expect(navigation.length).toBe(1)
        })
    })
})
