import * as React from "react"

import { Text, Spacing } from "../../../index"
import { ClassNameProp } from "../../../lib/props"

const _ModalTitle: React.StatelessComponent<ClassNameProp> = (props) => {
    const { className, children, ...rest } = props

    return (
        <Spacing paddingBottom={18}>
            <Text className={className} type="2-thin" color="black">
                {children}
            </Text>
        </Spacing>
    )
}

/**
 * The title for a modal.
 */
export const ModalTitle = _ModalTitle
