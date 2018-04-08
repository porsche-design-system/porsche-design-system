import * as React from "react"
import { shallow } from "enzyme"
import { SelectProps, Select, SelectOption, HydratedSelectOptionGroup, HydratedSelectOption } from "./Select"
import { merge } from "lodash"

describe("Select component", () => {

    let onChangeMock: any

    const createComponent = (props?: SelectProps) => {
        onChangeMock = jest.fn()
        const defaultProps: SelectProps = {
            onChange: onChangeMock,
            disabled: false
        }
        const mergedProps = merge(props, defaultProps)
        return shallow(<Select {...mergedProps}/>).instance() as Select
    }

    describe("handleChange", () => {

        it("should call the callback with single value", () => {
            // Arrange
            const props: SelectProps = {
                multi: true
            }
            const instance = createComponent(props)
            // Act
            const value: SelectOption = {
                label: "label",
                value: "value"
            }
            // Act
            instance.handleChange(value)
            expect(onChangeMock).toHaveBeenCalledWith(value.value, instance.props)
        })
    })

    describe("isOptionSelected", () => {
        it("should check if option is selected when a single value is selected", () => {
            // Arrange
            const instance = createComponent()
            const option: SelectOption = {
                value: "value",
                label: "label"
            }
            const value = "value"
            // Act
            const isSelected = instance.isOptionSelected(option, value)
            // Assert
            expect(isSelected).toBeTruthy()
        })

        it("should check if option is selected when multiple values are selected", () => {
            // Arrange
            const instance = createComponent()
            const option: SelectOption = {
                value: "value1",
                label: "label"
            }
            const values: string[] = ["value1", "value2"]
            // Act
            const isSelected = instance.isOptionSelected(option, values)
            // Assert
            expect(isSelected).toBeTruthy()
        })
    })

    describe("getFlatOptionsList", () => {

        it("should flatten the different option groups", () => {
            // Arrange
            const instance = createComponent()
            const optionGroups: HydratedSelectOptionGroup[] = [{
                label: "optionGroup1",
                options: [{ value: "valueOptionGroup1", label: "label1", selected: false }]
            }, {
                label: "optionGroup2",
                options: [{ value: "valueOptionGroup2", label: "label1", selected: true }]
            }]

            // Act
            const result = instance.getFlatOptionsList(optionGroups)
            // Assert
            expect(result.length).toBe(2)
            expect(result).toEqual([
                { value: "valueOptionGroup1", label: "label1", selected: false },
                { value: "valueOptionGroup2", label: "label1", selected: true }
            ])
        })
    })

    describe("getSelectedValues", () => {

        it("should return the selected values for option groups", () => {
            // Arrange
            const props: SelectProps = {
                value: "valueOptionGroup1b"
            }
            const instance = createComponent(props)
            const optionGroups: HydratedSelectOptionGroup[] = [{
                label: "optionGroup1",
                options: [
                    { value: "valueGroup1Unselected", label: "unselected", selected: false },
                    { value: "valueGroup1Selected", label: "selected", selected: true }
                ]
            }, {
                label: "optionGroup2",
                options: [
                    { value: "valueGroup2Selected", label: "selected", selected: true },
                    { value: "valueGroup2Unselected", label: "unselected", selected: false }
                ]
            }]

            // Act
            const result = instance.getSelectedValues(optionGroups, false) as string[]
            // Assert
            expect(result.length).toBe(2)
            expect(result[0]).toEqual("valueGroup1Selected")
            expect(result[1]).toEqual("valueGroup2Selected")
        })

        it("should return the selected value", () => {
            // Arrange
            const props: SelectProps = {
                value: "foo"
            }
            const instance = createComponent(props)
            const options: HydratedSelectOption[] = [
                { value: "selected", label: "selected", selected: true },
                { value: "unselected", label: "unselected", selected: false }
            ]

            // Act
            const result = instance.getSelectedValues(options, false) as string
            // Assert
            expect(result).toEqual("selected")
        })

        it("should return an empty string when no option is selected", () => {
            // Arrange
            const props: SelectProps = {
                value: "foo"
            }
            const instance = createComponent(props)
            const options: HydratedSelectOption[] = [
                { value: "unselected", label: "selected", selected: false },
                { value: "unselected", label: "unselected", selected: false }
            ]

            // Act
            const result = instance.getSelectedValues(options, false) as string
            // Assert
            expect(result).toEqual("")
        })

        describe("multi", () => {

            it("should return an empty array when no options are specified", () => {
                // Arrange
                const instance = createComponent()
                const options: HydratedSelectOption[] = []

                // Act
                const result = instance.getSelectedValues(options, true) as string
                // Assert
                expect(result).toEqual([])
            })
        })

        describe("isMobile", () => {

            const userAgentMock = jest.fn()
            Object.defineProperty(navigator, "userAgent", {
                get: userAgentMock
            })

            it("should detect android mobile devices", () => {
                // Arrange
                const instance = createComponent()
                userAgentMock.mockReturnValue("Android")
                // Act
                const result = instance.isMobile()
                // Assert
                expect(result).toBeTruthy()
            })

            it("should detect ios mobile devices", () => {
                // Arrange
                const instance = createComponent()
                userAgentMock.mockReturnValue("iPhone")
                // Act
                const result = instance.isMobile()
                // Assert
                expect(result).toBeTruthy()
            })

            it("should detect non mobile devices", () => {
                // Arrange
                const instance = createComponent()
                userAgentMock.mockReturnValue("noMobileDevice")
                // Act
                const result = instance.isMobile()
                // Assert
                expect(result).toBeFalsy()
            })
        })
    })
})
