import * as React from "react"

import { Text } from "../../../index"
import { ClassNameProp } from "../../../lib/props"

const _ModalText: React.StatelessComponent<ClassNameProp> = (props) => {
    const { className, children, ...rest } = props

    return (
        <Text className={className} type="copy" color="black" {...rest}>
            {children}
        </Text>
    )
}

/**
 * The copy text for a modal.
 */
export const ModalText = _ModalText
