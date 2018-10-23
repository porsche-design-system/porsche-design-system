import { Input, Menu } from "semantic-ui-react"
import React, { Component } from "react"
import { keyboardKey } from "src/app/utils"
import { getStories } from "src/app/stories"

import Logo from "src/app/Components/Logo/Logo"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import _ from "lodash/fp"
import { findDOMNode } from "react-dom"
import reactpkg from "./../../../../../ui-kit-react/package.json"
import { withRouter } from "react-router"

import { groupBy } from "lodash"

const selectedItemLabel = (
    <span className="ui green" style={{ float: "right" }}>
        Press Enter
    </span>
)

class Sidebar extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        style: PropTypes.object
    }
    state = { query: "" }
    filteredStories = []

    componentDidMount() {
        document.addEventListener("keydown", this.handleDocumentKeyDown)
        this.setSearchInput()
    }

    componentDidUpdate() {
        this.setSearchInput()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown)
    }

    setSearchInput() {
        // TODO: Replace findDOMNode with Ref component when it will be merged
        this._searchInput = findDOMNode(this).querySelector(".ui.input input") // eslint-disable-line react/no-find-dom-node
    }

    handleDocumentKeyDown = (e) => {
        const code = keyboardKey.getCode(e)
        const isAZ = code >= 65 && code <= 90
        const hasModifier = e.altKey || e.ctrlKey || e.metaKey
        const bodyHasFocus = document.activeElement === document.body

        if (!hasModifier && isAZ && bodyHasFocus) this._searchInput.focus()
    }

    handleItemClick = () => {
        const { query } = this.state

        if (query) this.setState({ query: "" })
        if (document.activeElement === this._searchInput) this._searchInput.blur()
    }

    handleSearchChange = (e) => {
        return this.setState({
            selectedItemIndex: 0,
            query: e.target.value
        })
    }

    handleSearchKeyDown = (e) => {
        const { history } = this.props
        const { selectedItemIndex } = this.state
        const code = keyboardKey.getCode(e)

        if (code === keyboardKey.Enter && this.selectedRoute) {
            e.preventDefault()
            history.push(this.selectedRoute)
            this.selectedRoute = null
            this._searchInput.blur()
            this.setState({ query: "" })
        }

        if (code === keyboardKey.ArrowDown) {
            e.preventDefault()
            const next = _.min([selectedItemIndex + 1, this.filteredStories.length - 1])
            const nextComponentExample = this.filteredStories[next]
            this.selectedRoute = nextComponentExample.route
            this.setState({ selectedItemIndex: next })
        }

        if (code === keyboardKey.ArrowUp) {
            e.preventDefault()
            const next = _.max([selectedItemIndex - 1, 0])
            const nextComponentExample = this.filteredStories[next]
            this.selectedRoute = nextComponentExample.route
            this.setState({ selectedItemIndex: next })
        }
    }

    menuItemsByType = () => {
        const groupedStories = groupBy(getStories(), "type")
        const categories = Object.keys(groupedStories).map((type) => {
            const category = groupedStories[type]
            const menuItems = category.map((story) => {
                return (
                    <Menu.Item
                        key={story.name}
                        name={story.name}
                        onClick={this.handleItemClick}
                        as={NavLink}
                        to={story.route}
                        activeClassName="active"
                    />
                )
            })
            return (
                <Menu.Item key={type}>
                    <Menu.Header>{_.capitalize(type)}s</Menu.Header>
                    <Menu.Menu>{menuItems}</Menu.Menu>
                </Menu.Item>
            )
        })

        return categories
    }

    renderSearchItems = () => {
        const { selectedItemIndex, query } = this.state
        if (!query) return null

        let itemIndex = -1
        const startsWithMatches = []
        const containsMatches = []

        getStories().forEach((story) => {
            if (new RegExp(`^${_.escapeRegExp(query)}`, "i").test(story.name)) {
                startsWithMatches.push(story)
            } else if (new RegExp(_.escapeRegExp(query), "i").test(story.name)) {
                containsMatches.push(story)
            }
        })

        this.filteredStories = [...startsWithMatches, ...containsMatches]

        const menuItems = this.filteredStories.map((story) => {
            itemIndex += 1
            const isSelected = itemIndex === selectedItemIndex

            if (isSelected) {
                this.selectedRoute = story.route
            }

            return (
                <Menu.Item
                    key={story.name}
                    name={story.name}
                    onClick={this.handleItemClick}
                    active={isSelected}
                    as={NavLink}
                    to={story.route}
                >
                    {story.name}
                    {isSelected && selectedItemLabel}
                </Menu.Item>
            )
        })

        return <Menu.Menu>{menuItems}</Menu.Menu>
    }

    render() {
        const { style } = this.props
        const { query } = this.state
        return (
            <Menu vertical fixed="left" inverted style={{ ...style }}>
                <Menu.Item>
                    <Logo spaced="right" size="mini" />
                    <strong>
                        Porsche UI Kit React&nbsp;
                        <small>
                            <em>
                                (v.
                                {reactpkg.version})
                            </em>
                        </small>
                    </strong>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Getting Started</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={NavLink} to="/introduction" activeClassName="active">
                            Introduction
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Input
                        className="transparent inverted icon"
                        icon="search"
                        placeholder="Start typing..."
                        value={query}
                        onChange={this.handleSearchChange}
                        onKeyDown={this.handleSearchKeyDown}
                    />
                </Menu.Item>
                {query ? this.renderSearchItems() : this.menuItemsByType()}
            </Menu>
        )
    }
}

export default withRouter(Sidebar)
