import React from "react"
import { Tab, Spacing } from "@porsche/ui-kit-react"

class TabExampleActivation extends React.Component {
    state = {
        activeTab: "Tab2"
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
                render: () => <Spacing marginTop={18}>Tab1 Content</Spacing>
            },
            {
                menuItem: "Tab2",
                key: "Tab2",
                active: this.state.activeTab === "Tab2",
                onClick: this.onClick,
                render: () => <Spacing marginTop={18}>Tab2 Content</Spacing>
            }
        ]

        return <Tab panes={panes} />
    }
}

export default TabExampleActivation
