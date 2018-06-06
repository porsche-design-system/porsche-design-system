import React from "react"
import { Button, Flex, Spacing } from "@porsche/ui-kit-react"

const ButtonExampleTypesShowContent = () => {
    return (
        <React.Fragment>
            <div>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button showContent={"xs"}>
                        This is shown starting from <code>xs</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button showContent={"s"}>
                        This is shown starting from <code>s</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button showContent={"m"}>
                        This is shown starting from <code>m</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button showContent={"l"}>
                        This is shown starting from <code>l</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button showContent={"xl"}>
                        This is shown starting from <code>xl</code>
                    </Button>
                </Spacing>
            </div>
            <div>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button type="ghost" showContent={"xs"}>
                        This is shown starting from <code>xs</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button type="ghost" showContent={"s"}>
                        This is shown starting from <code>s</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button type="ghost" showContent={"m"}>
                        This is shown starting from <code>m</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button type="ghost" showContent={"l"}>
                        This is shown starting from <code>l</code>
                    </Button>
                </Spacing>
                <Spacing marginBottom={6} marginRight={6}>
                    <Button type="ghost" showContent={"xl"}>
                        This is shown starting from <code>xl</code>
                    </Button>
                </Spacing>
            </div>
        </React.Fragment>
    )
}

export default ButtonExampleTypesShowContent
