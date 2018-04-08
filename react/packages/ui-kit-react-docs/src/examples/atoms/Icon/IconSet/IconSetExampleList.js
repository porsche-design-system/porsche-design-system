import React from "react"
import { Flex, Icon } from "@porsche/ui-kit-react"

const containerStyle = { margin: "32px", marginTop: 0, width: "120px", height: "120px" }
const contentStyle = { width: "100%", height: "100%" }
const labelStyle = { textAlign: "center" }

const IconSetExampleList = () => {
    return (
        <Flex wrap alignMainAxis="center">
            {
                Icon.names.sort().map((type) => {
                    return (
                        <div key={type} style={containerStyle}>
                            <Flex alignMainAxis="center" alignCrossAxis="center" style={contentStyle}>
                                <Icon name={type} size="large" />
                            </Flex>
                            <p style={labelStyle}>{type}</p>
                        </div>
                    )
                })
            }
        </Flex>
    )
}

export default IconSetExampleList
