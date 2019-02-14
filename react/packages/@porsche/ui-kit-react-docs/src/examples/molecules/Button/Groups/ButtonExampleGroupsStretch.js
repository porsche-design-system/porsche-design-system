import React from "react"
import { Button, Spacing } from "@porsche/ui-kit-react"

const ButtonExampleGroupsStretch = () => {
    return (
        <div>
            <Button.Group>
                <Button stretch type="ghost">
                    Ghost Button
                </Button>
                <Button type="highlight" stretch>
                    Highlight Button
                </Button>
                <Button type="sales" stretch>
                    Sales Button
                </Button>
            </Button.Group>

            <Spacing marginTop={30}>
                <Button.Group direction="vertical">
                    <Button stretch type="ghost">
                        Ghost Button
                    </Button>
                    <Button stretch type="highlight">
                        Highlight Button
                    </Button>
                    <Button stretch type="sales">
                        Sales Button
                    </Button>
                </Button.Group>
            </Spacing>
        </div>
    )
}

export default ButtonExampleGroupsStretch
