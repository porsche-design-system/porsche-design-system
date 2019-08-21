import * as React from "react"

const SvgTimer = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M37.2 15l1.9-1.9-4.2-4.2-1.9 1.9c-2.4-1.6-5.2-2.5-8-2.7V6h3V4h-8v2h3v2c-3.8.2-7.4 1.8-10.3 4.6-6.2 6.2-6.2 16.4 0 22.6C15.8 38.4 19.9 40 24 40s8.2-1.6 11.3-4.7c5.5-5.5 6.2-14.1 1.9-20.3zm-3.3 18.9C31.3 36.5 27.7 38 24 38s-7.3-1.5-9.9-4.1c-5.5-5.5-5.5-14.3 0-19.8 2.6-2.6 6.2-4.1 9.9-4.1s7.3 1.5 9.9 4.1c5.5 5.5 5.5 14.3 0 19.8z" />
        <path d="M23 14.1V24c0 .6.4 1 1 1s1-.4 1-1v-9.9c-.3 0-.7-.1-1-.1s-.7 0-1 .1z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgTimer
