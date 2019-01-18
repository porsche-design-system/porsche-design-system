import * as React from "react"
import { Radio, RadioProps } from "./Radio"
import { mount, ReactWrapper } from "enzyme"
import { RadioGroupProps } from "./RadioGroup"

describe("Radio Group", () => {
    const createComponent = (
        radioGroupProps: RadioGroupProps,
        radio1Props: RadioProps,
        radio2Props: RadioProps
    ): ReactWrapper => {
        return mount(
            <Radio.Group
                name={radioGroupProps.name}
                onChange={radioGroupProps.onChange}
                disabled={radioGroupProps.disabled}
            >
                <Radio checked={true} value={radio1Props.value} />
                <Radio value={radio2Props.value} />
            </Radio.Group>
        )
    }

    describe("onChange", () => {
        it("is called with the value of the input on change", () => {
            //arrange
            const onChange = jest.fn()
            const radioGroupProps = {
                name: "radiotest",
                onChange
            }
            const radio1Props = {
                value: "radio1"
            }
            const radio2Props = {
                value: "radio2"
            }

            //act
            const component = createComponent(radioGroupProps, radio1Props, radio2Props)
            const input = component.find("input").first()

            input.simulate("change")

            //assert
            expect(undefined === input.props().disabled)
            expect(onChange).toHaveBeenCalledWith(radio1Props.value, expect.anything(), expect.anything())
        })
        it("is called with value of second radio if it's checked", () => {
            //arrange
            const onChange = jest.fn()
            const radioGroupProps = {
                name: "radiotest",
                onChange
            }
            const radio1Props = {
                value: "radio1"
            }
            const radio2Props = {
                value: "radio2"
            }

            //act
            const component = createComponent(radioGroupProps, radio1Props, radio2Props)
            const input = component.find("input").last()

            input.simulate("change")

            //assert
            expect(undefined === input.props().disabled)
            expect(onChange).toHaveBeenCalledWith(radio2Props.value, expect.anything(), expect.anything())
        })
        it("is not called since radio is disabled", () => {
            //arrange
            const onChange = jest.fn()
            const radioGroupProps = {
                name: "radiotest",
                disabled: true,
                onChange
            }
            const radio1Props = {
                value: "radio1"
            }
            const radio2Props = {
                value: "radio2"
            }

            //act
            const component = createComponent(radioGroupProps, radio1Props, radio2Props)
            const inputs = component.find("input")

            // if we call input simulate change on a disabled input, the change event will be fired
            // in the real world, disabled radios can't toggle it's checked state, ans therefore the change event won't be fired
            // that's the reason why we simulate change only if the element props don't contain disabled
            inputs.map((input) => {
                if (undefined === input.props().disabled) {
                    input.simulate("change")
                }
            })

            //assert
            expect(onChange).not.toHaveBeenCalled()
        })
    })
})
