import * as React from "react"

const SvgLoader = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M35.3 35.3c-1.7 1.7-3.7 2.9-5.9 3.7-1.7.6-3.5 1-5.4 1-8.8 0-16-7.2-16-16H3l6-6 6 6h-5c0 7.7 6.3 14 14 14 1 0 1.9-.1 2.8-.3 2.7-.6 5.2-1.9 7.1-3.8l1.4 1.4zM40 24c0-8.8-7.2-16-16-16-4.4 0-8.4 1.8-11.3 4.7l1.4 1.4c2.5-2.5 6-4.1 9.9-4.1 7.7 0 14 6.3 14 14h-5l6 6 6-6h-5z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgLoader
