import React from "react"
import { Toast, Flex } from "@porsche/ui-kit-react"

const ToastExampleType = () => (
    <Flex gap={12}>
        <Flex.Item width="auto">
            <Toast type="info" message="Info Toast" onClick={() => {}} />
        </Flex.Item>
        <Flex.Item width="auto">
            <Toast type="warning" message="Warning Toast" onClick={() => {}} />
        </Flex.Item>
        <Flex.Item width="auto">
            <Toast type="success" message="Success Toast" onClick={() => {}} />
        </Flex.Item>
        <Flex.Item width="auto">
            <Toast type="error" message="Error Toast" onClick={() => {}} />
        </Flex.Item>
    </Flex>
)

export default ToastExampleType
