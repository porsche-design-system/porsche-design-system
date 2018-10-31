import { Flex, Text, Spacing, Divider } from "@porsche/ui-kit-react"

import Editor from "src/app/Components/Editor/Editor"
import Logo from "../app/Components/Logo/Logo"
import PropTypes from "prop-types"
import React from "react"
import reactpkg from "./../../../ui-kit-react/package.json"

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
        <div className="docs-box">
            <Flex gap={12}>
                <Flex.Item className="docs-box__left" width={6}>
                    <Editor id={btoa(jsx)} value={jsx} readOnly />
                </Flex.Item>
                <Flex.Item width={6}>
                    <Editor id={btoa(html)} mode="html" value={html} readOnly />
                </Flex.Item>
            </Flex>
        </div>
    )
}

Comparison.propTypes = {
    jsx: PropTypes.string,
    html: PropTypes.string
}

const Introduction = () => {
    return (
        <article id="introduction-page">
            <Flex direction="column" alignCrossAxis="center">
                <Spacing marginTop={18} marginBottom={18}>
                    <Logo centered size="small" />
                </Spacing>
                <Text as="h1" align="center" type="2-bold">
                    Porsche UI Kit React <em>{reactpkg.version}</em>
                </Text>
                <Text as="h2" align="center" type="5-regular" color="grey-dark">
                    {reactpkg.description}
                </Text>
            </Flex>

            <Spacing marginTop={36} marginBottom={36} paddingRight={24} paddingLeft={24}>
                <Text as="h2" type="3-bold">
                    Augmentation
                </Text>
                <Spacing marginTop={6} marginBottom={18}>
                    <Divider />
                </Spacing>
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
            </Spacing>
        </article>
    )
}

export default Introduction
