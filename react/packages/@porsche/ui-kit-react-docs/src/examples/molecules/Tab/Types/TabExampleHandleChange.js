import React from "react"
import { Tab, Spacing } from "@porsche/ui-kit-react"

class TabExampleHandleChange extends React.Component {
    state = {
        activeTab: "Tab1"
    }

    onClick = (event, pane) => {
        this.setState({ activeTab: pane.key })
    }

    render() {
        const panes = [
            { menuItem: "Tab1", key: "Tab1", active: this.state.activeTab === "Tab1", onClick: this.onClick },
            { menuItem: "Tab2", key: "Tab2", active: this.state.activeTab === "Tab2", onClick: this.onClick }
        ]

        return (
            <div>
                <Tab panes={panes} />
                {this.state.activeTab === "Tab1" ? <Spacing marginTop={18}>TabContent1</Spacing> : null}
                {this.state.activeTab === "Tab2" ? <Spacing marginTop={18}>TabContent2</Spacing> : null}
            </div>
        )
    }
}

export default TabExampleHandleChange
