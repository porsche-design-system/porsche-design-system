import React from "react"
import { Toast } from "@porsche/ui-kit-react"

class ToastExampleList extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            toasts: [
                {
                    id: "1",
                    message: "The first Toast"
                },
                {
                    id: "2",
                    message: "The second Toast",
                    type: "error"
                }
            ]
        }
    }

    componentDidMount() {
        this.timerId = setInterval(this.toggleFlashMessage, 1500)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    /**
     * Switches between adding and removing a toast to show toast list animation
     */
    toggleFlashMessage = () => {
        if (this.state.toasts.length < 3) {
            this.setState({
                toasts: [
                    ...this.state.toasts,
                    {
                        id: "3",
                        message: "A Toast with a very long text that shows the responsiveness of the list.",
                        type: "warning"
                    }
                ]
            })
        } else {
            this.setState({
                toasts: [...this.state.toasts.slice(0, this.state.toasts.length - 1)]
            })
        }
    }

    render() {
        return (
            <div style={{ position: "relative", height: "300px", background: "grey" }}>
                <Toast.List style={{ position: "absolute" }} toasts={this.state.toasts} />
            </div>
        )
    }
}

export default ToastExampleList
