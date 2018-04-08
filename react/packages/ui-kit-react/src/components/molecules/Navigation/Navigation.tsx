import * as React from "react"
import * as PropTypes from "prop-types"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"

import { Breakpoint } from "../../../index"

import { NavigationDesktop } from "./NavigationDesktop"
import { NavigationMobile } from "./NavigationMobile"

export interface NavigationSection {
    key: string
    label: string | JSX.Element
    link?: string | (() => void)
    counter?: number
    menu?: JSX.Element
}

export interface NavigationProps {
    as?: string
    className?: string
    customAttributes?: {[key: string]: any}

    sections: NavigationSection[]
}

const propTypes = {
    /** The html element type to render as. */
    as: PropTypes.string,

    /** Additional CSS classes. */
    className: PropTypes.string,

    /** Custom dom attributes. */
    customAttributes: PropTypes.object,

    /** The navigation sections to be displayed. */
    sections: PropTypes.arrayOf(PropTypes.object).isRequired
}

const _meta: ComponentMeta = {
    name: "Navigation",
    type: META.TYPES.MOLECULE
}

/**
 * A responsive navigation bar.
 */
const _Navigation: React.StatelessComponent<NavigationProps> & Partial<MetaCategorizable> = (props) => {
    const {
        children,
        ...rest
    } = props

    return (
        <div>
            <Breakpoint maxWidth="s">
                <NavigationMobile {...rest} />
            </Breakpoint>
            <Breakpoint minWidth="s">
                <NavigationDesktop {...rest} />
            </Breakpoint>
        </div>
    )
}

_Navigation.propTypes = propTypes
_Navigation._meta = _meta

export const Navigation = _Navigation
