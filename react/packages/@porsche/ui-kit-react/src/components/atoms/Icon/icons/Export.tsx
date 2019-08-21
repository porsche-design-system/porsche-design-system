import * as React from "react"

const SvgExport = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M42 42H6v-8H2v8c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4v-8h-4v8z" />
        <path d="M8 18h5.7L22 9.7V36h4V9.7l8.3 8.3H40L24 2z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgExport
