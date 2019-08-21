import * as React from "react"

const SvgNavigation = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <path d="M33 15c0-5-4-9-9-9s-9 4-9 9c0 7 9 17 9 17s9-10 9-17zm-9-4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm12 13l10 16H2l10-16h3.9c.4.7.8 1.4 1.2 2h-3.9L5.6 38h36.8l-7.5-12H31c.4-.6.8-1.3 1.2-2H36z" />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgNavigation
