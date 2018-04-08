import React from "react"
import { Flyout, Divider, Spacing } from "@porsche/ui-kit-react"

const FlyoutExampleTypesBasic = () => {
    return (
        <div>
            <div style={{ position: "relative" }}>
                Flyout
                <Flyout>
                    <div>Row 1</div>
                    <Divider />
                    <div>Row 2</div>
                </Flyout>
            </div>
            <Spacing paddingBottom={48} />
        </div>
    )
}

export default FlyoutExampleTypesBasic
