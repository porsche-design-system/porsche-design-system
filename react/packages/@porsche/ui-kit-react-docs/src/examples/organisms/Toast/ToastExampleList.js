import React from "react"
import { Toast } from "@porsche/ui-kit-react"

const ToastExampleList = () => (
    <div style={{ position: "relative", height: "300px", background: "grey" }}>
        <Toast.List
            style={{ position: "absolute" }}
            toasts={[
                {
                    id: "1",
                    message: "The first Toast"
                },
                {
                    id: "2",
                    message: "The second Toast",
                    type: "error"
                },
                {
                    id: "3",
                    message: "A Toast with a very long text that shows the responsiveness of the list.",
                    type: "warning"
                }
            ]}
        />
    </div>
)

export default ToastExampleList
