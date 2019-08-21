import * as React from "react"

const SvgCopy = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M32.4 6H20.8c-1.1 0-2 .9-2 2v7H9c-1.1 0-2 .9-2 2v22.5c0 1.1.9 2 2 2h17.2c1.1 0 2-.9 2-2v-7H38c1.1 0 2-.9 2-2V13.3L32.4 6zm.1 2.9l4.8 4.6h-4.8V8.9zm-11.7 9l4.8 4.6h-4.8v-4.6zM9 39.5V17h9.8v7.5h7.5v15H9zm19.2-9v-8.2l-7.5-7.2V8h9.8v7.5H38v15h-9.8z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgCopy
