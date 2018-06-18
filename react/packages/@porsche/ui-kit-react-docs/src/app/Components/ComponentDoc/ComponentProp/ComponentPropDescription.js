import _ from "lodash"
import PropTypes from "prop-types"
import React from "react"

import { pure } from "src/app/HOC"

const ComponentPropDescription = ({ description }) => {
    return _.isNil(description) ? null : (
        <p>
            {_.map(description, (line) => {
                return [line, <br key={line} />]
            })}
        </p>
    )
}

ComponentPropDescription.propTypes = {
    description: PropTypes.arrayOf(PropTypes.string)
}

export default pure(ComponentPropDescription)
