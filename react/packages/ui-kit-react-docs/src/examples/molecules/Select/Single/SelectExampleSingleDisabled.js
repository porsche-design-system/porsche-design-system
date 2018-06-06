import React from "react"
import { Flex, Select } from "@porsche/ui-kit-react"

const data = [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
    { value: "four", label: "Four" },
    { value: "five", label: "Five" },
    { value: "six", label: "Six" },
    { value: "seven", label: "Seven" },
    { value: "eight", label: "Eight" }
]

const SelectExampleSingleDisabled = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={6}>
                <Select disabled options={data} value={null} />
            </Flex.Item>

            <Flex.Item width={6}>
                <Select disabled options={data} value={data[3].value} />
            </Flex.Item>
        </Flex>
    )
}

export default SelectExampleSingleDisabled
