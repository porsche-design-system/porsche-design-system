import * as React from "react"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"

import { PageWrapper, AreaWrapper, ThemeWrapper, ContentWrapper, Text, Navigation } from "../../../index"

export interface ErrorScreenProps {
    /** The title of the error screen, displayed very large. */
    title: string

    /** The text under the large title. */
    text: string
}

const _meta: ComponentMeta = {
    name: "ErrorScreen",
    type: META.TYPES.SCREEN
}

const _ErrorScreen: React.StatelessComponent<ErrorScreenProps> & Partial<MetaCategorizable> = (props) => {
    const {
        title,
        text
    } = props

    return (
        <PageWrapper>
            <AreaWrapper as="header">
                <ThemeWrapper as="div">
                    <ContentWrapper>
                        <Navigation sections={[]}/>
                    </ContentWrapper>
                </ThemeWrapper>
            </AreaWrapper>
            <AreaWrapper as="main">
                <ThemeWrapper>
                    <Text as="h1" type="1-regular" color="grey-darker" align="center" className={"pui-error-title"}>
                        {title}
                    </Text>
                    <Text as="p" type="4-regular" color="grey-darker" align="center" className={"pui-error-text"}>
                        {text && text.split("\n").map((item: string, key: number) => {
                            return (
                                <span key={key}>
                                {item}
                                <br />
                                </span>
                            )
                        })}
                    </Text>
                </ThemeWrapper>
            </AreaWrapper>
            <AreaWrapper as="footer">
                <ThemeWrapper as="div">
                    <ContentWrapper>
                        Footer
                    </ContentWrapper>
                </ThemeWrapper>
            </AreaWrapper>
        </PageWrapper>
    )
}

_ErrorScreen._meta = _meta

/**
 * A generic error screen with a title and a text.
 */
export const ErrorScreen = _ErrorScreen as React.StatelessComponent<ErrorScreenProps>
