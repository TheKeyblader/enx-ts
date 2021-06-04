export interface OrderOptions {
    order: number;
}

export const $order = "order";
export function order(order: number) {
    return Reflect.metadata($order, { order });
}
