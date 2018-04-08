import React from "react"
import { Flex, Select } from "@porsche/ui-kit-react"

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

class SelectExampleSingle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: null
        }
    }

    handleChange = (value) => {
        this.setState({
            value1: value
        })
    }

    render() {
        return (
            <Select
                options={data}
                value={this.state.value1}
                onChange={this.handleChange}
            />
        )
    }
}

export default SelectExampleSingle
