import React from "react"
import { Input, Flex, Spacing } from "@porsche/ui-kit-react"

const InputExampleTypesErrorDisabled = () => {
    return (
        <div>
            <Flex gap="grid">
                <Flex.Item width={3}>
                    <Input error disabled placeholder="Floating Label" />
                </Flex.Item>

                <Flex.Item width={3}>
                    <Input error disabled placeholder="Floating Label" value="Value" />
                </Flex.Item>

                <Flex.Item width={3}>
                    <Input error disabled placeholder="Placeholder" basic />
                </Flex.Item>

                <Flex.Item width={3}>
                    <Input error disabled placeholder="Placeholder" basic value="Value" />
                </Flex.Item>
            </Flex>

            <Spacing marginTop={24}>
                <Flex gap="grid">
                    <Flex.Item width={3}>
                        <Input error disabled icon="cancel" placeholder="Floating Label" />
                    </Flex.Item>

                    <Flex.Item width={3}>
                        <Input error disabled icon="cancel" basic placeholder="Placeholder" />
                    </Flex.Item>

                    <Flex.Item width={3}>
                        <Input error disabled unit="km" placeholder="Floating Label" />
                    </Flex.Item>

                    <Flex.Item width={3}>
                        <Input error disabled unit="km" basic placeholder="Placeholder" />
                    </Flex.Item>
                </Flex>
            </Spacing>
        </div>
    )
}

export default InputExampleTypesErrorDisabled
