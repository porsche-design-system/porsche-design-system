export interface BreakpointValues<T> {
    base: T;
    xs?: T;
    s?: T;
    m?: T;
    l?: T;
    xl?: T;
}
export declare function mapBreakpointPropToClasses(className: string, prop?: string | number | BreakpointValues<string | number>): any;
