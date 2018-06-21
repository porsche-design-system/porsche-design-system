import PropTypes from "prop-types"
import React from "react"

const descriptionStyle = {
    marginTop: "8px"
}
const contentStyle = {
    marginLeft: "0em"
}
const contentBlockStyle = {
    ...contentStyle,
    display: "block"
}
const contentInlineStyle = {
    ...contentStyle,
    display: "inline"
}

const ComponentPropExtra = ({ children, inline, title, ...rest }) => {
    return (
        <div {...rest} style={descriptionStyle}>
            <strong>{title}</strong>
            <div style={inline ? contentInlineStyle : contentBlockStyle}>{children}</div>
        </div>
    )
}

ComponentPropExtra.propTypes = {
    children: PropTypes.node,
    inline: PropTypes.bool,
    title: PropTypes.node
}

export default ComponentPropExtra
