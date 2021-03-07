import { createStoreContext } from "../core/hooks";
import { UIStore } from "./uistore";

export class RootStore {
    ui = new UIStore();
}

const [useRoot, RootProvider] = createStoreContext<RootStore>();
export { useRoot, RootProvider };
