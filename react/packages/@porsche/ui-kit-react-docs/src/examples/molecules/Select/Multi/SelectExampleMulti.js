import React from "react"
import { Select } from "@porsche/ui-kit-react"

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

class SelectExampleMulti extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: null
        }
    }

    handleChange = (value) => {
        this.setState({
            value
        })
    }

    render() {
        return <Select multi options={data} value={this.state.value} onChange={this.handleChange} />
    }
}

export default SelectExampleMulti
