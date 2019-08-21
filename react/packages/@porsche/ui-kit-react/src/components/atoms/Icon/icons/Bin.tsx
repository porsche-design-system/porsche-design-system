import * as React from "react"

const SvgBin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M36 6h-8c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2h-8c-1.1 0-2 .9-2 2v2h28V8c0-1.1-.9-2-2-2zM13.8 42.2c.1 1 1 1.8 2 1.8h16.4c1 0 1.9-.8 2-1.8L38 12H10l3.8 30.2zM29 16h2v24h-2V16zm-6 0h2v24h-2V16zm-6 0h2v24h-2V16z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgBin
