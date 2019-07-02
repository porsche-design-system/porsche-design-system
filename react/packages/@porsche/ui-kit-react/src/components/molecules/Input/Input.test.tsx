import * as React from "react"
import { mount, ReactWrapper } from "enzyme"
import { InputProps, Input } from "./Input"

describe("Input", () => {
    const createComponent = (props: InputProps): ReactWrapper => {
        return mount(<Input type="text" {...props} />)
    }

    describe("native input attributes", () => {
        it("native input attributes passes via inputProps should be on native input element", () => {
            const props: InputProps = {
                inputProps: {
                    maxLength: 60
                }
            }

            const component = createComponent(props)
            const input = component.find("input").first()

            expect(input.props().maxLength).toBe(60)
        })

        it("native input maxLength should not be exist on input element", () => {
            const props: InputProps = {}

            const component = createComponent(props)
            const input = component.find("input").first()

            expect(input.props().maxLength).toBeUndefined()
        })
    })
})
