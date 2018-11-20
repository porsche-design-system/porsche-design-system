import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Grid } from "./Grid"
import { GridChildProps } from "./GridChild"
import { prefix } from "../../../lib"

describe("Grid Child component", () => {
    const createComponent = (props?: GridChildProps): ReactWrapper => {
        return mount(<Grid.Child {...props} />)
    }

    describe("Grid Child size", () => {
        // for (let i = 1; i <= 12; i++) {
        //     return (
        //         it("should have a size modifier with size "+i, () => {
        //             // Arrange
        //             const props: GridChildProps = {
        //                 size: i
        //             }
        //             // Act
        //             const componentWrapper = createComponent(props)
        //             // Assert
        //             const result = componentWrapper.find(`.${prefix("grid__child--size-"+i)}`)
        //             expect(result.length).toBe(1)
        //         })
        //     )
        // }

        it("should have a size modifier with size 1", () => {
            // Arrange
            const props: GridChildProps = {
                size: 1
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-1")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 2", () => {
            // Arrange
            const props: GridChildProps = {
                size: 2
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-2")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 3", () => {
            // Arrange
            const props: GridChildProps = {
                size: 3
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-3")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 4", () => {
            // Arrange
            const props: GridChildProps = {
                size: 4
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-4")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 5", () => {
            // Arrange
            const props: GridChildProps = {
                size: 5
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-5")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 6", () => {
            // Arrange
            const props: GridChildProps = {
                size: 6
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-6")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 7", () => {
            // Arrange
            const props: GridChildProps = {
                size: 7
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-7")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 8", () => {
            // Arrange
            const props: GridChildProps = {
                size: 8
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-8")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 9", () => {
            // Arrange
            const props: GridChildProps = {
                size: 9
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-9")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 10", () => {
            // Arrange
            const props: GridChildProps = {
                size: 10
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-10")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 11", () => {
            // Arrange
            const props: GridChildProps = {
                size: 11
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-11")}`)
            expect(result.length).toBe(1)
        })

        it("should have a size modifier with size 12", () => {
            // Arrange
            const props: GridChildProps = {
                size: 12
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--size-12")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Grid Child offset", () => {
        it("should have a size modifier with offset 1", () => {
            // Arrange
            const props: GridChildProps = {
                offset: 1
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid__child--offset-1")}`)
            expect(result.length).toBe(1)
        })
    })
})
