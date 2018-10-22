import React from "react"
import { Modal, Button } from "@porsche/ui-kit-react"
import lorem from "lorem-ipsum"

class ModalExample extends React.PureComponent {
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
                    {this.text}
                </Modal>
            </div>
        )
    }
}

export default ModalExample
