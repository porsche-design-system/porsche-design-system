import React from "react"
import { Toast, Flex } from "@porsche/ui-kit-react"

const style = {
    marginRight: "12px",
    marginBottom: "12px",
    marginTop: 0
}

const ToastExampleType = () => (
    <Flex>
        <Toast style={style} type="info" message="Info Toast" onClick={() => {}} />
        <Toast style={style} type="warning" message="Warning Toast" onClick={() => {}} />
        <Toast style={style} type="success" message="Success Toast" onClick={() => {}} />
        <Toast style={style} type="error" message="Error Toast" onClick={() => {}} />
    </Flex>
)

export default ToastExampleType
