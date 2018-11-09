import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { Flex, FlexProps } from "./Flex"
import { prefix } from "../../../lib"

describe("Flex component", () => {
    const createComponent = (props?: FlexProps): ReactWrapper => {
        return mount(<Flex {...props} />)
    }

    describe("Flex inline", () => {
        it("should have a inline modifier with inline", () => {
            // Arrange
            const props: FlexProps = {
                inline: true
            }
            // Act
            const componentWrapper = createComponent(props)
            // Assert
            const flexInline = componentWrapper.find(`.${prefix("flex--inline")}`)
            expect(flexInline.length).toBe(1)
        })
    })
})
