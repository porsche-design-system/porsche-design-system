import * as React from "react"

const SvgPicture = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M34 36L14 16l-8 8v12zM29.5 28.5L37 36h5v-4l-8-8z" />
        <circle cx={37} cy={17} r={3} />
        <path d="M44 40c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v28c0 1.1.9 2 2 2h40zM4 10h40v28H4V10z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPicture
