import * as React from "react"

const SvgFacebook = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
        <defs>
            <path id="facebook_svg__a" d="M0 0h48v48H0z" />
        </defs>
        <clipPath id="facebook_svg__b">
            <use xlinkHref="#facebook_svg__a" overflow="visible" />
        </clipPath>
        <path
            d="M12.6 25h5.3v20h7.2V25h6.2l1.1-7.5h-7.3v-5.2c0-.8.3-1.3.8-1.6s1.1-.5 1.7-.5h4.7V3H27c-1.8 0-3.3.3-4.5.8-1.3.6-2.2 1.3-2.9 2.3S18.5 8 18.3 9c-.2.9-.4 1.9-.4 2.9v5.7h-5.3V25z"
            clipPath="url(#facebook_svg__b)"
        />
        <path fill="none" d="M0 0h48v48H0z" />
    </svg>
)

export default SvgFacebook
