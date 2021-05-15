import { FieldValues, UseFormRegister, FieldPath, RegisterOptions } from "react-hook-form";

export function correctRegister<TFieldValues extends FieldValues = FieldValues>(
    register: UseFormRegister<TFieldValues>
) {
    return function <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
        name: TFieldName,
        options?: RegisterOptions<TFieldValues, TFieldName>
    ) {
        const { ref, ...rest } = register(name, options);
        return { inputRef: ref, ...rest };
    };
}

export function correctHtmlRegister<TFieldValues extends FieldValues = FieldValues>(
    register: UseFormRegister<TFieldValues>
) {
    return function <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
        name: TFieldName,
        options?: RegisterOptions<TFieldValues, TFieldName>
    ) {
        const { ref, ...rest } = register(name, options);
        return { elementRef: ref, ...rest };
    };
}
