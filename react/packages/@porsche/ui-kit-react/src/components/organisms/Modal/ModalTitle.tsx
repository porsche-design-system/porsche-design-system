import * as React from "react"

import { Text, Spacing } from "../../../index"
import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"
import { ClassNameProp } from "../../../lib/props"

const _meta: ComponentMeta = {
    parent: "Modal",
    name: "ModalTitle",
    type: META.TYPES.ORGANISM
}

const _ModalTitle: React.StatelessComponent<ClassNameProp> & Partial<MetaCategorizable> = (props) => {
    const { className, children, ...rest } = props

    return (
        <Spacing paddingBottom={12}>
            <Text className={className} type="2-thin" color="black">
                {children}
            </Text>
        </Spacing>
    )
}

_ModalTitle._meta = _meta

/**
 * The title for a modal.
 */
export const ModalTitle = _ModalTitle
