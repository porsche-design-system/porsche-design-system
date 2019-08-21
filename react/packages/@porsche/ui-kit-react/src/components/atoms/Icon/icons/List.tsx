import * as React from "react"

const SvgList = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M40 12v4H8v-4h32zM8 26h32v-4H8v4zm0 10h32v-4H8v4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgList
