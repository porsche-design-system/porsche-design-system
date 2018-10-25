import * as React from "react"
import cx from "classnames"
import { getElementType, prefix } from "../../../lib"
import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Divider, Flex } from "../../.."
import { FlexMainAxis } from "../../atoms/Flex/Flex"

export interface TabProps extends ClassNameProp, ComponentProp {
    /** The different tab items */
    panes: TabPane[]
    /** Aligns the tab items horizontally. By default the tabs are centered */
    alignment?: "left" | "center" | "right"
    /** Controls if the component is displayed with a smaller dimension */
    mini?: boolean
}

export interface TabPane {
    /** The unique identifier */
    key: any
    /** The rendered tab pane header */
    menuItem: string | JSX.Element
    /** Responsible to render the tab pane content */
    render?: () => string | JSX.Element | null
    /** Flag that controls which tab pane is displayed. */
    active?: boolean | (() => boolean)
    /** Callback to handle the click event outside of the component */
    onClick?: (event: React.MouseEvent<HTMLElement>, pane: TabPane) => void
}

const defaultProps: Partial<TabProps> = {
    alignment: "center"
}

const _Tab: React.StatelessComponent<TabProps> = (props) => {
    const { as, className, panes, alignment, mini, ...rest } = props

    const classes = cx(className)

    const flexAlignment = alignment && toFlexAlignment(alignment)

    const ElementType = getElementType(as, "div")
    const classesTab = cx(prefix("tab"))

    return (
        <ElementType className={classes} {...rest}>
            <Flex className={classesTab} alignMainAxis={flexAlignment}>
                {panes.map((pane) => {
                    const classMenuItem = cx(
                        prefix("tab__menu-item"),
                        { [prefix("tab__menu-item--active")]: toFlag(pane.active) },
                        { [prefix("tab__menu-item--mini")]: mini }
                    )
                    return (
                        <a
                            key={pane.key}
                            className={classMenuItem}
                            onClick={(event) => pane.onClick && pane.onClick(event, pane)}
                        >
                            {pane.menuItem}
                        </a>
                    )
                })}
            </Flex>
            <Divider />
            {panes.map((pane) => {
                const classContent = cx(prefix("tab__content"), {
                    [prefix("tab__content--active")]: toFlag(pane.active)
                })
                return (
                    <article key={pane.key} className={classContent}>
                        {pane.render && pane.render()}
                    </article>
                )
            })}
        </ElementType>
    )
}

const toFlexAlignment = (alignment: string): FlexMainAxis => {
    switch (alignment) {
        case "left":
            return "start"
        case "center":
            return "center"
        case "right":
            return "end"
        default:
            throw Error(`Not supported alignment: ${alignment}`)
    }
}

const toFlag = (arg?: boolean | (() => boolean)): boolean => {
    if (arg === undefined) {
        return false
    }

    if (typeof arg === "boolean") {
        return arg as boolean
    }

    if (typeof arg === "function") {
        return arg()
    }

    return false
}

_Tab.defaultProps = defaultProps

/**
 * The Tab component is a hidden section of content activated by a Menu.
 */
export const Tab = _Tab as React.StatelessComponent<TabProps>
