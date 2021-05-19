export interface OrderOptions {
    order: number;
}

export const $order = Symbol("Order");
export function order(order: number) {
    return Reflect.metadata($order, { order });
}
