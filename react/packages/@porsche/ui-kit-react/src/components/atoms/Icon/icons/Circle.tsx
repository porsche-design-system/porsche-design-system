import * as React from "react"

const SvgCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        id="circle_svg__circle"
        x={0}
        y={0}
        viewBox="0 0 48 48"
        xmlSpace="preserve"
        width="1em"
        height="1em"
        {...props}
    >
        <style>{".circle_svg__st0{fill:none}"}</style>
        <path d="M48 24c0 13.2-10.8 24-24 24S0 37.2 0 24 10.8 0 24 0s24 10.8 24 24z" />
        <path className="circle_svg__st0" d="M0 0h48v48H0z" />
        <path className="circle_svg__st0" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgCircle
