import React from "react"
import { Pagination } from "@porsche/ui-kit-react"

class PaginationExampleBasic extends React.Component {
    state = {
        activeItem: "1"
    }

    onClick = (event, pane) => {
        this.setState({
            activeItem: pane.key
        })
    }

    render() {
        const paginationItems = [
            {
                key: "1",
                isActive: this.state.activeItem === "1"
            },
            {
                key: "2",
                isActive: this.state.activeItem === "2"
            }
        ]

        return <Pagination items={paginationItems} />
    }
}

export default PaginationExampleBasic
