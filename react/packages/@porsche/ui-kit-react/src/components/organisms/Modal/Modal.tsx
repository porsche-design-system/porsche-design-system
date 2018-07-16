import * as React from "react"
import cx from "classnames"

// import ReactModal from "react-modal"
const ReactModal = require("react-modal")

import { MetaCategorizable, ComponentMeta } from "../../../types/MetaCategorizable"
import { META, prefix } from "../../../lib"
import { ClassNameProp } from "../../../lib/props"

import { ModalTitle } from "./ModalTitle"
import { ModalText } from "./ModalText"
import { ModalButtons } from "./ModalButtons"
import { Icon } from "../../atoms/Icon/Icon"

export interface Modal extends React.StatelessComponent<ModalProps> {
    /**
     * Call this to properly hide your application from assistive screenreaders
     * and other assistive technologies while the modal is open.
     */
    setAppElement: (element: string | HTMLElement) => void

    Title: typeof ModalTitle
    Text: typeof ModalText
    Buttons: typeof ModalButtons
}

export interface ModalProps extends ClassNameProp {
    /**
     * Use setAppElement to properly hide your application from assistive screenreaders and other assistive technologies while the modal is open.
     * If you can't you can disable that functionality by setting ariaHideApp={false}, but this is not recommended.
     */
    ariaHideApp?: boolean

    /**
     * String indicating how the content container should be announced to screenreaders.
     */
    contentLabel?: string

    /**
     * Usually a modal is fairly narrow to ensure a sensible text line length. If you have more complex content you can use fullWidth to allow the modal to span the entire webpage (minus margins).
     * @default false
     */
    fullWidth?: boolean

    /**
     * Boolean describing if the modal should be shown or not. Defaults to false.
     */
    isOpen: boolean

    /**
     * Function that will be run when the modal is requested to be closed, prior to actually closing.
     */
    onRequestClose: () => void

    /**
     * A modal shows a close icon at its top right corner. You can disable this by setting showCloseIcon to false.
     * @default true
     */
    showCloseIcon?: boolean
}

const defaultProps: Partial<ModalProps> = {
    showCloseIcon: true,
    ariaHideApp: true
}

const _meta: ComponentMeta = {
    name: "Modal",
    type: META.TYPES.ORGANISM
}

const _Modal: React.StatelessComponent<ModalProps> & Partial<Modal> & Partial<MetaCategorizable> = (props) => {
    const {
        className,
        children,
        contentLabel,
        isOpen,
        fullWidth,
        onRequestClose,
        ariaHideApp,
        showCloseIcon,
        ...rest
    } = props

    const classes = cx(prefix("modal"), { [prefix("modal--full-width")]: fullWidth }, className)

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
            {showCloseIcon && (
                <div className={prefix("modal__close-container")}>
                    <Icon
                        name="cancel"
                        size="medium"
                        className={prefix("modal__close")}
                        {...{ onClick: onRequestClose }}
                    />
                </div>
            )}
            <div className={prefix("modal__content")}>{children}</div>
        </ReactModal>
    )
}

_Modal.defaultProps = defaultProps
_Modal._meta = _meta

_Modal.setAppElement = (element) => {
    ReactModal.setAppElement(element)
}

_Modal.Title = ModalTitle
_Modal.Text = ModalText
_Modal.Buttons = ModalButtons

/**
 * A modal container with a transparent background.
 */
export const Modal = _Modal as Modal
