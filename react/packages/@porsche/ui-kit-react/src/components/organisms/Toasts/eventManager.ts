type CallbackFn = (...args: any[]) => void

export const eventManager = {
    list: new Map<string, CallbackFn[]>(),

    on(event: string, callback: CallbackFn) {
        if (!this.list.has(event)) {
            this.list.set(event, [])
        }

        const callbacks = this.list.get(event)

        if (callbacks !== undefined) {
            callbacks.push(callback)
        }

        return this
    },

    off(event: string) {
        this.list.delete(event)
        return this
    },

    emit(event: string, ...args: any[]) {
        if (!this.list.has(event)) {
            return false
        }

        const callbacks = this.list.get(event)

        if (callbacks === undefined) {
            return false
        }

        callbacks.forEach((callback) => setTimeout(() => callback.call(null, ...args), 0))

        return true
    }
}
