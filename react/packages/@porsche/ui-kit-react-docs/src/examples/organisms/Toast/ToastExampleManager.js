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
        message: "The message of the toast.",
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
                    <Flex.Item width={{ base: 6, m: 3 }}>
                        <Select
                            clearable={false}
                            placeholder="Type"
                            options={data}
                            style={style}
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                        />
                    </Flex.Item>
                    <Flex.Item width={{ base: 6, m: 3 }}>
                        <Input
                            style={style}
                            onChange={this.handleMessageChange}
                            value={this.state.message}
                            placeholder="Message"
                        />
                    </Flex.Item>
                    <Flex.Item width={{ base: 6, m: 3 }}>
                        <Input
                            onChange={this.handleTimeoutChange}
                            style={style}
                            value={this.state.options && this.state.options.timeout}
                            placeholder="Timeout in ms"
                        />
                    </Flex.Item>
                    <Flex.Item width={{ base: 6, m: 3 }}>
                        <Button
                            style={style}
                            onClick={emitToast(this.state.type, this.state.message, this.state.options)}
                        >
                            Emit Toast
                        </Button>
                    </Flex.Item>
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
