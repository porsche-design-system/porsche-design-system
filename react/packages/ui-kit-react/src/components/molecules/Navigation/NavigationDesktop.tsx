import * as React from "react"
import * as PropTypes from "prop-types"
import cx from "classnames"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix, getElementType } from "../../../lib"

import { Flex, Divider, Flyout, Text, Spacing } from "../../../index"
import { NavigationSection, NavigationProps } from "./Navigation"

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
    name: "NavigationDesktop",
    parent: "Navigation",
    type: META.TYPES.MOLECULE
}

export interface NavigationDesktopState {
    hoveredSectionKey?: string
    isActive: boolean
}

/**
 * A navigation bar intended for larger screen sizes.
 */
export class NavigationDesktop extends React.PureComponent<NavigationProps, NavigationDesktopState> {
    static propTypes: any = propTypes
    static defaultProps = {
        as: "nav"
    }

    static _meta: ComponentMeta = _meta

    public state: NavigationDesktopState = {
        hoveredSectionKey: undefined,
        isActive: false
    }

    renderSection = (section: NavigationSection) => {
        return (
            <Flex.Item
                as="li"
                key={section.key}
                width="auto"
                className={prefix("nav__item")}
                customAttributes={{
                    onClick: this.onSectionUnhovered,
                    onMouseEnter: () => { this.onSectionHovered(section.key) },
                    onMouseLeave: this.onSectionUnhovered
                }}
            >
                <a
                    href={typeof section.link === "string" ? section.link : undefined}
                    onClick={typeof section.link === "function" ? section.link : undefined}
                    className={cx(
                        prefix("nav__item-link"),
                        {[prefix("nav__item-link--active")]: this.state.isActive}
                    )}
                >
                    {this.renderLabel(section.label, section.counter)}
                </a>

                {this.renderFlyout(section)}
            </Flex.Item>
        )
    }

    renderLabel = (label: string | JSX.Element, counter?: number) => {
        if (counter) {
            return (
                <Flex>
                    <span>{label}</span>
                    <Spacing marginLeft={6}>
                        <Text type="copy" color="red-1" as="span">
                            {counter}
                        </Text>
                    </Spacing>
                </Flex>
            )
        } else {
            return label
        }
    }

    renderFlyout = (section: NavigationSection) => {

        if (this.state.hoveredSectionKey === section.key && section.menu) {
        return (
            <Flyout className={prefix("nav__flyout")}>
                {section.menu}
            </Flyout>
        )
        } else {
            return null
        }
    }

    onSectionHovered = (key: string) => {
        this.setState({ hoveredSectionKey: key })
    }

    onSectionUnhovered = () => {
        this.setState({ hoveredSectionKey: undefined })
    }

    render() {
        const {
            as,
            className,
            customAttributes,
            sections,
            children,
            ...rest
        } = this.props

        const ElementType = getElementType(as, "nav")

        return (
            <ElementType
                className={className}
                {...customAttributes}
                {...rest}
            >
                <Flex as="ul" className={prefix("nav")}>
                    {this.props.sections && this.props.sections.length > 0 &&
                        this.props.sections.map(this.renderSection)
                    }
                </Flex>
                <Divider/>
            </ElementType>
        )
    }
}
