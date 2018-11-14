import * as React from "react"
import cx from "classnames"

import { prefix, getElementType } from "../../../lib"
import { Flex, Divider, Flyout, Text, Spacing } from "../../.."

import { NavigationProps, NavigationSection } from "./Navigation"

export interface NavigationDesktopState {
    hoveredSectionKey?: string
    isActive: boolean
}

/**
 * A navigation bar intended for larger screen sizes.
 */
export class NavigationDesktop extends React.PureComponent<NavigationProps, NavigationDesktopState> {
    static defaultProps = {
        as: "nav"
    }

    public state: NavigationDesktopState = {
        hoveredSectionKey: undefined,
        isActive: false
    }

    renderSection = (section: NavigationSection) => {
        const LinkElementType = section.component || "a"
        return (
            <Flex.Item
                as="li"
                key={section.key}
                className={prefix("nav__item")}
                {...{
                    onMouseLeave: this.onSectionUnhovered,
                    onClick: this.onSectionUnhovered
                }}
            >
                <LinkElementType
                    // tslint:disable:jsx-no-lambda
                    onMouseEnter={() => this.onSectionHovered(section.key)}
                    onTouchStart={() => this.onSectionHovered(section.key)}
                    onFocus={() => this.onSectionHovered(section.key)}
                    onTouchEnd={this.onSectionUnhovered}
                    className={cx(prefix("nav__item-link"))}
                    {...section.props}
                >
                    {this.renderLabel(section.label, section.counter)}
                </LinkElementType>

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
            return <Flyout className={prefix("nav__flyout")}>{section.menu}</Flyout>
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
        const { as, className, sections, children, title, ...rest } = this.props

        const ElementType = getElementType(as, "nav")

        return (
            <ElementType className={className} {...rest}>
                <Flex as="ul" className={prefix("nav")}>
                    {this.props.sections &&
                        this.props.sections.length > 0 &&
                        this.props.sections.map(this.renderSection)}
                </Flex>
                <Divider />
            </ElementType>
        )
    }
}
