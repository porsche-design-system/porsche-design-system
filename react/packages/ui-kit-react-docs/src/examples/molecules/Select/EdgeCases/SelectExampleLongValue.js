import React from "react"
import { Flex, Select } from "@porsche/ui-kit-react"

const data = [
    { value: "WithoutWhitespace", label: "WithoutWhitespaceWithoutWhitespaceWithoutWhitespaceWithoutWhitespace" },
    { value: "With Whitespace", label: "With Whitespace With Whitespace With Whitespace With Whitespace With Whitespace" }
]

const SelectExampleLongValue = () => {
    return (
        <Flex gap="grid">
            <Flex.Item width={3}>
                <Select options={data} value={data[0].value} />
            </Flex.Item>

            <Flex.Item width={3}>
                <Select options={data} value={data[1].value} />
            </Flex.Item>

            <Flex.Item width={3}>
                <Select multi options={data} value={data[0].value} />
            </Flex.Item>

            <Flex.Item width={3}>
                <Select multi options={data} value={data[1].value} />
            </Flex.Item>
        </Flex>
    )
}

export default SelectExampleLongValue

