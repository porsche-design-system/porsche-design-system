import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Flex, FlexProps } from "./Flex"
import { FlexItemProps } from "./FlexItem"
import { prefix } from "../../../lib"

describe("Flex Child component", () => {
    const createComponent = (props?: FlexItemProps): ReactWrapper => {
        return mount(<Flex.Item {...props} />)
    }

    describe("Flex Child Shrink", () => {
        it("should have a shrink modifier with 0", () => {
            // Arrange
            const props: FlexItemProps = {
                shrink: 0
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const flexShrink = componentWrapper.find(`.${prefix("flex__child--shrink-0")}`)
            expect(flexShrink.length).toBe(1)
        })

        it("should have a shrink modifier with 1", () => {
            // Arrange
            const props: FlexItemProps = {
                shrink: 1
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const flexShrink = componentWrapper.find(`.${prefix("flex__child--shrink-1")}`)
            expect(flexShrink.length).toBe(1)
        })
    })
})
