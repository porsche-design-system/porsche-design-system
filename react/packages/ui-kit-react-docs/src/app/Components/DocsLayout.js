import React, { Component } from "react"

import AnchorJS from "anchor-js"
import PropTypes from "prop-types"
import { Route } from "react-router-dom"
import Sidebar from "src/app/Components/Sidebar/Sidebar"
import style from "src/app/Style"

import { scrollToAnchor } from "src/app/utils"

const anchors = new AnchorJS({
    icon: "#"
})

export default class DocsLayout extends Component {
    static propTypes = {
        component: PropTypes.func,
        render: PropTypes.func
    }

    componentDidMount() {
        this.resetPage()
    }

    componentDidUpdate() {
        this.resetPage()
    }

    componentWillUnmount() {
        clearTimeout(this.scrollStartTimeout)
    }

    resetPage = () => {
        // only reset the page when changing routes
        if (this.pathname === location.pathname) return

        clearTimeout(this.scrollStartTimeout)

        scrollTo(0, 0)

        anchors.add("h2, h3, h4, h5, h6")
        anchors.remove([1, 2, 3, 4, 5, 6].map((n) => { return `.rendered-example h${n}` }).join(", "))
        anchors.remove(".no-anchor")

        this.scrollStartTimeout = setTimeout(scrollToAnchor, 500)
        this.pathname = location.pathname
    }

    renderChildren = (props) => {
        const { component: Children, render } = this.props

        if (render) return render()
        return (
            <div style={style.container}>
                <Sidebar style={style.menu} />
                <div style={style.main}>
                    <Children {...props} />
                </div>
            </div>
        )
    }

    render() {
        const { component: Children, render, ...rest } = this.props
        return <Route {...rest} render={this.renderChildren} />
    }
}
