import React from "react"
import { Button, Flex } from "@porsche/ui-kit-react"

const ButtonExampleTypesLoading = () => {
    return (
        <div>
            <Flex gap="grid">
                <Flex.Item width={3}>
                    <Button loading type="default">
                        Default Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button loading type="red">
                        Red Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button loading type="blue">
                        Blue Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button loading type="black">
                        Black Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid" style={{ paddingTop: "16px" }}>
                <Flex.Item width={3}>
                    <Button loading type="acid-green">
                        Acid-Green Button
                    </Button>
                </Flex.Item>

                <Flex.Item width={3}>
                    <Button loading type="ghost">
                        Ghost Button
                    </Button>
                </Flex.Item>
            </Flex>

            <Flex gap="grid">
                <Flex.Item width={3}>
                    <div style={{ background: "black", padding: "16px", marginTop: "16px" }}>
                        <Button loading type="ghost-inverted">
                            Ghost Inverted Button
                        </Button>
                    </div>
                </Flex.Item>
            </Flex>
        </div>
    )
}

export default ButtonExampleTypesLoading
