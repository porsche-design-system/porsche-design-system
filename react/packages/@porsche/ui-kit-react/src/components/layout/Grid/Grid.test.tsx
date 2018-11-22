import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Grid, GridProps } from "./Grid"
import { prefix } from "../../../lib"

describe("Grid component", () => {
    const createComponent = (props?: GridProps): ReactWrapper => {
        return mount(<Grid {...props} />)
    }

    describe("Grid default", () => {
        // Act
        const componentWrapper = createComponent()
        // Assert
        const result = componentWrapper.find(`.${prefix("grid")}`)
        expect(result.length).toBe(1)
    })

    describe("Grid zero gap", () => {
        it("should have a gap modifier with zero", () => {
            // Arrange
            const props: GridProps = {
                gap: "zero"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid--gap-zero")}`)
            expect(result.length).toBe(1)
        })
    })

    describe("Grid direction", () => {
        it("should have a direction modifier with column", () => {
            // Arrange
            const props: GridProps = {
                direction: "column"
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const result = componentWrapper.find(`.${prefix("grid--direction-column")}`)
            expect(result.length).toBe(1)
        })
    })
})
