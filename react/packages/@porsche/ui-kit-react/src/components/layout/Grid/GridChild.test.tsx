import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Grid } from "./Grid"
import { GridChildProps } from "./GridChild"
import { prefix } from "../../../lib"

describe("Grid Child component", () => {
    const createComponent = (props?: GridChildProps): ReactWrapper => {
        return mount(<Grid.Child size={3} {...props} />)
    }

    describe("Grid Child default", () => {
        it("should have a grid-child modifier and a size modifier with size 3", () => {
            // Act
            const componentWrapper = createComponent()
            // Assert
            const resultChild = componentWrapper.find(`.${prefix("grid__child")}`)
            const resultChildWidth = componentWrapper.find(`.${prefix("grid__child--size-3")}`)
            expect(resultChild.length).toBe(1)
            expect(resultChildWidth.length).toBe(1)
        })
    })

    describe("Grid Child size", () => {
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
    })

    describe("Grid Child offset", () => {
        it("should have a offset modifier with offset 1", () => {
            // Arrange
            const props: GridChildProps = {
                size: 11,
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
