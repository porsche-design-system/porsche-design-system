import React from "react"
import { Select, Text, Spacing } from "@porsche/ui-kit-react"

const data = [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
    { value: "four", label: "Four" },
    { value: "five", label: "Five" },
    { value: "six", label: "Six" },
    { value: "seven", label: "Seven" },
    { value: "eight", label: "Eight" }
]

function convertReadableStringValue(value) {
    if (typeof value === "undefined") {
        return "undefined"
    }

    if (value === null) {
        return "null"
    }

    if (typeof value === "string" && !value.length) {
        return "empty"
    }

    return value
}

class SelectExampleSingleOnSearchChanged extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: null,
            query: null
        }
    }

    handleChange = (value) => {
        this.setState({
            value
        })
    }

    handleSearchChange = (query) => {
        this.setState({
            query
        })
    }

    render() {
        return (
            <div>
                <Spacing marginBottom={18}>
                    <Text type="copy">Current search: {convertReadableStringValue(this.state.query)}</Text>
                </Spacing>
                <Select
                    options={data}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSearchChanged={this.handleSearchChange}
                />
            </div>
        )
    }
}

export default SelectExampleSingleOnSearchChanged
