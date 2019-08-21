import * as React from "react"

const SvgMessage = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M23.3 30.3L9.4 16h29.7L24.7 30.4c-.2.2-.4.3-.7.3-.3-.1-.5-.2-.7-.4zm.7 2.4c-.8 0-1.6-.3-2.2-.9L8 17.5V36c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V17.9L26.1 31.8c-.5.5-1.3.9-2.1.9z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgMessage
