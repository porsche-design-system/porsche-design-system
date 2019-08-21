import * as React from "react"

const SvgEye = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M28 23c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zm-4 8c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-2c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6zm22-5.9s-9.9-12-22-12S2 23 2 23s10.2 12.1 22 12.1 22-12 22-12zM34 23c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgEye
