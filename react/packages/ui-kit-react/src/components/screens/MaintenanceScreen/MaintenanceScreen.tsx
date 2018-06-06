import * as React from "react"

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"

import { ContentWrapper, Flex, Icon, Spacing, Button, Text, Header } from "../../../index"

export interface MaintenanceScreenProps {
    /** The title of the maintenance screen, displayed very large. */
    title: string

    /** The text under the large title. */
    text: string
}

const _meta: ComponentMeta = {
    name: "MaintenanceScreen",
    type: META.TYPES.SCREEN
}

const _MaintenanceScreen: React.StatelessComponent<MaintenanceScreenProps> & Partial<MetaCategorizable> = (props) => {
    const { title, text } = props

    return (
        <React.Fragment>
            <header>
                <ContentWrapper>
                    <Header sections={[]} />
                </ContentWrapper>
            </header>
            <main>
                <ContentWrapper>
                    <div className={prefix("maintenance-screen__content")}>
                        <Flex alignMainAxis="center">
                            <Icon circled color="red-1" name="maintenance" size="huge" />
                        </Flex>
                        <Spacing marginTop={"e"}>
                            <Text as="h1" type="1-thin" color="grey-darker" align="center">
                                {title}
                            </Text>
                        </Spacing>
                        <Spacing marginTop={"b"}>
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
                        </Spacing>
                    </div>
                </ContentWrapper>
            </main>
        </React.Fragment>
    )
}

_MaintenanceScreen._meta = _meta

/**
 * A generic maintenance screen with a title and a text.
 */
export const MaintenanceScreen = _MaintenanceScreen as React.StatelessComponent<MaintenanceScreenProps>
