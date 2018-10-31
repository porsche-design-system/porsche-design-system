import React from "react"
import { Modal, Button } from "@porsche/ui-kit-react"

class ModalExampleSize extends React.PureComponent {
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

                <Modal size="max" isOpen={this.state.modal} onRequestClose={this.handleClose} />
            </div>
        )
    }
}

export default ModalExampleSize
