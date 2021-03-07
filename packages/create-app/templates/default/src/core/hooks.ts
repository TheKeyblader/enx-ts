import { useContext, createContext } from "react";

export function createStoreContext<T>(): [() => T, React.Provider<T>] {
    //@ts-ignore
    const context = createContext<T>();
    const hook = function () {
        return useContext<T>(context);
    };
    return [hook, context.Provider];
}
