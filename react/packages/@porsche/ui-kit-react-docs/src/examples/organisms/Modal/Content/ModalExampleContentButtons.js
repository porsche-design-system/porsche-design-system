import React from "react"
import { Modal, Button } from "@porsche/ui-kit-react"
import lorem from "lorem-ipsum"

class ModalExampleContentButtons extends React.Component {
    constructor(props) {
        super(props)

        this.state = { modal: false }

        this.text = lorem({
            count: 4,
            units: "sentences"
        })
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
                    <Modal.Title>Modal Buttons</Modal.Title>
                    <Modal.Text>{this.text}</Modal.Text>
                    <Modal.Buttons>
                        <Button type="default" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button type="red" onClick={this.handleClose}>
                            Save
                        </Button>
                    </Modal.Buttons>
                </Modal>
            </div>
        )
    }
}

export default ModalExampleContentButtons
