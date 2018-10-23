import React from "react"
import { Modal, Button } from "@porsche/ui-kit-react"
import lorem from "lorem-ipsum"

class ModalExampleWide extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = { modal: false }

        this.text = lorem({
            count: 6,
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

                <Modal wide isOpen={this.state.modal} onRequestClose={this.handleClose}>
                    <p>{this.text}</p>
                    <br />
                    <p>{this.text}</p>
                    <br />
                    <p>{this.text}</p>
                    <br />
                    <p>{this.text}</p>
                </Modal>
            </div>
        )
    }
}

export default ModalExampleWide
