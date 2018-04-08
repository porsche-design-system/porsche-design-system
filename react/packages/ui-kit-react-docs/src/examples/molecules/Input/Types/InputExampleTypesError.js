import React from "react"
import { Input, Flex, Spacing } from "@porsche/ui-kit-react"

const InputExampleTypesError = () => {
    return (
        <div>
            <Flex gap="grid">
                <Flex.Item width={3}>
                    <Input error placeholder="Floating Label" />
                </Flex.Item>

                <Flex.Item width={3}>
                    <Input error placeholder="Floating Label" value="Value" onChange={() => {}} />
                </Flex.Item>

                <Flex.Item width={3}>
                    <Input error placeholder="Placeholder" basic />
                </Flex.Item>

                <Flex.Item width={3}>
                    <Input error placeholder="Placeholder" basic value="Value" onChange={() => {}} />
                </Flex.Item>
            </Flex>

            <Spacing marginTop={24}>
                <Flex gap="grid">
                    <Flex.Item width={3}>
                        <Input error icon="cancel" placeholder="Floating Label" />
                    </Flex.Item>

                    <Flex.Item width={3}>
                        <Input error icon="cancel" basic placeholder="Placeholder" />
                    </Flex.Item>

                    <Flex.Item width={3}>
                        <Input error unit="km" placeholder="Floating Label" />
                    </Flex.Item>

                    <Flex.Item width={3}>
                        <Input error unit="km" basic placeholder="Placeholder" />
                    </Flex.Item>
                </Flex>
            </Spacing>
        </div>
    )
}

export default InputExampleTypesError
