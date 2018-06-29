import { Header } from "semantic-ui-react"

import PropTypes from "prop-types"
import React from "react"
import { pure } from "src/app/HOC"

const titleStyle = {
    margin: 0
}

const ComponentExampleTitle = ({ title }) => {
    return (
        <div>
            {title && (
                <Header as="h3" style={titleStyle}>
                    {title}
                </Header>
            )}
        </div>
    )
}

ComponentExampleTitle.propTypes = {
    title: PropTypes.node
}

export default pure(ComponentExampleTitle)
