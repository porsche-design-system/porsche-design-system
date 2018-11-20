import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Flex } from "./Flex"
import { FlexItemProps } from "./FlexItem"
import { prefix } from "../../../lib"

describe("Flex Child", () => {
    const createComponent = (props?: FlexItemProps): ReactWrapper => {
        return mount(<Flex.Item {...props} />)
    }

    describe("Flex Child align cross-axis", () => {
        it("should have a cross-axis-start modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                alignCrossAxis: "start"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--cross-axis-start")}`)
            expect(result.length).toBe(1)
        })

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

        it("should have a cross-axis-end modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                alignCrossAxis: "end"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--cross-axis-end")}`)
            expect(result.length).toBe(1)
        })

        it("should have a cross-axis-baseline modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                alignCrossAxis: "baseline"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--cross-axis-baseline")}`)
            expect(result.length).toBe(1)
        })

        it("should have a cross-axis-stretch modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                alignCrossAxis: "stretch"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--cross-axis-stretch")}`)
            expect(result.length).toBe(1)
        })

        it("should have a cross-axis-auto modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                alignCrossAxis: "auto"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--cross-axis-auto")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child width", () => {
        it("should have a width modifier of auto", () => {
            // Arrange
            const props: FlexItemProps = {
                width: "auto"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-auto")}`)
            expect(result.length).toBe(1)
        })

        it("should have a width modifier of 3", () => {
            // Arrange
            const props: FlexItemProps = {
                width: 3
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-3")}`)
            expect(result.length).toBe(1)
        })

        it("should have a width modifier of 4", () => {
            // Arrange
            const props: FlexItemProps = {
                width: 4
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-4")}`)
            expect(result.length).toBe(1)
        })

        it("should have a width modifier of 6", () => {
            // Arrange
            const props: FlexItemProps = {
                width: 6
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-6")}`)
            expect(result.length).toBe(1)
        })

        it("should have a width modifier of 8", () => {
            // Arrange
            const props: FlexItemProps = {
                width: 8
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-8")}`)
            expect(result.length).toBe(1)
        })

        it("should have a width modifier of 9", () => {
            // Arrange
            const props: FlexItemProps = {
                width: 9
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-9")}`)
            expect(result.length).toBe(1)
        })

        it("should have a width modifier of 12", () => {
            // Arrange
            const props: FlexItemProps = {
                width: 12
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--width-12")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child offset", () => {
        it("should have a offset modifier of 0", () => {
            // Arrange
            const props: FlexItemProps = {
                offset: 0
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--offset-0")}`)
            expect(result.length).toBe(1)
        })

        it("should have a offset modifier of 3", () => {
            // Arrange
            const props: FlexItemProps = {
                offset: 3
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--offset-3")}`)
            expect(result.length).toBe(1)
        })

        it("should have a offset modifier of 4", () => {
            // Arrange
            const props: FlexItemProps = {
                offset: 4
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--offset-4")}`)
            expect(result.length).toBe(1)
        })

        it("should have a offset modifier of 6", () => {
            // Arrange
            const props: FlexItemProps = {
                offset: 6
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--offset-6")}`)
            expect(result.length).toBe(1)
        })

        it("should have a offset modifier of 8", () => {
            // Arrange
            const props: FlexItemProps = {
                offset: 8
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--offset-8")}`)
            expect(result.length).toBe(1)
        })

        it("should have a offset modifier of 9", () => {
            // Arrange
            const props: FlexItemProps = {
                offset: 9
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--offset-9")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex Child shrink", () => {
        it("should have a shrink modifier of 0", () => {
            // Arrange
            const props: FlexItemProps = {
                shrink: 0
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--shrink-0")}`)
            expect(result.length).toBe(1)
        })

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
        it("should have a grow modifier of 0", () => {
            // Arrange
            const props: FlexItemProps = {
                grow: 0
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--grow-0")}`)
            expect(result.length).toBe(1)
        })

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
        it("should have a initial modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                flex: "initial"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--initial")}`)
            expect(result.length).toBe(1)
        })

        it("should have a auto modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                flex: "auto"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--auto")}`)
            expect(result.length).toBe(1)
        })

        it("should have a none modifier", () => {
            // Arrange
            const props: FlexItemProps = {
                flex: "none"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex__child--none")}`)
            expect(result.length).toBe(1)
        })

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
