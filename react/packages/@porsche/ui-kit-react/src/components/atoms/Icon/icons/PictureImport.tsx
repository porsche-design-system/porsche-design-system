import * as React from "react"

const SvgPictureImport = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M14 16l20 20H6V24l8-8zm28 20v-4l-8-8-4.5 4.5L37 36h5zm2 2H4V10h24V8H4c-1.1 0-2 .9-2 2v28c0 1.1.9 2 2 2h40c1.1 0 2-.9 2-2V18h-2v20zm-6-26l4-4h-3V2h-2v6h-3l4 4zm4-8v2h2v8H32V6h2V4h-4v12h16V4h-4z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgPictureImport
