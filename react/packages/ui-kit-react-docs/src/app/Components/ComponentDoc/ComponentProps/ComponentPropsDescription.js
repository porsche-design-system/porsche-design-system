import PropTypes from "prop-types"
import React from "react"

import { pure } from "src/app/HOC"

const descriptionStyle = {
    fontSize: "1.08em",
    maxWidth: "33em"
}

const ComponentPropsDescription = ({ description }) => {
    return <div style={descriptionStyle}>{description.join(" ")}</div>
}

ComponentPropsDescription.propTypes = {
    description: PropTypes.arrayOf(PropTypes.string)
}

export default pure(ComponentPropsDescription)
