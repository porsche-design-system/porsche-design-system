import * as React from "react"

export class Application extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

}
