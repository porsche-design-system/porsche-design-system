import "./ModalExampleWideCustomContainer.css"
import React from "react"
import { Modal, Button } from "@porsche/ui-kit-react"

class ModalExampleWide extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = { modal: false }
    }

    handleClick = () => {
        this.setState({
            modal: true
        })
    }

    handleClose = () => {
        this.setState({
            modal: false
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>Show Modal</Button>

                <Modal
                    wide
                    containerClass={"custom-container"}
                    isOpen={this.state.modal}
                    onRequestClose={this.handleClose}
                    ariaHideApp={false}
                >
                    I want a fixed width...
                </Modal>
            </div>
        )
    }
}

export default ModalExampleWide
