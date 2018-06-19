import React from "react"
import { Flyout, Divider, Flex, Spacing } from "@porsche/ui-kit-react"

const FlyoutExampleTypesRightLeft = () => {
    return (
        <Flex>
            <div style={{ position: "relative", width: "100px", marginRight: "300px" }}>
                Arrow Left
                <Flyout position="left">
                    <div>Row 1</div>
                    <Divider />
                    <div>Row 2</div>
                </Flyout>
            </div>

            <div style={{ position: "relative", width: "100px", marginLeft: "300px", textAlign: "right" }}>
                Arrow Right
                <Flyout position="right">
                    <div>Row 1</div>
                    <Divider />
                    <div>Row 2</div>
                </Flyout>
            </div>

            <Spacing paddingBottom={48} />
        </Flex>
    )
}

export default FlyoutExampleTypesRightLeft
