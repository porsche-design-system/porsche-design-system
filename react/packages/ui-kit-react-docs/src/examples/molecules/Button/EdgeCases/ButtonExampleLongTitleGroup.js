import React from "react"
import { Button, Flex } from "@porsche/ui-kit-react"

const ButtonExampleGroupsStretch = () => {
    return (
        <Button.Group>
            <Button stretch>
            Button 1
            </Button>
            <Button type="red" stretch>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
            </Button>
        </Button.Group>
    )
}

export default ButtonExampleGroupsStretch
