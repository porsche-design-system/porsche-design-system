import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Divider, DividerProps } from "./Divider"
import { prefix } from "../../../lib"

describe("Divider component", () => {
    const createComponent = (props?: DividerProps): ReactWrapper => {
        return mount(<Divider {...props} />)
    }

    describe("default", () => {
        it("should not have a spacing", () => {
            // Act
            const componentWrapper = createComponent()
            // Assert
            const spacing = componentWrapper.prop("spacing")
            const smallSpacing = componentWrapper.find(`.${prefix("divider--spacing-small")}`)
            const largeSpacing = componentWrapper.find(`.${prefix("divider--spacing-large")}`)
            expect(spacing).toBe(undefined)
            expect(smallSpacing.length).toBe(0)
            expect(largeSpacing.length).toBe(0)
        })
    })

    describe("spacing", () => {
        it("should have small padding if prop is set", () => {
            // Arrange
            const props: DividerProps = {
                spacing: "small"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const spacing = componentWrapper.prop("spacing")
            const smallSpacing = componentWrapper.find(`.${prefix("divider--spacing-small")}`)
            const largeSpacing = componentWrapper.find(`.${prefix("divider--spacing-large")}`)
            expect(spacing).toBe("small")
            expect(smallSpacing.length).toBe(1)
            expect(largeSpacing.length).toBe(0)
        })

        it("should have large padding if prop is set", () => {
            // Arrange
            const props: DividerProps = {
                spacing: "large"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const spacing = componentWrapper.prop("spacing")
            const smallSpacing = componentWrapper.find(`.${prefix("divider--spacing-small")}`)
            const largeSpacing = componentWrapper.find(`.${prefix("divider--spacing-large")}`)
            expect(spacing).toBe("large")
            expect(smallSpacing.length).toBe(0)
            expect(largeSpacing.length).toBe(1)
        })
    })
})
