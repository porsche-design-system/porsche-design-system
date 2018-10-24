import * as React from "react"
import { ToastList } from "./ToastList"
import { eventManager } from "./eventManager"
import { ToastType } from "./Toast"

export interface ToastOptions {
    timeout?: number
}

const defaultOptions = {
    timeout: 5000
}

/**
 * The toast manager automatically queues and displays toasts created with its emit, info, success, warn, error methods.
 */
export class ToastManager extends React.PureComponent {
    static emit = (type: ToastType, message: string, options?: ToastOptions) => {
        eventManager.emit("CREATE_TOAST", type, message, options)
    }

    static info = (message: string, options?: ToastOptions) => {
        eventManager.emit("CREATE_TOAST", "info", message, options)
    }

    static success = (message: string, options?: ToastOptions) => {
        eventManager.emit("CREATE_TOAST", "success", message, options)
    }

    static warn = (message: string, options?: ToastOptions) => {
        eventManager.emit("CREATE_TOAST", "warn", message, options)
    }

    static error = (message: string, options?: ToastOptions) => {
        eventManager.emit("CREATE_TOAST", "error", message, options)
    }

    state = {
        toasts: []
    }

    componentDidMount() {
        eventManager.on("CREATE_TOAST", this.handleToastCreate)
    }

    componentWillUnmount() {
        eventManager.off("CREATE_TOAST")
    }

    render() {
        const { ...rest } = this.props
        return <ToastList onCloseClick={this.handleToastDelete} toasts={this.state.toasts} {...rest} />
    }

    private handleToastCreate = (type: ToastType, message: string, options?: ToastOptions) => {
        const opts = { ...defaultOptions, ...options }
        const toast = this.createToast(type, message)

        this.setState({
            toasts: [...this.state.toasts, toast]
        })

        if (opts.timeout !== undefined) {
            setTimeout(() => this.handleToastDelete(toast.id), opts.timeout)
        }
    }

    createToast = (type: ToastType, message: string) => {
        return {
            id: `${new Date().getTime()}`,
            type,
            message
        }
    }

    handleToastDelete = (toastId: string) => {
        const index = (this.state.toasts as any).map((toast: any) => toast.id).indexOf(toastId)

        if (index >= 0) {
            this.setState({
                toasts: [
                    ...this.state.toasts.slice(0, index),
                    ...this.state.toasts.slice(index + 1, this.state.toasts.length)
                ]
            })
        }
    }
}
