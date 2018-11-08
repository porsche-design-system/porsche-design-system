import React from "react"
import { Grid, Select } from "@porsche/ui-kit-react"

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

class SelectExampleSingleSearchable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value1: null,
            value2: data[3].value
        }
    }

    handleValue1Change = (value) => {
        this.setState({
            value1: value
        })
    }

    handleValue2Change = (value) => {
        this.setState({
            value2: value
        })
    }

    render() {
        return (
            <Grid>
                <Grid.Child size={6}>
                    <Select
                        searchable={false}
                        options={data}
                        value={this.state.value1}
                        onChange={this.handleValue1Change}
                    />
                </Grid.Child>

                <Grid.Child size={6}>
                    <Select
                        searchable={false}
                        options={data}
                        value={this.state.value2}
                        onChange={this.handleValue2Change}
                    />
                </Grid.Child>
            </Grid>
        )
    }
}

export default SelectExampleSingleSearchable
