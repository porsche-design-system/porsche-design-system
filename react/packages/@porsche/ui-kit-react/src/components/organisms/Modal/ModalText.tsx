import * as React from "react"

import { Text } from "../../../index"
import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META } from "../../../lib"
import { ClassNameProp } from "../../../lib/props"

const _meta: ComponentMeta = {
    parent: "Modal",
    name: "ModalText",
    type: META.TYPES.ORGANISM
}

const _ModalText: React.StatelessComponent<ClassNameProp> & Partial<MetaCategorizable> = (props) => {
    const { className, children, ...rest } = props

    return (
        <Text className={className} type="copy" color="black">
            {children}
        </Text>
    )
}

_ModalText._meta = _meta

/**
 * The copy text for a modal.
 */
export const ModalText = _ModalText
