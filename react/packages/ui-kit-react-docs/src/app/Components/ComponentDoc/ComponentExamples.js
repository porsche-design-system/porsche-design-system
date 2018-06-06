import React, { Component, createElement } from "react"

import { Grid } from "semantic-ui-react"
import PropTypes from "prop-types"
import _ from "lodash"
import { exampleContext } from "src/app/utils"

export default class ComponentExamples extends Component {
    static propTypes = {
        componentName: PropTypes.string
    }

    renderExamples = () => {
        const { componentName } = this.props

        const examplePath = _.find(exampleContext.keys(), (path) => {
            return new RegExp(`${componentName}/index.jsx?$`).test(path)
        })

        return examplePath && createElement(exampleContext(examplePath).default)
    }

    renderMissingExamples = () => {
        const { componentName } = this.props
        return (
            <Grid padded>
                <Grid.Column>
                    Looks like we're missing <code>{`<${componentName} />`}</code> examples.
                </Grid.Column>
            </Grid>
        )
    }

    render() {
        return this.renderExamples() || this.renderMissingExamples()
    }
}
