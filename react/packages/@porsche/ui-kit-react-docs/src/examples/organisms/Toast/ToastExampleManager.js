import React from "react"
import { Toast, Button, Select, Input, Flex } from "@porsche/ui-kit-react"

const emitToast = (type, message, options) => {
    return () => {
        Toast.Manager.emit(type, message, options)
    }
}

const data = [
    { value: "info", label: "Info" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "error", label: "Error" }
]

class ToastExampleManager extends React.PureComponent {
    state = {
        type: "info",
        message: "Message",
        options: {
            timeout: 5000
        }
    }

    handleTypeChange = (type) => {
        this.setState({
            type
        })
    }

    handleTimeoutChange = (timeout) => {
        const options = Object.assign({}, this.state.options)
        options.timeout = timeout
        this.setState({
            options
        })
    }

    handleMessageChange = (message) => {
        this.setState({
            message
        })
    }

    render() {
        return (
            <React.Fragment>
                <Flex gap="grid">
                    <Flex.Item width="2">
                        <Select
                            placeholder="Type"
                            options={data}
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                        />
                    </Flex.Item>
                    <Flex.Item width="5">
                        <Input onChange={this.handleMessageChange} value={this.state.message} placeholder="Message" />
                    </Flex.Item>
                    <Flex.Item width="auto">
                        <Input
                            onChange={this.handleTimeoutChange}
                            value={this.state.options && this.state.options.timeout}
                            placeholder="Timeout in ms"
                        />
                    </Flex.Item>
                    <Flex.Item width="auto">
                        <Button onClick={emitToast(this.state.type, this.state.message, this.state.options)}>
                            Emit Toast
                        </Button>
                    </Flex.Item>
                </Flex>
                <div style={{ marginTop: "20px", position: "relative", height: "300px", background: "grey" }}>
                    <Toast.Manager style={{ position: "absolute" }} />
                </div>
            </React.Fragment>
        )
    }
}

export default ToastExampleManager
