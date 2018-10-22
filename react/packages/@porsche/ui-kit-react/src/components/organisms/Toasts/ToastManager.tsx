import * as React from "react"
import { ToastList } from "./ToastList"
import { eventManager } from "./eventManager"
import { ToastType } from "./Toast"

export interface ToastManager extends React.Component {
    emit: (type: ToastType, message: string, options?: ToastOptions) => void
}

export interface ToastOptions {
    timeout?: number
}

const defaultOptions = {
    timeout: 5000
}

class ToastManagerComponent extends React.PureComponent {
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

    /* statt date hier uuid */
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

const emit = (type: ToastType, message: string, options?: ToastOptions) => {
    eventManager.emit("CREATE_TOAST", type, message, options)
}

export const ToastManager: React.ComponentType & Partial<ToastManager> = ToastManagerComponent

ToastManager.emit = emit
