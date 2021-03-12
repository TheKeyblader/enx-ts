import { BaseOptions, createSimpleMetadata } from "./base";

export interface LabelOptions extends BaseOptions {
    text?: string;
    suffix?: string;
    prefix?: string;
}

export const [$label, label] = createSimpleMetadata<LabelOptions>("label");
