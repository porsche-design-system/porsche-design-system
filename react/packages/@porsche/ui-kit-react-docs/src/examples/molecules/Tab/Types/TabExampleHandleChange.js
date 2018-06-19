import React from "react"
import { Tab } from "@porsche/ui-kit-react"

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
                {this.state.activeTab === "Tab1" ? <div>TabContent1</div> : null}
                {this.state.activeTab === "Tab2" ? <div>TabContent2</div> : null}
            </div>
        )
    }
}

export default TabExampleHandleChange
