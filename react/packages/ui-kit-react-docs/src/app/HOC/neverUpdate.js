import React, { Component } from "react"

const neverUpdate = (ChildComponent) => {
    return class extends Component {
        shouldComponentUpdate() {
            return false
        }

        render() {
            return <ChildComponent {...this.props} />
        }
    }
}

export default neverUpdate
