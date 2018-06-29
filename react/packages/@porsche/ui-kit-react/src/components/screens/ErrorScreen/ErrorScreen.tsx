import * as React from "react"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"

import { ContentWrapper, Text, Header } from "../../../index"

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
    const { title, text, children } = props

    return (
        <React.Fragment>
            <header>
                <ContentWrapper>
                    <Header sections={[]} />
                </ContentWrapper>
            </header>
            <main>
                <ContentWrapper>
                    <div className={prefix("error-screen__content")}>
                        <Text as="h1" color="grey-darker" align="center" className={prefix("error-screen__title")}>
                            {title}
                        </Text>
                        <Text as="p" type="4-regular" color="grey-darker" align="center">
                            {text &&
                                text.split("\n").map((item: string, key: number) => {
                                    return (
                                        <span key={key}>
                                            {item}
                                            <br />
                                        </span>
                                    )
                                })}
                        </Text>
                        {children}
                    </div>
                </ContentWrapper>
            </main>
        </React.Fragment>
    )
}

_ErrorScreen._meta = _meta

/**
 * A generic error screen with a title and a text.
 */
export const ErrorScreen = _ErrorScreen as React.StatelessComponent<ErrorScreenProps>
