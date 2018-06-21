import React, { Component } from "react"

import _ from "lodash"
import { shallowEqual } from "src/app/utils"

const updateForKeys = (propKeys) => {
    return (ChildComponent) => {
        return class extends Component {
            shouldComponentUpdate(nextProps) {
                return !shallowEqual(_.pick(this.props, propKeys), _.pick(nextProps, propKeys))
            }

            render() {
                return <ChildComponent {...this.props} />
            }
        }
    }
}

export default updateForKeys
