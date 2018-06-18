import PropTypes from "prop-types"
import React from "react"

import { updateForKeys } from "src/app/HOC"

const toggleStyle = {
    cursor: "pointer",
    color: "#d5001c"
}

const ComponentPropEnumToggle = ({ showAll, toggle, total }) => {
    return (
        <a style={toggleStyle} onClick={toggle}>
            {showAll ? "Show less" : `Show all ${total}`}
        </a>
    )
}

ComponentPropEnumToggle.propTypes = {
    showAll: PropTypes.bool,
    toggle: PropTypes.func,
    total: PropTypes.number
}

export default updateForKeys(["showAll"])(ComponentPropEnumToggle)
