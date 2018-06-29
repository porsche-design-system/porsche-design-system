import * as React from "react"
import { mount } from "enzyme"
import { Button, ButtonProps } from "./Button"
import { prefix } from "../../../lib"

describe("Button component", () => {
    const createComponent = (props?: ButtonProps) => {
        return mount(<Button {...props} />)
    }

    describe("default", () => {
        it("should not have active modifier", () => {
            // Act
            const component = createComponent()
            // Assert
            const result = component.find(`.${prefix("button-primary--active")}`)
            expect(result.length).toBe(0)
        })
    })

    describe("active", () => {
        it("should have an active modifier", () => {
            // Arrange
            const props: ButtonProps = {
                active: true
            }
            // Act
            const component = createComponent(props)
            // Assert
            const result = component.find(`.${prefix("button-primary--active")}`)
            expect(result.length).toBe(1)
        })

        it("should not have active modifier", () => {
            // Arrange
            const props: ButtonProps = {
                active: false
            }
            // Act
            const component = createComponent(props)
            // Assert
            const result = component.find(`.${prefix("button-primary--active")}`)
            expect(result.length).toBe(0)
        })
    })
})
