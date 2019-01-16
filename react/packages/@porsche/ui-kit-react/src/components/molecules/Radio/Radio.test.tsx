import * as React from "react"
import { RadioProps, Radio } from "./Radio"
import { mount, ReactWrapper } from "enzyme"
import { RadioGroupProps } from "./RadioGroup"

describe("Radio", () => {
    const createComponent = (props?: any): ReactWrapper => {
        return mount(<Radio {...props} />)
    }

    describe("default state", () => {
        it("sets all pass through properties on the input", () => {
            //arrange
            const defaultProps = {
                name: "radiotest",
                value: "test"
            }

            //act
            const component = createComponent(defaultProps)

            //assert
            const input = component.find("input")
            expect(input.prop("checked")).toBe(undefined)
            expect(input.prop("name")).toBe("radiotest")
            expect(input.prop("value")).toBe("test")
        })
    })

    describe("onChange", () => {
        it("is called with the value of the input on change", () => {
            //arrange
            const onChange = jest.fn()
            const defaultProps = {
                name: "radiotest",
                onChange,
                value: "test"
            }

            //act
            const component = createComponent(defaultProps)
            const input = component.find("input")

            input.simulate("change")

            //assert
            expect(onChange).toHaveBeenCalledWith("test", expect.anything(), expect.anything())
        })
    })
})

describe("Radio Group", () => {
    const createComponent = (
        defaultRadioGroupProps: RadioGroupProps,
        defaultRadio1Props: any,
        defaultRadio2Props: any
    ): ReactWrapper => {
        return mount(
            <Radio.Group name={defaultRadioGroupProps.name} onChange={defaultRadioGroupProps.onChange}>
                <Radio checked={true} value={defaultRadio1Props.value} />
                <Radio value={defaultRadio2Props.value} />
            </Radio.Group>
        )
    }

    describe("onChange", () => {
        it("is called with the value of the input on change", () => {
            //arrange
            const onChange = jest.fn()
            const defaultRadioGroupProps = {
                name: "radiotest",
                onChange
            }
            const defaultRadio1Props = {
                value: "radio1"
            }
            const defaultRadio2Props = {
                value: "radio2"
            }

            //act
            const component = createComponent(defaultRadioGroupProps, defaultRadio1Props, defaultRadio2Props)
            const input = component.find("input").first()

            input.simulate("change")

            //assert
            expect(onChange).toHaveBeenCalledWith(defaultRadio1Props.value, expect.anything(), expect.anything())
        })
    })
})
