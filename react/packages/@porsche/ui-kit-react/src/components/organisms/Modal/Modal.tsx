import * as React from "react"
import cx from "classnames"

// import ReactModal from "react-modal"
const ReactModal = require("react-modal")

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"
import { ClassNameProp } from "../../../lib/props"

export interface Modal extends React.StatelessComponent<ModalProps> {
    /**
     * Call this to properly hide your application from assistive screenreaders
     * and other assistive technologies while the modal is open.
     */
    setAppElement: (element: string | HTMLElement) => void
}

export interface ModalProps extends ClassNameProp {
    /**
     * String indicating how the content container should be announced to screenreaders.
     */
    contentLabel?: string

    /**
     * Boolean describing if the modal should be shown or not. Defaults to false.
     */
    isOpen: boolean

    /**
     * Function that will be run when the modal is requested to be closed, prior to actually closing.
     */
    onRequestClose: () => void

    /**
     * Use setAppElement to properly hide your application from assistive screenreaders and other assistive technologies while the modal is open.
     * If you can't you can disable that functionality by setting ariaHideApp={false}, but this is not recommended.
     */
    ariaHideApp?: boolean
}

const defaultProps: Partial<ModalProps> = {
    ariaHideApp: true
}

const _meta: ComponentMeta = {
    name: "Modal",
    type: META.TYPES.ORGANISM
}

/**
 * A modal container with a transparent background.
 */
const _Modal: React.StatelessComponent<ModalProps> & Partial<Modal> & Partial<MetaCategorizable> = (props) => {
    const { className, children, contentLabel, isOpen, onRequestClose, ariaHideApp, ...rest } = props

    const classes = cx(prefix("modal"), className)

    return (
        <ReactModal
            className={classes}
            isOpen={isOpen}
            portalClassName={prefix("modal__portal")}
            overlayClassName={prefix("modal__overlay")}
            bodyOpenClassName={prefix("modal__body--open")}
            shouldCloseOnOverlayClick={true}
            onRequestClose={onRequestClose}
            closeTimeoutMS={100}
            contentLabel={contentLabel}
            ariaHideApp={ariaHideApp}
            {...rest}
        >
            <div className={prefix("modal__content")}>{children}</div>
        </ReactModal>
    )
}

_Modal.defaultProps = defaultProps
_Modal._meta = _meta

_Modal.setAppElement = (element) => {
    ReactModal.setAppElement(element)
}

export const Modal = _Modal as Modal
