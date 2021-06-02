import { createBaseDecorator } from "@enx2/easy";

export type DivOptions<K extends keyof JSX.IntrinsicElements> = { tag: K } & JSX.IntrinsicElements[K];

const [$div, _div] = createBaseDecorator<DivOptions<any>>("Div");

export { $div };

export function div<K extends keyof JSX.IntrinsicElements>(opt: DivOptions<K>): PropertyDecorator;
export function div(className: string): PropertyDecorator;
export function div(id: string, className: string): PropertyDecorator;
export function div<K extends keyof JSX.IntrinsicElements>(tag: K, id: string, className: string): PropertyDecorator;
export function div<K extends keyof JSX.IntrinsicElements = "div">(
    strOrOptions: K | string | DivOptions<K>,
    idOrClassname?: string,
    className?: string
) {
    let opt: DivOptions<K>;

    if (className != void 0) opt = { tag: strOrOptions as K, id: idOrClassname!, className: className };
    else if (idOrClassname != void 0) opt = { tag: "div" as K, id: strOrOptions as string, className: idOrClassname };
    else if (typeof strOrOptions === "string") opt = { tag: "div" as K, className: strOrOptions as string };
    else opt = strOrOptions;

    return _div(opt);
}
