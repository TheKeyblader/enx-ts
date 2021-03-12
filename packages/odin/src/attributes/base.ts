import "reflect-metadata";

export interface BaseOptions {
    style?: CSSStyleDeclaration;
}

export function createSimpleMetadata<O extends BaseOptions>(name: string): [symbol, (options: O) => PropertyDecorator] {
    const $symbol = Symbol(name);
    const decorator = function (options: O): PropertyDecorator {
        return function (target, propertyKey) {
            Reflect.defineMetadata($symbol, options, target, propertyKey);
        };
    };

    return [$symbol, decorator];
}
