import React, { PureComponent } from "react"

const pure = (ChildComponent) => {
    return class extends PureComponent {
        render() {
            return <ChildComponent {...this.props} />
        }
    }
}

export default pure
