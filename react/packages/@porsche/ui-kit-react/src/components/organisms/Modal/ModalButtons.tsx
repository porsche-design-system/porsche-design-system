import * as React from "react"

import { Flex, Spacing } from "../../../index"
import { ClassNameProp } from "../../../lib/props"

const _ModalButtons: React.StatelessComponent<ClassNameProp> = (props) => {
    const { className, children, ...rest } = props

    return (
        <Spacing paddingTop={24}>
            <Flex gap={6} alignMainAxis="start">
                {React.Children.map(children, (child, i) => (
                    <Spacing key={i} wrap marginTop={3} marginBottom={3}>
                        {child}
                    </Spacing>
                ))}
            </Flex>
        </Spacing>
    )
}

/**
 * A container for modal action buttons. You should probably only use one or more <Button /> components as children.
 * @see Button
 */
export const ModalButtons = _ModalButtons
