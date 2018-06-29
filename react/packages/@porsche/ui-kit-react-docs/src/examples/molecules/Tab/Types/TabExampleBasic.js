import React from "react"
import { Tab } from "@porsche/ui-kit-react"

class TabExampleBasic extends React.Component {
    state = {
        activeTab: "Tab1"
    }

    onClick = (event, pane) => {
        this.setState({
            activeTab: pane.key
        })
    }

    render() {
        const panes = [
            {
                menuItem: "Tab1",
                key: "Tab1",
                active: this.state.activeTab === "Tab1",
                onClick: this.onClick,
                render: () => "Tab1 Content"
            },
            {
                menuItem: "Tab2",
                key: "Tab2",
                active: this.state.activeTab === "Tab2",
                onClick: this.onClick,
                render: () => "Tab2 Content"
            }
        ]

        return <Tab panes={panes} />
    }
}

export default TabExampleBasic
