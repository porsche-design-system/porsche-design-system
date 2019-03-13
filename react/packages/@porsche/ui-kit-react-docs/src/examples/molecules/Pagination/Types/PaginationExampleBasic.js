import React from "react"
import { Pagination, Flex, Input, Spacing } from "@porsche/ui-kit-react"

const style = {
    marginRight: "12px",
    marginBottom: "12px"
}

class PaginationExampleBasic extends React.Component {
    state = {
        activePage: 1,
        totalItemsCount: 500,
        itemsPerPage: 25
    }

    handleTotalItemsCount = (totalItemsCount) => {
        if (totalItemsCount < 1) {
            totalItemsCount = 1
        }
        this.setState({
            totalItemsCount
        })
    }

    handleItemsPerPage = (itemsPerPage) => {
        if (itemsPerPage < 1) {
            itemsPerPage = 1
        }
        this.setState({
            itemsPerPage
        })
    }

    handlePageChange = (event, page) => {
        this.setState({
            activePage: page
        })
    }

    render() {
        return (
            <React.Fragment>
                <Flex>
                    <Flex.Item width={{ base: "half", m: "one-quarter" }}>
                        <Input
                            onChange={this.handleTotalItemsCount}
                            value={this.state.totalItemsCount}
                            placeholder="Total items count"
                            style={style}
                        />
                    </Flex.Item>
                    <Flex.Item width={{ base: "half", m: "one-quarter" }}>
                        <Input
                            onChange={this.handleItemsPerPage}
                            value={this.state.itemsPerPage}
                            placeholder="Items per page"
                            style={style}
                        />
                    </Flex.Item>
                </Flex>
                <Spacing marginTop={42}>
                    <Pagination
                        totalItemsCount={this.state.totalItemsCount}
                        itemsPerPage={this.state.itemsPerPage}
                        activePage={this.state.activePage}
                        onClick={this.handlePageChange}
                    />
                </Spacing>
            </React.Fragment>
        )
    }
}

export default PaginationExampleBasic
