import * as React from "react"

const SvgOrganizer = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M8 28h8v8H8zM20 28h8v8h-8zM20 16h8v8h-8zM32 28h8v8h-8zM32 16h8v8h-8zM14 10h20v2H14z" />
        <path d="M44 10h-2v2h2v28H4V12h2v-2H4c-1.1 0-2 .9-2 2v28c0 1.1.9 2 2 2h40c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2z" />
        <path d="M36 8v4h4V6h-4zM8 8v4h4V6H8z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgOrganizer
