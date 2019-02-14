import * as React from "react"
import { mount } from "enzyme"
import { Button, ButtonProps } from "./Button"
import { prefix } from "../../../lib"

describe("Button component", () => {
    const createComponent = (props?: ButtonProps) => {
        return mount(<Button {...props} />)
    }

    describe("default", () => {
        it("should have button regular class", () => {
            // Act
            const component = createComponent()
            // Assert
            const result = component.find(`.${prefix("button-regular")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("highlight", () => {
        it("should have a highlight modifier", () => {
            // Arrange
            const props: ButtonProps = {
                type: "highlight"
            }
            // Act
            const component = createComponent(props)
            // Assert
            const result = component.find(`.${prefix("button-regular--highlight")}`)
            expect(result.length).toBe(1)
        })

        it("should have a sales modifier", () => {
            // Arrange
            const props: ButtonProps = {
                type: "sales"
            }
            // Act
            const component = createComponent(props)
            // Assert
            const result = component.find(`.${prefix("button-regular--sales")}`)
            expect(result.length).toBe(1)
        })

        it("should have a ghost modifier", () => {
            // Arrange
            const props: ButtonProps = {
                type: "ghost"
            }
            // Act
            const component = createComponent(props)
            // Assert
            const result = component.find(`.${prefix("button-regular--ghost")}`)
            expect(result.length).toBe(1)
        })

        it("should have a sales-ghost modifier", () => {
            // Arrange
            const props: ButtonProps = {
                type: "sales-ghost"
            }
            // Act
            const component = createComponent(props)
            // Assert
            const result = component.find(`.${prefix("button-regular--sales-ghost")}`)
            expect(result.length).toBe(1)
        })
    })
})
