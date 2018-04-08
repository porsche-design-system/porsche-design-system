import React from "react"
import { SortableList } from "@porsche/ui-kit-react"

const initialItems = [
    {
        key: "0",
        label: "Item 0"
    },
    {
        key: "1",
        label: "Item 1"
    },
    {
        key: "2",
        label: "Item 2"
    }
]

class SortableListExample extends React.Component {
    constructor(props) {
        super(props)

        this.state = { items: initialItems }
    }

    handleSortingChanged = (newItems) => {
        this.setState({
            items: newItems
        })
    }

    render() {
        return (
            <SortableList value={this.state.items} onChange={this.handleSortingChanged} />
        )
    }
}

export default SortableListExample
