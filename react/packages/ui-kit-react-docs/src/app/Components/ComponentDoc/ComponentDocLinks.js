import { List } from "semantic-ui-react"
import PropTypes from "prop-types"
import React from "react"
import { pure } from "src/app/HOC"

const linkListStyle = {
    background: "#f7f7f7",
    boxShadow: "0 0 1em 0.5em #f7f7f7",
    margin: "0.5em",
    padding: "0.5em",
    position: "absolute",
    right: "0",
    top: "0"
}

const ComponentDocLinks = ({ componentName, path }) => {
    return (
        <List link style={linkListStyle}>
            <List.Item content={<code>{path}</code>} />
        </List>
    )
}

ComponentDocLinks.propTypes = {
    componentName: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}

export default pure(ComponentDocLinks)
