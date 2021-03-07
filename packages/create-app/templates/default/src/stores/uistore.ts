import { makeAutoObservable, reaction } from "mobx";
import { AppName } from "../core/consts";

export class UIStore {
    darkMode: boolean;
    title: string;

    constructor() {
        this.title = AppName;
        this.darkMode = localStorage.getItem("dark-mode") ? true : false;
        makeAutoObservable(this, void 0, { autoBind: true });
        reaction(
            () => this.darkMode,
            (v) => {
                if (v) localStorage.setItem("dark-mode", "true");
                else localStorage.removeItem("dark-mode");
            }
        );
    }

    toogleDarkMode() {
        this.darkMode = !this.darkMode;
    }
}
