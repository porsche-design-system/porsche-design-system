import React from "react"
import { Modal, Button } from "@porsche/ui-kit-react"
import lorem from "lorem-ipsum"

class ModalExampleContentTitleText extends React.PureComponent {
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

                <Modal isOpen={this.state.modal} onRequestClose={this.handleClose} containerRef={this.containerRef}>
                    <Modal.Title>Title and Text</Modal.Title>
                    <Modal.Text>{this.text}</Modal.Text>
                </Modal>
            </div>
        )
    }
}

export default ModalExampleContentTitleText
