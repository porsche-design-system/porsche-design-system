import React, { Component, createElement } from "react"

import { Grid } from "semantic-ui-react"
import PropTypes from "prop-types"
import { getStoryByName } from "src/app/stories"

export default class ComponentExamples extends Component {
    static propTypes = {
        componentName: PropTypes.string
    }

    renderExamples = () => {
        const { componentName } = this.props
        const story = getStoryByName(componentName)

        if (!story || !story.examples) {
            return undefined
        }

        if (Array.isArray(story.examples)) {
            let count = 0
            return story.examples.map((example) => {
                count += 1
                return createElement(example, { key: count })
            })
        }

        return createElement(story.examples)
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
