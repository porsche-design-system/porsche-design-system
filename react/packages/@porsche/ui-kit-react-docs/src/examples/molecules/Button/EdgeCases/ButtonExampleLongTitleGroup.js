import React from "react"
import { Button } from "@porsche/ui-kit-react"

const ButtonExampleGroupsStretch = () => {
    return (
        <Button.Group>
            <Button stretch>Default Button</Button>
            <Button type="highlight" stretch>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua
            </Button>
        </Button.Group>
    )
}

export default ButtonExampleGroupsStretch
