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

            <Spacing marginTop={60} marginBottom={36} paddingRight={24} paddingLeft={24}>
                <Text as="h2" type="2-bold">
                    Getting started
                </Text>
                <Spacing marginTop={18}>
                    <Text>
                        Please be aware of different versions of the Porsche UI Kit React npm package and align with
                        your design counterpart on the used Porsche UI Kit React React version. In general we recommend
                        updating the npm dependencies on a regular basis. All changes are documented in the{" "}
                        <a href="https://github.com/porscheui/porsche-ui-kit/tree/v0/react/packages/%40porsche/ui-kit-react/CHANGELOG.md">
                            Changelog v0 React
                        </a>
                        .
                    </Text>
                </Spacing>

                <Spacing marginTop={36}>
                    <Text as="h3" type="3-bold">
                        Install and use Porsche UI Kit React
                    </Text>
                </Spacing>

                <Spacing marginTop={18}>
                    <Text>
                        1. Create your React App (we recommend using <b>Create React App</b>)<br />
                        2. Import necessary styles to your _index.scss_ file.
                    </Text>
                </Spacing>

                <Spacing marginTop={36}>
                    <code>
                        @import "~@porsche/ui-kit-react/src/variables";
                        <br />
                        @import "~@porsche/ui-kit-react/src/common";
                        <br />
                        @import "~@porsche/ui-kit-react/src/index";
                    </code>
                </Spacing>

                <Spacing marginTop={36}>
                    <Text>
                        3. Reference UI Kit package in your package.json{" "}
                        <code>"@porsche/ui-kit-react": "^{reactpkg.version}"</code>
                        <br />
                        4. Set repository path in your .npmrc file:{" "}
                        <code>@porsche:registry = https://porscheui.jfrog.io/porscheui/api/npm/npm/</code>
                        <br />
                        5. Import and use React components as usual
                    </Text>
                </Spacing>
            </Spacing>
        </article>
    )
}

export default Introduction
