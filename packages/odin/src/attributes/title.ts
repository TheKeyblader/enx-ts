import "reflect-metadata";
import { BaseOptions, createSimpleMetadata } from "./base";

export interface TitleOptions extends BaseOptions {
    title?: string;
    subtitle?: string;
    alignment?: TitleAligments;
}

export enum TitleAligments {
    Centered,
    Left,
    Right,
    Split,
}

export const [$title, title] = createSimpleMetadata<TitleOptions>("title");
