import * as React from "react"

import { Flex, Spacing } from "../../../index"
import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"
import { ClassNameProp } from "../../../lib/props"

const _meta: ComponentMeta = {
    parent: "Modal",
    name: "ModalButtons",
    type: META.TYPES.ORGANISM
}

const _ModalButtons: React.StatelessComponent<ClassNameProp> & Partial<MetaCategorizable> = (props) => {
    const { className, children, ...rest } = props

    return (
        <Spacing paddingTop={24}>
            <Flex gap={6} alignMainAxis="end">
                {React.Children.map(children, (child, i) => (
                    <Spacing key={i} wrap marginTop={3} marginBottom={3}>
                        {child}
                    </Spacing>
                ))}
            </Flex>
        </Spacing>
    )
}

_ModalButtons._meta = _meta

/**
 * A container for modal action buttons. You should probably only use one or more <Button /> components as children.
 * @see Button
 */
export const ModalButtons = _ModalButtons
