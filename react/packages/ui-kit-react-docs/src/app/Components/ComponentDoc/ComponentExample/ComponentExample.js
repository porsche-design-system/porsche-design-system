import * as Babel from "babel-standalone"

import { Divider, Grid, Menu } from "semantic-ui-react"
import React, { Component, createElement, isValidElement } from "react"

import ComponentControls from "../ComponentControls"
import ComponentExampleTitle from "./ComponentExampleTitle"
import Editor from "src/app/Components/Editor/Editor"
import PropTypes from "prop-types"
import _ from "lodash"
import copyToClipboard from "copy-to-clipboard"
import { exampleContext } from "src/app/utils"
import { html } from "js-beautify"
import { renderToStaticMarkup } from "react-dom/server"
import { withRouter } from "react-router"

const babelConfig = {
    presets: ["es2015", "react", "stage-1"]
}

const headerColumnStyle = {
    // provide room for absolutely positions toggle code icons
    paddingRight: "2em"
}

const childrenStyle = {
    paddingTop: 0,
    maxWidth: "33em"
}

const errorStyle = {
    padding: "1em",
    fontSize: "0.9rem",
    color: "#a33",
    background: "#fff2f2"
}

/**
* Renders a `component` and the raw `code` that produced it.
* Allows toggling the the raw `code` code block.
*/
class ComponentExample extends Component {
    static propTypes = {
        children: PropTypes.node,
        examplePath: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        title: PropTypes.node
    }

    componentWillMount() {
        const { examplePath } = this.props
        const sourceCode = this.getOriginalSourceCode()

        this.anchorName = _.kebabCase(_.last(examplePath.split("/")))

        // show code for direct links to examples
        const showCode = this.anchorName === location.hash.replace("#", "")
        const exampleElement = this.renderOriginalExample()
        const markup = renderToStaticMarkup(exampleElement)

        this.setState({
            exampleElement,
            showCode,
            sourceCode,
            markup
        })
    }

    setHashAndScroll = () => {
        const { history } = this.props
        history.replace(`${this.props.match.url}#${this.anchorName}`)
    }

    removeHash = () => {
        const { history } = this.props
        history.replace(this.props.match.url)
    }

    handleDirectLinkClick = () => {
        this.setHashAndScroll()
        copyToClipboard(location.href)
    }

    handleMouseEnter = () => { return this.setState({ controlsVisible: true }) }

    handleMouseLeave = () => { return this.setState({ controlsVisible: false }) }

    handleShowCodeClick = (e) => {
        e.preventDefault()

        const { showCode } = this.state
        this.setState({ showCode: !showCode })

        if (!showCode) this.setHashAndScroll()
        else this.removeHash()
    }

    handleShowHTMLClick = (e) => {
        e.preventDefault()

        const { showHTML } = this.state
        this.setState({ showHTML: !showHTML })

        if (!showHTML) this.setHashAndScroll()
        else this.removeHash()
    }

    copyJSX = () => {
        copyToClipboard(this.state.sourceCode)
        this.setState({ copiedCode: true })
        setTimeout(() => { return this.setState({ copiedCode: false }) }, 1000)
    }

    resetJSX = () => {
        const { sourceCode } = this.state
        const original = this.getOriginalSourceCode()
        if (sourceCode !== original && confirm("Lose your changes?")) { // eslint-disable-line no-alert
            this.setState({ sourceCode: original })
            this.renderSourceCode()
        }
    }

    getOriginalSourceCode = () => {
        const { examplePath } = this.props

        if (!this.sourceCode) this.sourceCode = require(`!raw-loader!src/examples/${examplePath}`)

        return this.sourceCode
    }

    getKebabExamplePath = () => {
        if (!this.kebabExamplePath) this.kebabExamplePath = _.kebabCase(this.props.examplePath)

        return this.kebabExamplePath
    }

    renderError = _.debounce((error) => {
        this.setState({ error })
    }, 800)

    renderOriginalExample = () => {
        const { examplePath } = this.props
        return createElement(exampleContext(`./${examplePath}.js`).default)
    }

    renderSourceCode = _.debounce(() => {
        const { examplePath } = this.props
        const { sourceCode } = this.state
        // Heads Up!
        //
        // These are used in the code editor scope when rewriting imports to const statements
        // We use require() to preserve variable names
        // Webpack rewrites import names
        /* eslint-disable no-unused-vars */
        const LODASH = require("lodash")
        const REACT = require("react")
        const UI_KIT_REACT = require("@porsche/ui-kit-react")
        const LOREM_IPSUM = require("lorem-ipsum")
        let COMMON
        /* eslint-enable no-unused-vars */

        // Should use an AST transform here... oh well :/
        // Rewrite the example file into an IIFE that returns a component
        // which can be rendered in this ComponentExample's render() method

        // rewrite imports to const statements against the UPPERCASE module names
        const imports = _.get(/(^import[\s\S]*from[\s\S]*['"];?\n)/.exec(sourceCode), "[1]", "")
            .replace(/[\s\n]+/g, " ") // normalize spaces and make one line
            .replace(/ import/g, "\nimport") // one import per line
            .split("\n") // split lines
            .filter(Boolean) // remove empty lines
            .map((l) => { // rewrite imports to const statements
                const [
                    defaultImport,
                    destructuredImports,
                    _module
                ] = _.tail(/import\s+([\w]+)?(?:\s*,\s*)?({[\s\w,]+})?\s+from\s+['"](?:.*\/)?([\w\-_]+)['"]/.exec(l))

                const module = _.snakeCase(_module).toUpperCase()

                if (module === "COMMON") {
                    const componentPath = examplePath.split(__PATH_SEP__).splice(0, 2).join(__PATH_SEP__)
                    COMMON = require(`src/examples/${componentPath}/common`)
                }

                const constStatements = []
                if (defaultImport) constStatements.push(`const ${defaultImport} = ${module}`)
                if (destructuredImports) constStatements.push(`const ${destructuredImports} = ${module}`)
                constStatements.push("\n")

                return constStatements.join("\n")
            })
            .join("\n")

        // capture the default export so we can return it from the IIFE
        const defaultExport = _.get(/export\s+default\s+(?:class|function)?(?:\s+)?(\w+)/.exec(sourceCode), "[1]")

        // consider everything after the imports to be the body
        // remove `export` statements except `export default class|function`
        const body = _.get(/import[\s\S]*from.*\n([\s\S]*)/.exec(sourceCode), "[1]", "")
            .replace(/export\s+default\s+(?!class|function)\w+([\s\n]+)?/, "") // remove `export default Foo` statements
            .replace(/export\s+default\s+/, "") // remove `export default ...`

        const IIFE = `(function() {\n${imports}${body}return ${defaultExport}\n}())`

        try {
            const { code } = Babel.transform(IIFE, babelConfig)
            const Example = eval(code) // eslint-disable-line no-eval
            const exampleElement = _.isFunction(Example) ? <Example /> : Example

            if (!isValidElement(exampleElement)) {
                this.renderError(`Default export is not a valid element. Type:${{}.toString.call(exampleElement)}`)
            } else {
                // immediately render a null error
                // but also ensure the last debounced error call is a null error
                const error = null
                this.renderError(error)
                this.setState({
                    error,
                    exampleElement,
                    markup: renderToStaticMarkup(exampleElement)
                })
            }
        } catch (err) {
            this.renderError(err.message)
        }
    }, 100)

    handleChangeCode = (sourceCode) => {
        this.setState({ sourceCode })
        this.renderSourceCode()
    }

    renderJSXControls = () => {
        const { copiedCode, error } = this.state

        const color = error ? "red" : "black"
        return (
            <Divider horizontal fitted>
                <Menu text>
                    <Menu.Item
                        active={copiedCode || !!error} // to show the color
                        color={copiedCode ? "red" : color}
                        onClick={this.copyJSX}
                        icon={!copiedCode && "copy"}
                        content={copiedCode ? "Copied!" : "Copy"}
                    />
                    <Menu.Item
                        active={!!error} // to show the color
                        color={color}
                        icon="refresh"
                        content="Reset"
                        onClick={this.resetJSX}
                    />
                </Menu>
            </Divider>
        )
    }

    renderJSX = () => {
        const { error, showCode, sourceCode } = this.state
        if (!showCode) return <div />

        const style = { width: "100%" }
        if (error) {
            style.boxShadow = `inset 0 0 0 1em ${errorStyle.background}`
        }

        return (
            <div style={style}>
                {this.renderJSXControls()}
                <Editor
                    id={`${this.getKebabExamplePath()}-jsx`}
                    value={sourceCode}
                    onChange={this.handleChangeCode}
                />
                {error && (
                    <pre style={errorStyle}>{error}</pre>
                )}
            </div>
        )
    }

    renderHTML = () => {
        const { showHTML, markup } = this.state
        if (!showHTML) return <div />

        // add new lines between almost all adjacent elements
        // moves inline elements to their own line
        const preFormattedHTML = markup
            .replace(/><(?!\/i|\/label|\/span|option)/g, ">\n<")

        const beautifiedHTML = html(preFormattedHTML, {
            indent_size: 2,
            indent_char: " ",
            wrap_attributes: "auto",
            wrap_attributes_indent_size: 2,
            end_with_newline: false
        })

        return (
            <div>
                <Divider horizontal>Rendered HTML</Divider>
                <Editor id={`${this.getKebabExamplePath()}-html`} mode="html" value={beautifiedHTML} readOnly />
            </div>
        )
    }

    render() {
        const { children, title } = this.props
        const { controlsVisible, exampleElement, showCode, showHTML } = this.state
        const exampleStyle = {
        }

        if (showCode || showHTML || location.hash === `#${this.anchorName}`) {
            exampleStyle.boxShadow = "0 0 30px #ccc"
        }

        return (
            <Grid
                className="docs-example"
                id={this.anchorName}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={exampleStyle}
            >
                <Grid.Row style={{ paddingBottom: "0" }}>
                    <Grid.Column style={headerColumnStyle} width={12}>
                        <ComponentExampleTitle
                            title={title}
                        />
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={4} style={{ minHeight: "44px" }}>
                        <ComponentControls
                            anchorName={this.anchorName}
                            onCopyLink={this.handleDirectLinkClick}
                            onShowCode={this.handleShowCodeClick}
                            onShowHTML={this.handleShowHTMLClick}
                            showCode={showCode}
                            showHTML={showHTML}
                            visible={controlsVisible}
                        />
                    </Grid.Column>
                </Grid.Row>

                {children && (
                    <Grid.Row columns={1} style={{ paddingTop: "0" }}>
                        <Grid.Column style={childrenStyle}>
                            {children}
                        </Grid.Column>
                    </Grid.Row>
                )}

                <Grid.Row columns={1}>
                    <Grid.Column className={`rendered-example ${this.getKebabExamplePath()}`}>
                        {exampleElement}
                    </Grid.Column>
                    <Grid.Column>
                        {this.renderJSX()}
                        {this.renderHTML()}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1} />
            </Grid>
        )
    }
}

export default withRouter(ComponentExample)
