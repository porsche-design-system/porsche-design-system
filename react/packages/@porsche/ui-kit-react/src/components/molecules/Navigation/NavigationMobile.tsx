import * as React from "react"
import cx from "classnames"

import { prefix, getElementType } from "../../../lib"

import { ContentWrapper, Flex, Text, Icon, Spacing } from "../../../index"
import { NavigationSection, NavigationProps } from "./Navigation"

export interface NavigationMobileState {
    isOpened: boolean
    openedSectionKey?: string
}

/**
 * A navigation bar intended for smaller screen sizes.
 */
export class NavigationMobile extends React.PureComponent<NavigationProps, NavigationMobileState> {
    static defaultProps = {
        as: "nav"
    }

    public state: NavigationMobileState = {
        isOpened: false
    }

    openNav = () => {
        this.setState({ isOpened: true })
        document.body.classList.add(prefix("nav-mobile--active"))
    }

    closeNav = () => {
        this.setState({ isOpened: false })
        document.body.classList.remove(prefix("nav-mobile--active"))
    }

    renderSectionRow = (section: NavigationSection) => {
        const LinkElementType = section.component || "a"

        return (
            <li key={section.key} className={prefix("nav-mobile__row")}>
                <ContentWrapper as="div" className={prefix("nav-mobile__item-wrapper")}>
                    <LinkElementType
                        className={prefix("nav-mobile__item")}
                        // tslint:disable-next-line jsx-no-lambda
                        onClick={() =>
                            !section.menu ? this.resetEvenMore() : this.setState({ openedSectionKey: section.key })
                        }
                        {...section.props}
                    >
                        {this.renderSectionLabel(section.label, section.counter)}
                        <Spacing marginLeft="auto">
                            <Icon name="arrow_right_hair" className={prefix("nav-mobile__icon")} />
                        </Spacing>
                    </LinkElementType>
                </ContentWrapper>
                {section && section.menu && this.renderSectionOverlay(section)}
            </li>
        )
    }

    renderSectionLabel = (label: string | JSX.Element, counter?: number) => {
        if (counter) {
            return (
                <span>
                    <span>{label}</span>
                    <Spacing marginLeft={6}>
                        <Text type="copy" color="red-1" as="span">
                            {counter}
                        </Text>
                    </Spacing>
                </span>
            )
        } else {
            return label
        }
    }

    resetOpenedSectionKey = () => {
        this.setState({ openedSectionKey: undefined })
    }

    resetEvenMore = () => {
        this.setState({ isOpened: false, openedSectionKey: undefined })
        document.body.classList.remove(prefix("nav-mobile--active"))
    }

    renderSectionOverlay = (section: NavigationSection) => {
        const classesOverlay = cx(
            prefix("nav-mobile__overlay"),
            section.menu && this.state.openedSectionKey === section.key ? prefix("nav-mobile__overlay--active") : null
        )

        return (
            <div className={classesOverlay}>
                <ContentWrapper as="div" className={prefix("nav-mobile__bgtop")}>
                    <Flex
                        alignCrossAxis="center"
                        alignMainAxis="center"
                        className={prefix("nav-mobile__top")}
                        {...{
                            onClick: this.resetOpenedSectionKey
                        }}
                    >
                        <Spacing marginRight="auto">
                            <Icon name="arrow_left_hair" className={prefix("nav-mobile__icon")} />
                        </Spacing>
                        <Spacing marginRight="auto">
                            <span>{section.label}</span>
                        </Spacing>
                    </Flex>
                </ContentWrapper>
                <div onClick={this.resetEvenMore}>
                    {section.menu && React.cloneElement(section.menu, { mobile: true })}
                </div>
            </div>
        )
    }

    render() {
        const { as, className, sections, children, title, ...rest } = this.props

        const ElementType = getElementType(as, "nav")

        return (
            <ElementType className={cx(prefix("nav-mobile"), className)} {...rest}>
                <Flex className={prefix("nav-mobile__bar")} alignMainAxis="end">
                    <button className={prefix("nav-mobile__trigger")} onClick={this.openNav}>
                        {title}
                    </button>
                </Flex>

                <div
                    className={cx(
                        className,
                        prefix("nav-mobile__overlay"),
                        this.state.isOpened ? prefix("nav-mobile__overlay--active") : null
                    )}
                >
                    <ContentWrapper as="div" className={prefix("nav-mobile__bgtop")}>
                        <div onClick={this.closeNav}>
                            <Flex alignCrossAxis="center" alignMainAxis="center" className={prefix("nav-mobile__top")}>
                                <Spacing marginRight="auto">
                                    <Icon name="arrow_left_hair" className={prefix("nav-mobile__icon")} />
                                </Spacing>
                                <Spacing marginRight="auto">
                                    <span>{title}</span>
                                </Spacing>
                            </Flex>
                        </div>
                    </ContentWrapper>
                    <ul>{this.props.sections.map(this.renderSectionRow)}</ul>
                </div>
            </ElementType>
        )
    }
}
