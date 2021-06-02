import { createGroupDecorator, GroupOptions } from "@enx2/easy";

export type DivGroupOptions<K extends keyof JSX.IntrinsicElements> = { tag: K } & JSX.IntrinsicElements[K] &
    GroupOptions;

const [$divGroup, _divGroup] = createGroupDecorator<DivGroupOptions<any>>("DivGroup");

export { $divGroup };

export function divGroup<K extends keyof JSX.IntrinsicElements>(opt: DivGroupOptions<K>): PropertyDecorator;
export function divGroup(id: string): PropertyDecorator;
export function divGroup(id: string, className: string): PropertyDecorator;
export function divGroup<K extends keyof JSX.IntrinsicElements>(
    tag: K,
    id: string,
    className: string
): PropertyDecorator;
export function divGroup<K extends keyof JSX.IntrinsicElements = "div">(
    strOrOptions: K | string | DivGroupOptions<K>,
    idOrClassname?: string,
    className?: string
) {
    let opt: DivGroupOptions<K>;

    if (className != void 0) opt = { tag: strOrOptions as K, groupId: idOrClassname!, className: className };
    else if (idOrClassname != void 0)
        opt = { tag: "div" as K, groupId: strOrOptions as string, className: idOrClassname };
    else if (typeof strOrOptions === "string")
        opt = { tag: "div" as K, groupId: strOrOptions as string } as DivGroupOptions<K>;
    else opt = strOrOptions;

    return _divGroup(opt);
}
