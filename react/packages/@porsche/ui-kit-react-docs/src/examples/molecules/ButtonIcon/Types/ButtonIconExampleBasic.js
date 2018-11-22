import React from "react"
import { ButtonIcon, Spacing, Text } from "@porsche/ui-kit-react"

const ButtonIconExampleBasic = () => {
    return (
        <React.Fragment>
            <Spacing marginBottom={12}>
                <Text>Type: Basic</Text>
            </Spacing>
            <ButtonIcon icon="bin" />

            <Spacing marginTop={24} marginBottom={12}>
                <Text>Type: Ghost</Text>
            </Spacing>
            <ButtonIcon type="ghost" icon="bin" />

            <Spacing marginTop={24} marginBottom={12}>
                <Text>Type: Basic disabled</Text>
            </Spacing>
            <ButtonIcon disabled icon="bin" />
        </React.Fragment>
    )
}

export default ButtonIconExampleBasic
