import { createBaseDecorator } from "@enx2/easy";

export type DivOptions<K extends keyof JSX.IntrinsicElements> = { tag: K } & JSX.IntrinsicElements[K];

const [$div, _div] = createBaseDecorator<DivOptions<any>>("Div");

export { $div };

export function div(target: Object, propertyKey: string | symbol): void;
export function div<K extends keyof JSX.IntrinsicElements>(opt: DivOptions<K>): PropertyDecorator;
export function div(className: string): PropertyDecorator;
export function div(tag: string, className: string): PropertyDecorator;
export function div<K extends keyof JSX.IntrinsicElements = "div">(
    strOrOptions?: K | string | DivOptions<K> | object,
    className?: string | symbol
) {
    let opt: DivOptions<K>;

    if (typeof strOrOptions == "object" && className != void 0) {
        opt = { tag: "div" } as DivOptions<K>;
        _div(opt)(strOrOptions, className);
        return;
    }

    if (className != void 0) opt = { tag: strOrOptions as K, className: className as string };
    else if (typeof strOrOptions === "string") opt = { tag: "div" as K, className: strOrOptions as string };
    else if (typeof strOrOptions === "object") opt = strOrOptions as DivOptions<K>;
    else opt = { tag: "div" } as DivOptions<K>;

    return _div(opt);
}
