import "reflect-metadata";

export interface createBaseDecorator<O extends {}> {
    (name: string): [symbol, (options: O) => PropertyDecorator];
}

export function createBaseDecorator<O extends {}>(name: string): [symbol, (options: O) => PropertyDecorator] {
    const symbol = Symbol(name);
    const func = function (options: O) {
        return Reflect.metadata(symbol, options);
    };
    return [symbol, func];
}
