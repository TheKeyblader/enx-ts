export function deepFreeze<T extends object>(o: T) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach((prop) => {
        if (
            o.hasOwnProperty(prop) &&
            //@ts-expect-error
            o[prop] !== null &&
            //@ts-expect-error
            (typeof o[prop] === "object" || typeof o[prop] === "function") &&
            //@ts-expect-error
            !Object.isFrozen(o[prop])
        ) {
            //@ts-expect-error
            deepFreeze(o[prop]);
        }
    });
    return o;
}

export function Sleep(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms));
}

export const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
