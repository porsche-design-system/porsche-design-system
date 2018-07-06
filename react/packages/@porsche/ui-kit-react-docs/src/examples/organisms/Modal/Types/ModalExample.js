import React from "react"
import { Modal, Button } from "@porsche/ui-kit-react"

class ModalExample extends React.Component {
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

                <Modal isOpen={this.state.modal} onRequestClose={this.handleClose}>
                    Modal
                </Modal>
            </div>
        )
    }
}

export default ModalExample
