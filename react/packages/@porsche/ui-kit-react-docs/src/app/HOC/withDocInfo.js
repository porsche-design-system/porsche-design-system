import React, { Component } from "react"
import { getStoryByName } from "src/app/stories"

import PropTypes from "prop-types"

const withDocInfo = (ChildComponent) => {
    return class extends Component {
        static propTypes = {
            name: PropTypes.string.isRequired,
            parent: PropTypes.string,
            type: PropTypes.string
        }

        constructor(props) {
            super(props)

            this.state = getStoryByName(props.name)
        }

        componentWillReceiveProps(nextProps) {
            this.setState(getStoryByName(nextProps.name))
        }

        render() {
            return <ChildComponent {...this.state} />
        }
    }
}

export default withDocInfo
