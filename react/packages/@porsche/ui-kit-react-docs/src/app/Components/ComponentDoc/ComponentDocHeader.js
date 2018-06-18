import PropTypes from "prop-types"
import React from "react"
import { Header } from "semantic-ui-react"

import { pure } from "src/app/HOC"

const headerStyle = { marginBottom: "0.25em" }

const ComponentDocHeader = ({ componentName, description }) => {
    return <Header as="h1" content={componentName} style={headerStyle} />
}

ComponentDocHeader.propTypes = {
    componentName: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string)
}

export default pure(ComponentDocHeader)
