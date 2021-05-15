export function enumToBitValues(enumValue: object) {
    return Object.keys(enumValue).map(Number).filter(Boolean);
}

export function bitToFormValue(enumeration: object, bit: number) {
    const bits = enumToBitValues(enumeration);
    return bits.map((b) => (bit & b) === b);
}

type EnumValueObject = { [index: number]: boolean };

export function bitToFormObject(enumeration: object, bit: number): EnumValueObject {
    const bits = enumToBitValues(enumeration);
    const result: EnumValueObject = {};
    for (let b of bits) {
        result[b] = (bit & b) === b;
    }
    return result;
}
