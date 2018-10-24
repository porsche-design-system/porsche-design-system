import * as React from "react"

import { ClassNameProp, ComponentProp } from "../../../lib/props"

import { Breakpoint } from "../../../index"

import { NavigationDesktop } from "./NavigationDesktop"
import { NavigationMobile } from "./NavigationMobile"

export interface NavigationSection {
    key: string
    label: string | JSX.Element
    counter?: number
    menu?: JSX.Element
    component?: React.ComponentClass
    props?: object
}

export interface NavigationProps extends ClassNameProp, ComponentProp {
    /** The navigation sections to be displayed. */
    sections: NavigationSection[]
    /** The mobile navigation trigger text. */
    title?: string | JSX.Element
}

/**
 * A responsive navigation bar.
 */
const _Navigation: React.StatelessComponent<NavigationProps> = (props) => {
    const { children, ...rest } = props

    return (
        <React.Fragment>
            <Breakpoint maxWidth="s">
                <NavigationMobile {...rest} />
            </Breakpoint>
            <Breakpoint minWidth="s">
                <NavigationDesktop {...rest} />
            </Breakpoint>
        </React.Fragment>
    )
}

export const Navigation = _Navigation
