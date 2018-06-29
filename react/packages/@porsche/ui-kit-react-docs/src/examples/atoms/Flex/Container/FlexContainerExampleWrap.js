import React from "react"
import _ from "lodash"

import { Flex } from "@porsche/ui-kit-react"

const style = {
    height: "50px",
    width: "150px",
    backgroundColor: "DeepSkyBlue",
    marginRight: "12px",
    marginBottom: "12px"
}

const FlexContainerExampleWrap = () => {
    return (
        <Flex wrap>
            {_.times(9, (i) => {
                return <div key={i} style={style} />
            })}
        </Flex>
    )
}

export default FlexContainerExampleWrap
