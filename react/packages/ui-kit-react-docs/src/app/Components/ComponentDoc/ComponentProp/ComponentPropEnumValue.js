import PropTypes from "prop-types"
import React from "react"

import { neverUpdate } from "src/app/HOC"

const spanStyle = {
    display: "inline-block",
    paddingRight: "0.2em"
}

const ComponentPropEnumValue = ({ children }) => {
    return (
        <span style={spanStyle}>
            <code>{children}</code>
        </span>
    )
}

ComponentPropEnumValue.propTypes = {
    children: PropTypes.node
}

export default neverUpdate(ComponentPropEnumValue)
