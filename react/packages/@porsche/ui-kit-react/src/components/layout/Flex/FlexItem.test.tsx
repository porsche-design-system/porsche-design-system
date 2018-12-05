import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Flex } from "./Flex"
import { FlexItemProps } from "./FlexItem"
import { prefix } from "../../../lib"

describe("Flex Child", () => {
    const createComponent = (props?: FlexItemProps): ReactWrapper => {
        return mount(<Flex.Item {...props} />)
    }

    describe("Flex Child default", () => {
        it("should have a flex-child modifier", () => {
            // Act
            const componentWrapper = createComponent()
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child align cross-axis", () => {
        it("should have a cross-axis-center modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                alignCrossAxis: "center"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--cross-axis-center")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child width", () => {
        it("should have a width modifier of one-quarter", () => {
            // Arrange
            const props: FlexItemProps = {
                width: "one-quarter"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-one-quarter")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child offset", () => {
        it("should have a offset modifier of one-quarter", () => {
            // Arrange
            const props: FlexItemProps = {
                offset: "one-quarter"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--offset-one-quarter")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child shrink", () => {
        it("should have a shrink modifier of 1", () => {
            // Arrange
            const props: FlexItemProps = {
                shrink: 1
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--shrink-1")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child grow", () => {
        it("should have a grow modifier of 1", () => {
            // Arrange
            const props: FlexItemProps = {
                grow: 1
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--grow-1")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child flex", () => {
        it("should have a equal modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                flex: "equal"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--equal")}`)
            expect(result.length).toBe(1)
        })
    })
})
