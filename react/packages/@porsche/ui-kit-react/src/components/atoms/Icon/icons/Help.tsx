import * as React from "react"

const SvgHelp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M24 8C15.2 8 8 15.2 8 24s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8zm2.1 28H22v-4.6h4.1V36zm4.8-15.3c-.3.7-.6 1.3-1 1.8s-.8.9-1.3 1.3c-.4.4-.9.7-1.3 1.1s-.7.7-1 1.1-.4.8-.4 1.4v.8H22V27c0-1 .2-1.9.7-2.5.5-.7 1-1.3 1.6-1.9s1.1-1.1 1.6-1.7.7-1.2.7-2c0-1-.3-1.7-.8-2.1-.6-.4-1.4-.6-2.6-.6h-4.3V12h4.4c1.4 0 2.5.2 3.5.5s1.8.7 2.4 1.3c.6.5 1.1 1.2 1.4 1.9.3.8.4 1.6.4 2.5.3 1 .2 1.8-.1 2.5z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgHelp
