import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Flex, FlexProps } from "./Flex"
import { prefix } from "../../../lib"

describe("Flex component", () => {
    const createComponent = (props?: FlexProps): ReactWrapper => {
        return mount(<Flex {...props} />)
    }

    describe("Flex default", () => {
        it("should have a flex and a flex-wrap modifier", () => {
            // Act
            const componentWrapper = createComponent()
            // Assert
            const resultFlex = componentWrapper.find(`.${prefix("flex")}`)
            const resultWrap = componentWrapper.find(`.${prefix("flex--wrap")}`)
            expect(resultFlex.length).toBe(1)
            expect(resultWrap.length).toBe(1)
        })
    })

    describe("Flex inline", () => {
        it("should have a flex-inline modifier", () => {
            // Arrange
            const props: FlexProps = {
                inline: true
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--inline")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex wrap", () => {
        it("should have a wrap-no modifier", () => {
            // Arrange
            const props: FlexProps = {
                wrap: false
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--wrap-no")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex direction", () => {
        it("should have a direction-column modifier", () => {
            // Arrange
            const props: FlexProps = {
                direction: "column"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--direction-column")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex align main-axis", () => {
        it("should have a center modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignMainAxis: "center"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--main-axis-center")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex align cross-axis", () => {
        it("should have a center modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignCrossAxis: "center"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--cross-axis-center")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex align content", () => {
        it("should have a center modifier", () => {
            // Arrange
            const props: FlexProps = {
                alignContent: "center"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("flex--align-content-center")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Flex gap", () => {
        it("should have a gap modifier of 12", () => {
            // Arrange
            const props: FlexProps = {
                gap: 12
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--12")}`)
            expect(result.length).toBe(1)
        })

        it("should have a gap modifier of a", () => {
            // Arrange
            const props: FlexProps = {
                gap: "a"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("m-nl--a")}`)
            expect(result.length).toBe(1)
        })
    })
})
