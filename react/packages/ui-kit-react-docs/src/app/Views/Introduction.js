import { Container, Divider, Grid, Header, Icon, Label, Segment } from "semantic-ui-react"

import Editor from "src/app/Components/Editor/Editor"
import Logo from "../Components/Logo/Logo"
import PropTypes from "prop-types"
import React from "react"
import pkg from "package.json"

const HeaderAugmentationJSX = `<Text as='h3'>
  Learn More
</Text>`

const HeaderAugmentationHTML = `<h3 class="ui header">
  Learn More
</h3>`

const MenuItemLinkAugmentationJSX = `import { Link } from 'react-router-dom'

<Button as={Link} to='/home'>
    Home
</Button>`

const MenuItemLinkAugmentationHTML = `<a class="pui-button-primary" href="/home">
    Home
</a>`

const Comparison = ({ jsx, html }) => {
    return (
        <Segment className="code-example">
            <Grid columns="equal" centered textAlign="left">
                <Grid.Column computer="8" largeScreen="7" widescreen="7" width="16">
                    <Label size="tiny" attached="top left">
                        JSX
                    </Label>
                    <Editor id={btoa(jsx)} value={jsx} readOnly />
                </Grid.Column>
                <Grid.Column largeScreen="2" only="large screen" textAlign="center">
                    <Divider vertical>
                        <Icon name="right arrow circle" />
                    </Divider>
                </Grid.Column>
                <Grid.Column computer="8" largeScreen="7" widescreen="7" width="16">
                    <Label size="tiny" attached="top right">
                        Rendered HTML
                    </Label>
                    <Editor id={btoa(html)} mode="html" value={html} readOnly />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

Comparison.propTypes = {
    jsx: PropTypes.string,
    html: PropTypes.string
}

const Introduction = () => {
    return (
        <Container id="introduction-page">
            <Segment basic textAlign="center">
                <Logo centered size="small" />
                <Header as="h1" textAlign="center">
                    Porsche UI Kit React
                    <Header.Subheader>{pkg.description}</Header.Subheader>
                </Header>
            </Segment>

            <Segment basic padded>
                <Header as="h2" dividing>
                    Introduction
                </Header>
                <p>Porsche UI Kit React is the React implementation of Porsche UI Kit.</p>
            </Segment>

            <Segment basic padded>
                <Header as="h2" dividing>
                    Augmentation
                </Header>
                <p>
                    Control the rendered HTML tag, or render one component <code>as</code> another component. Extra
                    props are passed to the component you are rendering <code>as</code>.
                </p>

                <p>
                    Augmentation is powerful. You can compose component features and props without adding extra nested
                    components. This is essential for working with <code>MenuLinks</code> and <code>react-router</code>.
                </p>

                <Comparison jsx={HeaderAugmentationJSX} html={HeaderAugmentationHTML} />
                <Comparison jsx={MenuItemLinkAugmentationJSX} html={MenuItemLinkAugmentationHTML} />
            </Segment>
        </Container>
    )
}

export default Introduction
