import * as React from "react"
import { RadioProps, Radio } from "./Radio"
import { mount, ReactWrapper } from "enzyme"

describe("Radio", () => {
    const createComponent = (props?: any): ReactWrapper => {
        return mount(<Radio {...props} />)
    }

    describe("default state", () => {
        //arrange
        const defaultProps = {
            name: "radiotest",
            value: "test"
        }
        //act
        const component = createComponent()

        //assert
        const input = component.find("input")
        expect(input.getDOMNode().nodeValue).toEqual("")
    })
})
