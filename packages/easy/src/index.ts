import "reflect-metadata";
import { ZodObject } from "zod";
import { schema } from "./core/utils";
export * from "./models";
export * from "./decorators";
export * from "./drawers";
export { decorateClass } from "./core/utils";
export type { ClassConstructor, decorateMap } from "./core/utils";

export type schemaOf<T> = ZodObject<schema<T>>;
