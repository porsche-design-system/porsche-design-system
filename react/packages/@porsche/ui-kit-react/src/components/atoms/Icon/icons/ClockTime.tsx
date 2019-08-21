import * as React from "react"

const SvgClockTime = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M35.3 12.7C32.2 9.6 28.1 8 24 8s-8.2 1.6-11.3 4.7c-6.2 6.2-6.2 16.4 0 22.6C15.8 38.4 19.9 40 24 40s8.2-1.6 11.3-4.7c6.3-6.2 6.3-16.4 0-22.6zm-1.4 21.2C31.3 36.5 27.7 38 24 38s-7.3-1.5-9.9-4.1c-5.5-5.5-5.5-14.3 0-19.8 2.6-2.6 6.2-4.1 9.9-4.1s7.3 1.5 9.9 4.1c5.5 5.5 5.5 14.3 0 19.8z" />
        <path d="M31.7 30.3L25 23.6v-9.5c-.3 0-.7-.1-1-.1s-.7 0-1 .1V24c0 .1 0 .3.1.4s.1.2.2.3l7 7c.5-.4 1-.9 1.4-1.4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgClockTime
