import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Flex, FlexProps } from "./Flex"
import { prefix } from "../../../lib"

describe("Flex component", () => {
    const createComponent = (props?: FlexProps): ReactWrapper => {
        return mount(<Flex {...props} />)
    }

    describe("Flex Shrink", () => {
        it("should have a shrink modifier with 0", () => {
            // Arrange
            const props: FlexProps = {
                shrink: 0
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const flexShrink = componentWrapper.find(`.${prefix("flex--shrink-0")}`)
            expect(flexShrink.length).toBe(1)
        })

        it("should have a shrink modifier with 1", () => {
            // Arrange
            const props: FlexProps = {
                shrink: 1
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const flexShrink = componentWrapper.find(`.${prefix("flex--shrink-1")}`)
            expect(flexShrink.length).toBe(1)
        })
    })
})
