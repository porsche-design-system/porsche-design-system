import React from "react"
import { Toast, Spacing, Button, Select, Input, Flex } from "@porsche/ui-kit-react"

const emitToast = (type, message, options) => {
    return () => {
        Toast.Manager.emit(type, message, options)
    }
}

const style = {
    marginRight: "12px",
    marginBottom: "12px"
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
                <Flex wrap>
                    <Select
                        placeholder="Type"
                        options={data}
                        style={style}
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                    />
                    <Input
                        style={style}
                        onChange={this.handleMessageChange}
                        value={this.state.message}
                        placeholder="Message"
                    />

                    <Input
                        onChange={this.handleTimeoutChange}
                        style={style}
                        value={this.state.options && this.state.options.timeout}
                        placeholder="Timeout in ms"
                    />
                    <Button style={style} onClick={emitToast(this.state.type, this.state.message, this.state.options)}>
                        Emit Toast
                    </Button>
                </Flex>
                <Spacing marginTop={12}>
                    <div style={{ position: "relative", height: "300px", background: "grey" }}>
                        <Toast.Manager style={{ position: "absolute" }} />
                    </div>
                </Spacing>
            </React.Fragment>
        )
    }
}

export default ToastExampleManager
