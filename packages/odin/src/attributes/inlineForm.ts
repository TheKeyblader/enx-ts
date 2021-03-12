import { BaseOptions } from "./base";

export interface InlineFormOptions extends BaseOptions {
    header: boolean;
    objectFieldMode: InlineFormObjectFieldModes;
}

export enum InlineFormObjectFieldModes {
    Collapse,
    Hidden,
    CompletelyHidden,
}

const $default: InlineFormOptions = {
    header: true,
    objectFieldMode: InlineFormObjectFieldModes.Collapse,
};

export const $inlineEditor = Symbol("inline editor");

export function inlineEditor(options: Partial<InlineFormOptions>): PropertyDecorator | ClassDecorator {
    options = { ...$default, ...options };
    return function (target, propertyKey) {
        Reflect.defineMetadata($default, options, target, propertyKey);
    };
}
