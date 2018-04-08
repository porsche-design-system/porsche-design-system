import { prefix } from "./prefix"

export interface BreakpointValues<T> {
    base: T
    xs?: T
    s?: T
    m?: T
    l?: T
    xl?: T
}

export function mapBreakpointPropToClasses(className: string, prop?: string | number | BreakpointValues<string | number>): any {
    if (prop === undefined) { return {} }

    let classes: any = {}

    if (typeof prop === "number" || typeof prop === "string") {
        classes[prefix(`${className}${prop}`)] = !!prop
    } else {
        Object.keys(prop).forEach((key) => {
            const value: number = (prop as any)[key]
            if (key === "base") {
                classes = {
                    ...classes,
                    ...{[prefix(`${className}${value}`)] : !!value}
                }
            } else {
                classes = {
                    ...classes,
                    ...{[prefix(`${className}${value}-${key}`)] : !!value}
                }
            }
        })
    }

    return classes
}
