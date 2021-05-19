import { DrawerBase } from "./base";
import { DrawerConstructor } from "./registry";

const $drawer: unique symbol = Symbol("Drawer");

export function drawer(drawerId: string): ClassDecorator {
    return Reflect.metadata($drawer, drawerId);
}

export function getDrawerId(classOrInstance: DrawerBase | DrawerConstructor<DrawerBase>) {
    let clazz: DrawerConstructor<DrawerBase>;
    if (typeof classOrInstance === "function") {
        clazz = classOrInstance;
    } else if (typeof classOrInstance == "object") {
        clazz = classOrInstance.constructor as DrawerConstructor<DrawerBase>;
    } else {
        throw new Error("classOrInstance should be an instance or class of DrawerBase");
    }

    if (!(clazz.prototype instanceof DrawerBase))
        throw new Error("classOrInstance should be an instance or class of DrawerBase");

    if (!Reflect.hasMetadata($drawer, clazz))
        throw new Error(
            `no drawer info for class ${clazz.name} could be found - did you forget to add the @draw decorator?`
        );

    return Reflect.getMetadata($drawer, clazz) as string;
}
