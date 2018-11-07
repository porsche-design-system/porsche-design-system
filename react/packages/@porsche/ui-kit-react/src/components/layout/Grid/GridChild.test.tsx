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
        it("should have a size modifier with size 1", () => {
            // Arrange
            const props: GridChildProps = {
                size: 1
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const gridSize = componentWrapper.find(`.${prefix("grid__child--size-1")}`)
            expect(gridSize.length).toBe(1)
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
            const gridOffset = componentWrapper.find(`.${prefix("grid__child--offset-1")}`)
            expect(gridOffset.length).toBe(1)
        })
    })
})
